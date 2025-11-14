"use client"
import React, { useState, useEffect, useRef } from "react";
import {
    TextField,
    Button,
    Grid,
    Tooltip,
    IconButton,
    Box,
    Typography,
    Autocomplete,
    Paper,
    Divider,
    Card,
    CardContent,
    Chip,
    Avatar,
    Container,
    Fade,
    CircularProgress,
    InputAdornment,
    Alert,
    Collapse
} from "@mui/material";
import {
    Info as InfoIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Notes as NotesIcon,
    Assignment as AssignmentIcon,
    Receipt as ReceiptIcon,
    AccountBalance as SettlementIcon,
    Check as CheckIcon,
    Refresh as RefreshIcon,
    Groups as GroupsIcon,
    AdminPanelSettings as AdminIcon,
    Business as BusinessIcon,
    Description as DocumentIcon,
    People as PeopleIcon,
    Security as SecurityIcon,
    Work as WorkIcon
} from "@mui/icons-material";

const roles = [
    {
        key: "hr_admin",
        label: "Human Resources Administrator",
        icon: <PeopleIcon />,
        color: "#2196F3",
        description: "Manages employee records, benefits, and HR policies"
    },
    {
        key: "training_admin",
        label: "Training Administrator",
        icon: <WorkIcon />,
        color: "#FF9800",
        description: "Oversees training programs and employee development"
    },
    {
        key: "correspondence_admin",
        label: "Correspondence and Documents Administrator",
        icon: <DocumentIcon />,
        color: "#9C27B0",
        description: "Handles official communications and document management"
    },
    {
        key: "hiring_admin",
        label: "Hiring Administrator",
        icon: <GroupsIcon />,
        color: "#4CAF50",
        description: "Manages recruitment processes and new employee onboarding"
    },
    {
        key: "scorecard_admin",
        label: "Official Balanced Scorecard Administrator",
        icon: <AssignmentIcon />,
        color: "#E91E63",
        description: "Manages performance metrics and balanced scorecard systems"
    },
    {
        key: "issue_admin",
        label: "Issue Administrator",
        icon: <SecurityIcon />,
        color: "#FF5722",
        description: "Handles issue tracking and resolution processes"
    },
    {
        key: "liaison_officer",
        label: "Liaison Officer in Social Security Reports",
        icon: <BusinessIcon />,
        color: "#607D8B",
        description: "Manages social security reporting and compliance"
    }
];

const initialRoleAssignments = roles.reduce((acc, role) => {
    acc[role.key] = { employee: null, email: "", notes: "" };
    return acc;
}, {});



