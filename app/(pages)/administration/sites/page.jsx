"use client"

import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Drawer,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import { useTranslation } from "react-i18next";
// import {
//     fetchAllCompanyBranches,
//     fetchSites,
//     createSite,
//     updateSite,
//     deleteSite,
//     bulkDeleteSites,
//     translateText,
// } from "../../api/companySetupApi";

import { fetchAllCompanyBranches, fetchSites, createSite, updateSite, deleteSite, bulkDeleteSites, translateText } from "../../../api/companySetupAPI"

const useDebounced = (value, delay = 350) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
};

export default function SitesSetup() {
    const { i18n, t } = useTranslation();
    const [branches, setBranches] = useState([]);
    const [branchId, setBranchId] = useState(null);
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounced(search);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [addOpen, setAddOpen] = useState(false);
    const [form, setForm] = useState({ eng_description: "", ar_description: "" });
    const [detailsOpenId, setDetailsOpenId] = useState(null);
    const [detailForm, setDetailForm] = useState({});
    const [snack, setSnack] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const isRTL = i18n.language && i18n.language.startsWith("ar");

    useEffect(() => {
        fetchAllCompanyBranches().then((r) => {
            const list = Array.isArray(r.data) ? r.data : r.data?.results || [];
            setBranches(list);
            // Persist and restore previously selected branch for better UX
            const saved = Number(window.localStorage.getItem('sites_branch_id') || 0);
            if (!branchId) {
                if (saved && list.find((b) => Number(b.id) === saved)) {
                    setBranchId(saved);
                } else if (list.length === 1) {
                    setBranchId(Number(list[0].id));
                }
            }
        });
    }, []);

    useEffect(() => {
        if (!branchId) return;
        fetchSites(branchId, { search: debouncedSearch }).then((r) => {
            const raw = Array.isArray(r.data) ? r.data : (r.data?.results || []);
            const pickFirst = (obj, keys) => {
                for (const k of keys) {
                    if (obj[k] !== undefined && obj[k] !== null && String(obj[k]).trim() !== '') return String(obj[k]);
                }
                // heuristic: try to auto-detect by regex if unknown keys
                const lower = Object.keys(obj).reduce((acc, k) => { acc[k.toLowerCase()] = obj[k]; return acc; }, {});
                for (const [k, v] of Object.entries(lower)) {
                    if (/eng.*desc|desc.*eng|name_en|english/.test(k) && v != null && String(v).trim() !== '') return String(v);
                }
                return '';
            };
            const normalized = raw.map((it) => ({
                ...it,
                eng_description: pickFirst(it, [
                    'eng_description', 'engDescription', 'ENG_DESCRIPTION', 'english_description', 'englishDescription', 'desc_en', 'name_en', 'NameEn', 'NAME_EN', 'english'
                ]),
                ar_description: pickFirst(it, [
                    'ar_description', 'arDescription', 'AR_DESCRIPTION', 'arabic_description', 'arabicDescription', 'desc_ar', 'name_ar', 'NameAr', 'NAME_AR', 'arabic'
                ]),
            }));
            setRows(normalized);
        });
        // Save last used branch
        window.localStorage.setItem('sites_branch_id', String(branchId));
    }, [branchId, debouncedSearch]);

    const allChecked = useMemo(
        () => rows.length > 0 && rows.every((r) => selectedIds.has(r.id)),
        [rows, selectedIds]
    );

    const toggleAll = () => {
        if (allChecked) setSelectedIds(new Set());
        else setSelectedIds(new Set(rows.map((r) => r.id)));
    };

    const resetAndReload = async () => {
        if (!branchId) return;
        const r = await fetchSites(branchId, { search: debouncedSearch });
        setRows(Array.isArray(r.data) ? r.data : r.data?.results || []);
    };

    const handleCreate = async () => {
        if (!branchId) return;
        const eng = (form.eng_description || "").trim();
        const ar = (form.ar_description || "").trim();
        if (!eng && !ar) {
            setSnack(t("English or Arabic description is required"));
            return;
        }
        try {
            const resp = await createSite({
                branch: branchId,
                eng_description: eng || null,
                ar_description: ar || null,
                sorting: 0,
            });
            setAddOpen(false);
            setForm({ eng_description: "", ar_description: "" });
            try {
                const created = resp?.data;
                if (created && (created.id || created.pk)) {
                    const newRow = created;
                    setRows((prev) => {
                        const next = [...prev, newRow];
                        return next.sort((a, b) => (a.sorting - b.sorting) || (a.id - b.id));
                    });
                } else {
                    await resetAndReload();
                }
            } catch (_) {
                await resetAndReload();
            }
            setSnack(t("Site created"));
        } catch (err) {
            // Surface backend validation errors
            const data = err?.response?.data;
            if (data && typeof data === 'object') {
                const firstKey = Object.keys(data)[0];
                const msg = Array.isArray(data[firstKey]) ? data[firstKey][0] : String(data[firstKey] || '');
                setSnack(msg || t('Failed to create site'));
            } else {
                setSnack(t('Failed to create site'));
            }
        }
    };

    const handleEngChange = async (value) => {
        const next = { ...form, eng_description: value };
        setForm(next);
        // Auto-translate to Arabic if Arabic is empty
        if ((value || '').trim() && !(next.ar_description || '').trim()) {
            const tr = await translateText(value, 'en', 'ar');
            if (tr) setForm({ ...next, ar_description: tr });
        }
    };

    const openDetails = (site) => {
        setDetailsOpenId(site.id);
        setDetailForm(site.detail || {});
    };

    const saveDetails = async () => {
        if (!detailsOpenId) return;
        await updateSite(detailsOpenId, { detail: detailForm });
        setDetailsOpenId(null);
        await resetAndReload();
        setSnack(t("Details saved"));
    };

    const doBulkDelete = async () => {
        const ids = Array.from(selectedIds);
        if (!ids.length) return;
        setDeleting(true);
        try {
            const result = await bulkDeleteSites(ids);
            // Optimistic UI: remove locally
            setRows(prev => prev.filter(r => !ids.includes(r.id)));
            setSnack(t("Deleted {{count}} site(s)", { count: result?.deleted_sites ?? ids.length }));
        } catch (e) {
            setSnack(t('Bulk delete failed'));
        } finally {
            setDeleting(false);
            setSelectedIds(new Set());
            setConfirmOpen(false);
        }
    };

    const handleAddClick = () => {
        if (!branchId) {
            setSnack(t("Please select a branch first"));
            return;
        }
        setAddOpen(true);
    };

    const canSave = !!branchId && ((form.eng_description || "").trim() || (form.ar_description || "").trim());

    return (
        <Box sx={{ p: 3, direction: isRTL ? "rtl" : "ltr", maxWidth: 1280, mx: "auto" }}>
            {/* Hero header - mirrors Company Setup visual language */}
            <Paper
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 6,
                    background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                    color: "#fff",
                }}
            >
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
                        {t("Sites Setup")}
                    </Typography>
                    <Typography sx={{ opacity: 0.9, mt: 0.5 }}>
                        {t("Manage locations under the selected branch. Add, search, and maintain details.")}
                    </Typography>
                </Box>
            </Paper>

            {/* Controls bar */}
            <Paper sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            select
                            label={t("Branch")}
                            size="small"
                            value={branchId ?? ""}
                            onChange={(e) => setBranchId(e.target.value ? Number(e.target.value) : null)}
                            fullWidth
                        >
                            <MenuItem value="" disabled>{t("Select a branch")}</MenuItem>
                            {branches.map((b) => (
                                <MenuItem key={b.id} value={b.id}>{b.name_en}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item size={{ sx: 12, md: 4 }}>
                        <TextField
                            size="small"
                            placeholder={t("Search")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs />

                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddClick}
                            sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                px: 2.5,
                                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                                boxShadow: 3,
                                '&:hover': {
                                    boxShadow: 6,
                                    background: "linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)",
                                },
                            }}
                            disabled={!branchId}
                        >
                            {t("Add Site")}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Tooltip title={selectedIds.size ? t("Soft delete selected") : ""}>
                            <span>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    disabled={selectedIds.size === 0}
                                    onClick={() => setConfirmOpen(true)}
                                    sx={{ textTransform: "none", borderRadius: 2 }}
                                >
                                    {t("Bulk Delete")}
                                </Button>
                            </span>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"><Checkbox checked={allChecked} onChange={toggleAll} /></TableCell>
                            <TableCell width={80}>{t("Number")}</TableCell>
                            <TableCell>{t("English Description")}</TableCell>
                            <TableCell>{t("Arabic Description")}</TableCell>
                            <TableCell align="right" width={140}>{t("Details")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {addOpen && (
                            <TableRow>
                                <TableCell />
                                <TableCell>—</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        placeholder={t("English Description")}
                                        value={form.eng_description}
                                        onChange={(e) => handleEngChange(e.target.value)}
                                        inputProps={{ maxLength: 200 }}
                                    />
                                </TableCell>
                                <TableCell sx={{ direction: 'rtl' }}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        placeholder={t("Arabic Description")}
                                        value={form.ar_description}
                                        onChange={(e) => setForm({ ...form, ar_description: e.target.value })}
                                        inputProps={{ maxLength: 200 }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Button size="small" variant="contained" disabled={!canSave} onClick={handleCreate} sx={{ mr: 1 }}>
                                        {t("Save")}
                                    </Button>
                                    <Button size="small" onClick={() => { setAddOpen(false); setForm({ eng_description: '', ar_description: '' }); }}>
                                        {t("Cancel")}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                        {rows.map((r, idx) => (
                            <TableRow
                                key={r.id}
                                hover
                                sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedIds.has(r.id)}
                                        onChange={(e) => {
                                            const next = new Set(selectedIds);
                                            if (e.target.checked) next.add(r.id); else next.delete(r.id);
                                            setSelectedIds(next);
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell sx={{ color: 'text.primary', maxWidth: '100%', whiteSpace: 'nowrap' }}>
                                    {(r.eng_description ?? '').toString() || '—'}
                                </TableCell>
                                <TableCell sx={{ direction: "rtl", color: 'text.primary', maxWidth: '100%', whiteSpace: 'nowrap' }}>
                                    {(r.ar_description ?? '').toString() || '—'}
                                </TableCell>
                                <TableCell align="right">
                                    <Button size="small" variant="outlined" endIcon={<InfoOutlinedIcon />} onClick={() => openDetails(r)} sx={{ textTransform: 'none', borderRadius: 2 }}>
                                        {t("Details")}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {rows.length === 0 && branchId && (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                                        <Typography sx={{ mb: 1 }}>{t("No sites for this branch yet.")}</Typography>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            startIcon={<AddIcon />}
                                            onClick={handleAddClick}
                                            sx={{
                                                textTransform: 'none',
                                                borderRadius: 2,
                                                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                                            }}
                                        >
                                            {t("Add Site")}
                                        </Button>
                                    </Paper>
                                </TableCell>
                            </TableRow>
                        )}
                        {!branchId && (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                                        <Typography>{t('Select a branch to view sites')}</Typography>
                                    </Paper>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Site Modal */}
            <Dialog open={addOpen} onClose={() => setAddOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>{t("Add Site")}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                label={t("English Description")}
                                fullWidth
                                value={form.eng_description}
                                onChange={(e) => handleEngChange(e.target.value)}
                                inputProps={{ maxLength: 200 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={t("Arabic Description")}
                                fullWidth
                                value={form.ar_description}
                                onChange={(e) => setForm({ ...form, ar_description: e.target.value })}
                                inputProps={{ maxLength: 200 }}
                                sx={{ direction: "rtl" }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddOpen(false)}>{t("Cancel")}</Button>
                    <Button variant="contained" onClick={handleCreate} disabled={!canSave}>{t("Save")}</Button>
                </DialogActions>
            </Dialog>

            {/* Confirm Bulk Delete */}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>{t("Soft-delete {{count}} site(s)?", { count: selectedIds.size })}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>{t("Cancel")}</Button>
                    <Button color="error" variant="contained" onClick={doBulkDelete} disabled={deleting}>
                        {deleting ? t("Deleting...") : t("Delete")}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Details Drawer */}
            <Drawer anchor={isRTL ? "left" : "right"} open={!!detailsOpenId} onClose={() => setDetailsOpenId(null)}>
                <Box sx={{ width: 420, p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="h6">{t("Site Details")}</Typography>
                        <IconButton onClick={() => setDetailsOpenId(null)}><CloseIcon /></IconButton>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item size={{ sx: 12 }}><TextField label={t("Facility number")} fullWidth value={detailForm.facility_number || ""} onChange={(e) => setDetailForm({ ...detailForm, facility_number: e.target.value })} /></Grid>
                        <Grid item size={{ sx: 12 }}><TextField label={t("Owner / Manager in charge")} fullWidth value={detailForm.owner_manager || ""} onChange={(e) => setDetailForm({ ...detailForm, owner_manager: e.target.value })} /></Grid>
                        <Grid item size={{ sx: 12 }}><TextField label={t("Facility address")} fullWidth value={detailForm.facility_address || ""} onChange={(e) => setDetailForm({ ...detailForm, facility_address: e.target.value })} /></Grid>
                        <Grid item size={{ sx: 6 }}><TextField label={t("Area")} fullWidth value={detailForm.area || ""} onChange={(e) => setDetailForm({ ...detailForm, area: e.target.value })} /></Grid>
                        <Grid item size={{ sx: 6 }}><TextField label={t("Office")} fullWidth value={detailForm.office || ""} onChange={(e) => setDetailForm({ ...detailForm, office: e.target.value })} /></Grid>
                        <Grid item size={{ sx: 6 }}><TextField label={t("Street")} fullWidth value={detailForm.street || ""} onChange={(e) => setDetailForm({ ...detailForm, street: e.target.value })} /></Grid>
                        <Grid item size={{ sx: 6 }}><TextField label={t("Village")} fullWidth value={detailForm.village || ""} onChange={(e) => setDetailForm({ ...detailForm, village: e.target.value })} /></Grid>
                        <Grid item size={{ sx: 12 }}><TextField label={t("Department / Center")} fullWidth value={detailForm.department_center || ""} onChange={(e) => setDetailForm({ ...detailForm, department_center: e.target.value })} /></Grid>
                        <Grid item size={{ sx: 12 }}><TextField label={t("Province")} fullWidth value={detailForm.province || ""} onChange={(e) => setDetailForm({ ...detailForm, province: e.target.value })} /></Grid>
                        <Grid item size={{ sx: 12 }}><Button fullWidth variant="contained" onClick={saveDetails}>{t("Save")}</Button></Grid>
                    </Grid>
                </Box>
            </Drawer>

            <Snackbar
                open={!!snack}
                autoHideDuration={2500}
                onClose={() => setSnack("")}
                message={snack}
            />
        </Box>
    );
}
