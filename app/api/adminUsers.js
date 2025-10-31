function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const API_BASE = (() => {
    const { protocol, hostname, port } = window.location;
    const backendPort = (port === '3000' || port === '3001') ? '8000' : port || '8000';
    return `${protocol}//${hostname}${backendPort ? ':' + backendPort : ''}`;
})();

async function apiFetch(url, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    const headers = new Headers(options.headers || {});
    if (!headers.has('X-Requested-With')) headers.set('X-Requested-With', 'XMLHttpRequest');
    const needsCsrf = !['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(method);
    if (needsCsrf && !headers.has('X-CSRFToken')) {
        const token = getCookie('csrftoken');
        if (token) headers.set('X-CSRFToken', token);
    }
    // Default JSON content-type when body is plain object
    if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
        options.body = JSON.stringify(options.body);
    }
    const absUrl = /^https?:\/\//i.test(url) ? url : `${API_BASE}${url}`;
    const resp = await fetch(absUrl, { credentials: 'include', ...options, headers });
    if (!resp.ok) {
        let msg = 'Request failed';
        try {
            const data = await resp.json();
            if (Array.isArray(data)) {
                msg = data.join(' \u2022 ');
            } else if (data && typeof data === 'object') {
                if (data.detail) msg = data.detail;
                else if (data.message) msg = data.message;
                else {
                    // Flatten error dict: {field: [errs]}
                    const parts = [];
                    for (const [k, v] of Object.entries(data)) {
                        if (Array.isArray(v)) parts.push(`${k}: ${v.join(', ')}`);
                        else if (v && typeof v === 'object') parts.push(`${k}: ${JSON.stringify(v)}`);
                        else parts.push(`${k}: ${String(v)}`);
                    }
                    msg = parts.join(' \u2022 ');
                }
            } else {
                msg = String(data);
            }
        } catch (_) {/* ignore */ }
        throw new Error(msg);
    }
    const contentType = resp.headers.get('content-type') || '';
    return contentType.includes('application/json') ? resp.json() : resp.text();
}

export async function getUsers() { return apiFetch('/api/admin/users'); }
export async function toggleActive(id) { return apiFetch(`/api/admin/users/${id}/toggle-active`, { method: 'PATCH' }); }
export async function changePassword(id, new_password, confirm_password) { return apiFetch(`/api/admin/users/${id}/change-password`, { method: 'POST', body: { new_password, confirm_password } }); }
export async function bulkDelete(ids) { return apiFetch('/api/admin/users/bulk-delete', { method: 'DELETE', body: { ids } }); }
export async function bulkActivate(ids) { return apiFetch('/api/admin/users/bulk-activate', { method: 'POST', body: { ids } }); }
export async function getPolicy() { return apiFetch('/api/admin/password-policy'); }
export async function savePolicy(payload) { return apiFetch('/api/admin/password-policy/1', { method: 'PUT', body: payload }); }