const AdditionalInfoTab = () => {
    const [roleAssignments, setRoleAssignments] = useState(initialRoleAssignments);
    const [salarySlipText, setSalarySlipText] = useState({ en: "", ar: "" });
    const [settlementText, setSettlementText] = useState({ en: "", ar: "" });
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [docTextId, setDocTextId] = useState(null);

    const API_BASE = "";
    const BRANCH_ID = 1; // TODO: source this from selected company branch
    // Track existing DB ids per role for PUT/DELETE
    const [roleMeta, setRoleMeta] = useState({});

    const handleRoleChange = (roleKey, field, value) => {
        setRoleAssignments(prev => ({
            ...prev,
            [roleKey]: { ...prev[roleKey], [field]: value }
        }));
    };

    const handleSave = async () => { }

    const handleReset = () => {
        setRoleAssignments(initialRoleAssignments);
        setSalarySlipText({ en: "", ar: "" });
        setSettlementText({ en: "", ar: "" });
        setShowAlert(false);
    };

    const getAssignedCount = () => {
        return Object.values(roleAssignments).filter(assignment => assignment.employee).length;
    };

    const RoleCard = ({ role, assignment }) => {
        const [employeeOptions, setEmployeeOptions] = useState([]);
        const [empPage, setEmpPage] = useState(1);
        const [empHasMore, setEmpHasMore] = useState(true);
        const [empSearch, setEmpSearch] = useState("");
        const [empLoading, setEmpLoading] = useState(false);
        const [open, setOpen] = useState(false);
        const suppressRef = useRef(false);
        // Keep focus stable in the notes field even while components re-render
        const notesInputRef = useRef(null);
        const [notesFocused, setNotesFocused] = useState(false);
        // Local state for notes to avoid global rerender interruptions
        const [localNotes, setLocalNotes] = useState(assignment.notes || "");
        const notesSyncTimerRef = useRef(null);

        const fetchEmployees = (query = "", page = 1, append = false) => {
            const url = `${API_BASE}/employees/?page=${page}&page_size=100&search=${encodeURIComponent(query)}`;
            setEmpLoading(true);
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const list = Array.isArray(data) ? data : (Array.isArray(data?.results) ? data.results : []);
                    setEmployeeOptions(prev => append ? [...prev, ...list] : list);
                    setEmpHasMore(Boolean(data?.next));
                    setEmpPage(page);
                    setEmpSearch(query);
                })
                .catch(() => setEmployeeOptions([]))
                .finally(() => setEmpLoading(false));
        };

        useEffect(() => {
            if (suppressRef.current) {
                suppressRef.current = false;
                return;
            }
            const handler = setTimeout(() => {
                if ((empSearch || "").length >= 2) {
                    fetchEmployees(empSearch, 1, false);
                    setOpen(true);
                } else {
                    setEmployeeOptions([]);
                    setEmpHasMore(false);
                    setEmpPage(1);
                    setOpen(false);
                }
            }, 250);
            return () => clearTimeout(handler);
        }, [empSearch]);

        // If the notes field was focused, re-focus it after state updates so typing doesn't stop
        useEffect(() => {
            if (notesFocused && notesInputRef.current) {
                const el = notesInputRef.current;
                // Place cursor at the end to avoid jumping
                const pos = (el.value || "").length;
                el.focus();
                try { el.setSelectionRange(pos, pos); } catch { }
            }
        }, [assignment.notes, notesFocused]);

        // Keep local notes in sync if assignment changes from server/load
        useEffect(() => {
            setLocalNotes(assignment.notes || "");
        }, [assignment.notes]);

        return (
            <Card
                sx={{
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: assignment.employee ? `2px solid ${role.color}` : '2px solid transparent',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 25px ${role.color}20`,
                    }
                }}
            >
                <Box
                    sx={{
                        background: `linear-gradient(135deg, ${role.color} 0%, ${role.color}CC 100%)`,
                        color: 'white',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Box
                        sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {role.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 0.5 }}>
                            {role.label}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                            {role.description}
                        </Typography>
                    </Box>
                    <Tooltip title="Role information and responsibilities">
                        <IconButton size="small" sx={{ color: 'white' }}>
                            <InfoIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 3 }}>
                        <Autocomplete
                            id={`employee-autocomplete-${role.key}`}
                            options={employeeOptions}
                            getOptionLabel={option => option.NAME || ""}
                            value={assignment.employee}
                            onChange={(_, value) => {
                                handleRoleChange(role.key, "employee", value);
                                // Clear query so the input shows the selected value via `value`
                                setEmpSearch("");
                                suppressRef.current = true;
                                setOpen(false);
                                setEmployeeOptions([]);
                            }}
                            onInputChange={(_, value, reason) => {
                                if (reason === 'input') {
                                    const v = value || "";
                                    setEmpSearch(v);
                                    setOpen(v.length >= 2);
                                } else if (reason === 'clear') {
                                    setEmpSearch("");
                                    setOpen(false);
                                } else if (reason === 'reset') {
                                    setOpen(false);
                                }
                            }}
                            filterOptions={(x) => x}
                            loading={empLoading}
                            open={open}
                            onOpen={() => {
                                if (suppressRef.current) return;
                                setOpen((empSearch || "").length >= 2);
                            }}
                            onClose={() => setOpen(false)}
                            freeSolo
                            blurOnSelect
                            onBlur={() => setOpen(false)}
                            clearOnBlur={false}
                            noOptionsText={(empSearch || "").length < 2 ? "Type at least 2 characters" : "No matches"}
                            loadingText="Searching..."
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Select Employee"
                                    size="medium"
                                    autoComplete="off"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2
                                        }
                                    }}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: role.color }}>
                                        {option.NAME?.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2" fontWeight="medium">{option.NAME}</Typography>
                                        <Typography variant="caption" color="text.secondary">{option.CODE}</Typography>
                                    </Box>
                                </Box>
                            )}
                            isOptionEqualToValue={(option, value) => option?.CODE === value?.CODE}
                            PaperComponent={({ children }) => (
                                <Paper
                                    sx={{ borderRadius: 2, mt: 1, maxHeight: 320, overflow: 'auto' }}
                                    onScroll={e => {
                                        const el = e.currentTarget;
                                        if (empHasMore && el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
                                            fetchEmployees(empSearch, empPage + 1, true);
                                        }
                                    }}
                                >
                                    {children}
                                </Paper>
                            )}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Contact Email (Optional)"
                            value={assignment.email}
                            onChange={e => handleRoleChange(role.key, "email", e.target.value)}
                            type="email"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box>
                        <TextField
                            fullWidth
                            label="Additional Notes (Optional)"
                            value={localNotes}
                            onChange={e => {
                                const v = e.target.value;
                                setLocalNotes(v);
                                if (notesSyncTimerRef.current) clearTimeout(notesSyncTimerRef.current);
                                // Debounce syncing to global state; don't interrupt active typing
                                notesSyncTimerRef.current = setTimeout(() => {
                                    if (!notesFocused) {
                                        handleRoleChange(role.key, "notes", v);
                                    }
                                }, 800);
                            }}
                            multiline
                            minRows={3}
                            placeholder="Write any additional information..."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                            inputRef={notesInputRef}
                            onFocus={() => {
                                setNotesFocused(true);
                                if (notesSyncTimerRef.current) {
                                    clearTimeout(notesSyncTimerRef.current);
                                    notesSyncTimerRef.current = null;
                                }
                            }}
                            onBlur={() => {
                                setNotesFocused(false);
                                if (notesSyncTimerRef.current) {
                                    clearTimeout(notesSyncTimerRef.current);
                                    notesSyncTimerRef.current = null;
                                }
                                // Ensure latest value is persisted when the user leaves the field
                                handleRoleChange(role.key, "notes", localNotes);
                            }}
                        />
                    </Box>

                    {assignment.employee && (
                        <Box sx={{ mt: 2 }}>
                            <Chip
                                icon={<CheckIcon />}
                                label="Assigned"
                                color="primary"
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Fade in timeout={800}>
                <Box>
                    {/* Header */}
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}
                        >
                            Additional Information
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
                            Configure key staff roles, salary slip templates, and settlement documentation
                        </Typography>

                        {/* Summary Stats */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4 }}>
                            <Paper
                                sx={{
                                    px: 3,
                                    py: 2,
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white'
                                }}
                            >
                                <Typography variant="h4" fontWeight="bold">{getAssignedCount()}</Typography>
                                <Typography variant="body2">Roles Assigned</Typography>
                            </Paper>
                            <Paper
                                sx={{
                                    px: 3,
                                    py: 2,
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    color: 'white'
                                }}
                            >
                                <Typography variant="h4" fontWeight="bold">{roles.length}</Typography>
                                <Typography variant="body2">Total Roles</Typography>
                            </Paper>
                        </Box>
                    </Box>

                    {/* Alert Message */}
                    <Collapse in={showAlert}>
                        <Alert
                            severity="success"
                            sx={{
                                mb: 4,
                                borderRadius: 3,
                                '& .MuiAlert-icon': {
                                    fontSize: '1.5rem'
                                }
                            }}
                            onClose={() => setShowAlert(false)}
                        >
                            <Typography variant="body1" fontWeight="medium">
                                Additional information saved successfully! All role assignments and templates have been updated.
                            </Typography>
                        </Alert>
                    </Collapse>

                    {/* Key Staff Roles Section */}
                    <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', mb: 4 }}>
                        <Box sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            p: 4,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <AdminIcon sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="h4" fontWeight="600">
                                    Key Staff Roles
                                </Typography>
                                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                    Assign employees to critical administrative positions and workflows
                                </Typography>
                            </Box>
                        </Box>
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={4}>
                                {roles.map(role => (
                                    <Grid item size={{ xs: 12, lg: 6, xl: 4 }} key={role.key}>
                                        <RoleCard
                                            role={role}
                                            assignment={roleAssignments[role.key]}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Document Templates Section */}
                    <Grid container spacing={4}>
                        {/* Salary Slip Text */}
                        <Grid item size={{ xs: 12, lg: 6 }}>
                            <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', height: '100%' }}>
                                <Box sx={{
                                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                    color: 'white',
                                    p: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                    <ReceiptIcon sx={{ fontSize: 32 }} />
                                    <Box>
                                        <Typography variant="h5" fontWeight="600">
                                            Salary Slip Template
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                            Customize salary slip footer text
                                        </Typography>
                                    </Box>
                                </Box>
                                <CardContent sx={{ p: 4 }}>
                                    <Grid container spacing={3}>
                                        <Grid item size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="English Text"
                                                value={salarySlipText.en}
                                                onChange={e => setSalarySlipText({ ...salarySlipText, en: e.target.value })}
                                                multiline
                                                rows={4}
                                                placeholder="Enter salary slip footer text in English..."
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 2
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Arabic Text"
                                                value={salarySlipText.ar}
                                                onChange={e => setSalarySlipText({ ...salarySlipText, ar: e.target.value })}
                                                multiline
                                                rows={4}
                                                placeholder="أدخل نص تذييل كشف الراتب باللغة العربية..."
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 2
                                                    }
                                                }}
                                                inputProps={{ dir: "rtl", style: { textAlign: "right" } }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Settlement Text */}
                        <Grid item size={{ xs: 12, lg: 6 }}>
                            <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', height: '100%' }}>
                                <Box sx={{
                                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                    color: 'white',
                                    p: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                    <SettlementIcon sx={{ fontSize: 32 }} />
                                    <Box>
                                        <Typography variant="h5" fontWeight="600">
                                            Settlement Template
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                            Customize settlement document text
                                        </Typography>
                                    </Box>
                                </Box>
                                <CardContent sx={{ p: 4 }}>
                                    <Grid container spacing={3}>
                                        <Grid item size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="English Text"
                                                value={settlementText.en}
                                                onChange={e => setSettlementText({ ...settlementText, en: e.target.value })}
                                                multiline
                                                rows={4}
                                                placeholder="Enter settlement document text in English..."
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 2
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Arabic Text"
                                                value={settlementText.ar}
                                                onChange={e => setSettlementText({ ...settlementText, ar: e.target.value })}
                                                multiline
                                                rows={4}
                                                placeholder="أدخل نص وثيقة التسوية باللغة العربية..."
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 2
                                                    }
                                                }}
                                                inputProps={{ dir: "rtl", style: { textAlign: "right" } }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            mt: 4,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 3
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSave}
                            disabled={loading}
                            sx={{
                                minWidth: 150,
                                py: 1.5,
                                borderRadius: 3,
                                background: saveSuccess
                                    ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
                                    : 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                                boxShadow: '0 4px 15px rgba(33, 150, 243, 0.4)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.6)',
                                },
                                transition: 'all 0.3s ease'
                            }}
                            startIcon={
                                loading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : saveSuccess ? (
                                    <CheckIcon />
                                ) : null
                            }
                        >
                            {loading ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleReset}
                            sx={{
                                minWidth: 150,
                                py: 1.5,
                                borderRadius: 3,
                                color: 'white',
                                borderColor: 'white',
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease'
                            }}
                            startIcon={<RefreshIcon />}
                        >
                            Reset Form
                        </Button>
                    </Paper>

                    {/* Success Toast */}
                    {saveSuccess && (
                        <Fade in={saveSuccess}>
                            <Box
                                sx={{
                                    position: 'fixed',
                                    bottom: 24,
                                    right: 24,
                                    zIndex: 1000,
                                }}
                            >
                                <Card
                                    sx={{
                                        background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                                        color: 'white',
                                        px: 3,
                                        py: 2,
                                        borderRadius: 3,
                                        boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CheckIcon />
                                        <Typography variant="body1" fontWeight="medium">
                                            Additional information saved successfully!
                                        </Typography>
                                    </Box>
                                </Card>
                            </Box>
                        </Fade>
                    )}
                </Box>
            </Fade>
        </Container>
    )
}

export default AdditionalInfoTab