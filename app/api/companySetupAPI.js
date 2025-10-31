import axios from "axios";

const API = axios.create({
    baseURL: `http://${window.location.hostname}:8000`,
    withCredentials: true,
});

export const fetchBanks = () => API.get("/administration/api/banks/");
export const fetchBankBranches = (bankId) => API.get(`/administration/api/bank-branches/?bankId=${bankId}`);
export const fetchEmployees = (query) => API.get(`/administration/api/employees/?search=${query}`);
export const fetchCompanyDetails = (branchId) => API.get(`/administration/api/company-branch/${branchId}/`);
export const fetchAllCompanyBranches = () => API.get("/administration/api/company-branch/");
export const updateCompanyDetails = (branchId, data) => API.put(`/administration/api/company-branch/${branchId}/`, data);
// ...other endpoints for roles, signatories, etc.

export const fetchReportTypes = () => API.get("/api/report-types");

// Helpers
const normalizeList = (raw) => Array.isArray(raw) ? raw : (Array.isArray(raw?.results) ? raw.results : []);

// Report signatories
export const fetchReportSignatories = (branchId, reportType) =>
    API.get(`/administration/api/report-signatories/?branch_id=${branchId}&report_type=${encodeURIComponent(reportType)}`)
        .then(resp => normalizeList(resp?.data));

export const saveReportSignatories = async (branchId, reportType, signatories) => {
    // Replace existing signatories for branch+report_type with the provided array
    // 1) Fetch existing
    const existing = await fetchReportSignatories(branchId, reportType);
    // 2) Build create/update ops
    const toCreate = [];
    const toUpdate = [];
    const toDelete = [];

    // Map by order
    const existingByOrder = new Map(existing.map(s => [s.signatory_order, s]));
    signatories.forEach((s, idx) => {
        const order = idx + 1;
        const ex = existingByOrder.get(order);
        const payload = { branch: branchId, report_type: reportType, signatory_order: order, name: s.name, underline: !!s.underline };
        if (s.name && !ex) toCreate.push(payload);
        else if (s.name && ex) toUpdate.push({ id: ex.id, ...payload });
        else if (!s.name && ex) toDelete.push(ex.id);
    });

    const headers = { 'Content-Type': 'application/json' };
    const createPromises = toCreate.map(p => API.post('/administration/api/report-signatories/', p, { headers }));
    const updatePromises = toUpdate.map(p => API.put(`/administration/api/report-signatories/${p.id}/`, p, { headers }));
    const deletePromises = toDelete.map(id => API.delete(`/administration/api/report-signatories/${id}/`));
    await Promise.all([...createPromises, ...updatePromises, ...deletePromises]);
    return fetchReportSignatories(branchId, reportType);
};

// Fetch all report signatories for a branch (any report type)
export const fetchAllReportSignatories = async (branchId) => {
    const resp = await API.get(`/administration/api/report-signatories/?branch_id=${branchId}`);
    return normalizeList(resp?.data);
};

// --- Other Bank Accounts ---
const getCSRFToken = () => {
    const name = 'csrftoken=';
    const decoded = decodeURIComponent(document.cookie || '');
    const parts = decoded.split(';');
    for (let i = 0; i < parts.length; i++) {
        let c = parts[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return null;
};

export const fetchOtherBankAccounts = async (branchId) => {
    const resp = await API.get(`/administration/api/other-banks/?branch_id=${branchId}`);
    return normalizeList(resp?.data);
};

export const saveOtherBankAccounts = async (branchId, rows) => {
    // Ensure rows is an array of plain objects
    const list = Array.isArray(rows) ? rows : [];
    // Fetch existing to compute create/update/delete
    const existing = await fetchOtherBankAccounts(branchId);
    const existingByKey = new Map(
        existing.map(item => [
            `${item.bank}-${(item.account_number || '').trim()}`,
            item
        ])
    );

    const headers = { 'Content-Type': 'application/json' };
    const csrf = getCSRFToken();
    if (csrf) headers['X-CSRFToken'] = csrf;

    const toCreate = [];
    const toUpdate = [];
    const newKeys = new Set();

    list.forEach(row => {
        const bankId = parseInt(row.bank_id || row.bank, 10);
        const accountNumber = (row.account_number || '').trim();
        if (!bankId || !accountNumber) return; // skip incomplete
        const key = `${bankId}-${accountNumber}`;
        newKeys.add(key);
        const payload = {
            branch: branchId,
            bank: bankId,
            company_name: row.company_name || '',
            account_number: accountNumber,
            iban: row.iban || '',
            currency: row.currency || null,
            employer_eid: row.employer_eid || '',
            payer_eid: row.payer_eid || '',
            payer_qid: row.payer_qid || '',
            top_text: row.top_text || '',
            bottom_text: row.bottom_text || ''
        };
        const ex = existingByKey.get(key);
        if (ex) toUpdate.push({ id: ex.id, ...payload });
        else toCreate.push(payload);
    });

    // Anything existing but not present now should be deleted
    const toDelete = existing
        .filter(item => !newKeys.has(`${item.bank}-${(item.account_number || '').trim()}`))
        .map(item => item.id);

    const createPromises = toCreate.map(p => API.post('/administration/api/other-banks/', p, { headers }));
    const updatePromises = toUpdate.map(p => API.put(`/administration/api/other-banks/${p.id}/`, p, { headers }));
    const deletePromises = toDelete.map(id => API.delete(`/administration/api/other-banks/${id}/`, { headers }));
    await Promise.all([...createPromises, ...updatePromises, ...deletePromises]);
    return fetchOtherBankAccounts(branchId);
};

// --- Sites API ---
export const fetchSites = (branchId, { search = "", ordering = "sorting,id", page = 1, includeInactive = true } = {}) => {
    const params = new URLSearchParams();
    if (branchId) params.append("branch", String(branchId));
    if (search) params.append("search", search);
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", String(page));
    if (includeInactive) params.append("include_inactive", "1");
    return API.get(`/administration/api/sites/?${params.toString()}`);
};

export const createSite = (payload) => API.post(`/administration/api/sites/`, payload);
// Use PATCH so we can send partial updates like { detail: { ... } }
export const updateSite = (id, payload) => API.patch(`/administration/api/sites/${id}/`, payload);
export const deleteSite = (id) => API.delete(`/administration/api/sites/${id}/`);

// Bulk delete sites and their details
export const bulkDeleteSites = async (ids) => {
    const headers = { 'Content-Type': 'application/json' };
    const resp = await API.delete('/administration/api/sites/bulk-delete', { data: { ids }, headers });
    return resp.data;
};

// Translation helper (uses backend translate endpoint wired in Django)
export const translateText = async (text, from = 'en', to = 'ar') => {
    try {
        const resp = await API.get(`/administration/api/translate/`, { params: { text, from, to } });
        const data = resp?.data;
        if (!data) return '';
        if (typeof data === 'string') return data;
        return data?.translatedText || data?.translation || '';
    } catch (e) {
        return '';
    }
};
