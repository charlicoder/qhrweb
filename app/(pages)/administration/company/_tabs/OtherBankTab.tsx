import React, { useState, useEffect } from "react";
// import { fetchBanks, fetchOtherBankAccounts, saveOtherBankAccounts } from "../../api/companySetupApi";

function validateIBAN(iban) {
    // Enhanced IBAN validation
    if (!iban) return false;
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();
    return /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(cleanIban) && cleanIban.length >= 15;
}

const initialBankRow = {
    bank_id: "",
    company_name: "",
    account_number: "",
    iban: "",
    employer_eid: "",
    payer_eid: "",
    payer_qid: "",
    top_text: "",
    bottom_text: "",
    selected: false,
};



const OtherBankTab = () => {
    const [rows, setRows] = useState([{ ...initialBankRow }]);
    const [banks, setBanks] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);

    const BRANCH_ID = 1;

    const handleChange = (idx, field, value) => {
        const newRows = rows.map((row, i) => i === idx ? { ...row, [field]: value } : row);
        setRows(newRows);

        // Clear specific field error when user starts typing
        if (errors[idx] && errors[idx][field]) {
            const newErrors = [...errors];
            delete newErrors[idx][field];
            setErrors(newErrors);
        }
    };

    const handleAddRow = () => {
        setRows([...rows, { ...initialBankRow }]);
        setErrors([...errors, {}]);
    };

    const handleDeleteRow = (idx) => {
        setRows(rows.filter((_, i) => i !== idx));
        setErrors(errors.filter((_, i) => i !== idx));
    };

    const handleSelectRow = (idx, checked) => {
        setRows(rows.map((row, i) => i === idx ? { ...row, selected: checked } : row));
    };

    const handleSelectAll = (checked) => {
        setRows(rows.map(r => ({ ...r, selected: checked })));
    };

    const handleDeleteSelected = () => {
        const newRows = rows.filter(row => !row.selected);
        const newErrors = errors.filter((_, i) => !rows[i].selected);
        setRows(newRows);
        setErrors(newErrors);
    };

    const validateRows = () => {
        let newErrors = rows.map(row => {
            let rowErr = {};
            if (!row.bank_id) rowErr.bank_id = "Bank selection required";
            if (!row.company_name.trim()) rowErr.company_name = "Company name required";
            if (!row.account_number.trim()) rowErr.account_number = "Account number required";
            if (!row.iban.trim()) {
                rowErr.iban = "IBAN required";
            } else if (!validateIBAN(row.iban)) {
                rowErr.iban = "Invalid IBAN format";
            }
            return rowErr;
        });
        setErrors(newErrors);
        return newErrors.every(e => Object.keys(e).length === 0);
    };

    const handleSave = async () => {
        if (!validateRows()) return;
        setLoading(true);
        try {
            await saveOtherBankAccounts(BRANCH_ID, rows);
            setSaveSuccess(true);
            setShowAlert(true);
            setTimeout(() => {
                setSaveSuccess(false);
                setShowAlert(false);
            }, 4000);
        } catch (e) {
            // optionally show error
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const getSelectedCount = () => rows.filter(r => r.selected).length;
    const getValidCount = () => rows.filter(r => r.bank_id && r.company_name && r.account_number && r.iban).length;

    const styles = {
        container: {
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '2rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        header: {
            textAlign: 'center',
            marginBottom: '3rem'
        },
        title: {
            fontSize: '3rem',
            fontWeight: '700',
            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
        },
        subtitle: {
            fontSize: '1.25rem',
            color: '#6b7280',
            maxWidth: '800px',
            margin: '0 auto 2rem'
        },
        statsContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem'
        },
        statCard: {
            padding: '1.5rem 2rem',
            borderRadius: '1rem',
            color: 'white',
            textAlign: 'center',
            minWidth: '150px'
        },
        statNumber: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            margin: 0
        },
        statLabel: {
            fontSize: '0.875rem',
            margin: 0,
            opacity: 0.9
        },
        alert: {
            padding: '1rem 1.5rem',
            borderRadius: '1rem',
            backgroundColor: '#d1f2eb',
            border: '1px solid #a7f3d0',
            color: '#047857',
            marginBottom: '2rem',
            display: showAlert ? 'flex' : 'none',
            alignItems: 'center',
            gap: '0.5rem',
            animation: showAlert ? 'fadeIn 0.3s ease' : 'none'
        },
        sectionCard: {
            borderRadius: '1.5rem',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            backgroundColor: 'white',
            marginBottom: '2rem'
        },
        sectionHeader: {
            padding: '2rem',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        sectionIcon: {
            fontSize: '2.5rem'
        },
        sectionTitle: {
            fontSize: '2rem',
            fontWeight: '600',
            margin: 0
        },
        sectionSubtitle: {
            fontSize: '1.125rem',
            margin: '0.5rem 0 0 0',
            opacity: 0.9
        },
        sectionContent: {
            padding: '2rem'
        },
        bankRow: {
            display: 'grid',
            gridTemplateColumns: '40px 1fr',
            gap: '1rem',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '2px solid #e5e7eb',
            backgroundColor: 'white',
            marginBottom: '1rem',
            transition: 'all 0.3s ease'
        },
        bankRowValid: {
            borderColor: '#10b981',
            backgroundColor: '#f0fdf4'
        },
        bankRowSelected: {
            borderColor: '#3b82f6',
            backgroundColor: '#eff6ff'
        },
        bankRowError: {
            borderColor: '#ef4444',
            backgroundColor: '#fef2f2'
        },
        checkbox: {
            width: '1.25rem',
            height: '1.25rem',
            accentColor: '#3b82f6',
            cursor: 'pointer'
        },
        bankContent: {
            display: 'grid',
            gap: '1rem'
        },
        bankHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            padding: '0.5rem 0'
        },
        bankTitle: {
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0
        },
        bankSummary: {
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: '0.25rem 0 0 0'
        },
        expandButton: {
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: '#f3f4f6',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        deleteButton: {
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        formGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        },
        label: {
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151'
        },
        input: {
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '2px solid #e5e7eb',
            fontSize: '0.875rem',
            transition: 'all 0.3s ease',
            outline: 'none'
        },
        inputError: {
            borderColor: '#ef4444'
        },
        inputValid: {
            borderColor: '#10b981'
        },
        select: {
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '2px solid #e5e7eb',
            fontSize: '0.875rem',
            transition: 'all 0.3s ease',
            outline: 'none',
            backgroundColor: 'white'
        },
        errorText: {
            fontSize: '0.75rem',
            color: '#ef4444',
            marginTop: '0.25rem'
        },
        validText: {
            fontSize: '0.75rem',
            color: '#10b981',
            marginTop: '0.25rem'
        },
        actionBar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '1rem',
            marginBottom: '2rem'
        },
        actionButtons: {
            display: 'flex',
            gap: '1rem'
        },
        button: {
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        primaryButton: {
            backgroundColor: '#3b82f6',
            color: 'white'
        },
        addButton: {
            backgroundColor: '#10b981',
            color: 'white'
        },
        dangerButton: {
            backgroundColor: '#ef4444',
            color: 'white'
        },
        buttonDisabled: {
            opacity: 0.5,
            cursor: 'not-allowed'
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        saveButton: {
            padding: '0.75rem 2rem',
            borderRadius: '0.75rem',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '120px',
            background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(33, 150, 243, 0.4)'
        },
        saveButtonSuccess: {
            background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
        },
        spinner: {
            width: '1rem',
            height: '1rem',
            border: '2px solid transparent',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        successToast: {
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
            display: saveSuccess ? 'flex' : 'none',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 1000,
            animation: saveSuccess ? 'slideIn 0.3s ease' : 'none'
        }
    };

    // Add CSS animations
    const cssAnimations = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = cssAnimations;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const BankRow = ({ row, index, error }) => {
        const isExpanded = expandedRow === index;
        const [localRow, setLocalRow] = useState(row);
        const timersRef = React.useRef({});

        useEffect(() => {
            setLocalRow(row);
        }, [row]);

        const commitField = (field, value) => {
            // Debounce parent update to avoid re-render focus loss
            if (timersRef.current[field]) clearTimeout(timersRef.current[field]);
            timersRef.current[field] = setTimeout(() => {
                handleChange(index, field, value);
            }, 600);
        };

        const setField = (field, value) => {
            setLocalRow(prev => ({ ...prev, [field]: value }));
            commitField(field, value);
        };

        const isValid = localRow.bank_id && localRow.company_name && localRow.account_number && localRow.iban;
        const hasError = error && Object.keys(error).length > 0;

        let rowStyle = { ...styles.bankRow };
        if (row.selected) rowStyle = { ...rowStyle, ...styles.bankRowSelected };
        else if (isValid) rowStyle = { ...rowStyle, ...styles.bankRowValid };
        else if (hasError) rowStyle = { ...rowStyle, ...styles.bankRowError };

        const bankName = banks.find(b => b.id === parseInt(localRow.bank_id))?.name || 'Select Bank';
        const summary = localRow.company_name && localRow.account_number ?
            `${localRow.company_name} • Account: ${localRow.account_number}` :
            'Incomplete bank details';

        return (
            <div style={rowStyle}>
                <input
                    type="checkbox"
                    style={styles.checkbox}
                    checked={row.selected}
                    onChange={e => handleSelectRow(index, e.target.checked)}
                />

                <div style={styles.bankContent}>
                    <div style={styles.bankHeader} onClick={() => setExpandedRow(isExpanded ? null : index)}>
                        <div>
                            <h3 style={styles.bankTitle}>
                                {bankName}
                                {isValid && <span style={{ color: '#10b981', marginLeft: '0.5rem' }}>✓</span>}
                                {hasError && <span style={{ color: '#ef4444', marginLeft: '0.5rem' }}>⚠</span>}
                            </h3>
                            <p style={styles.bankSummary}>{summary}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                style={styles.expandButton}
                                onClick={e => {
                                    e.stopPropagation();
                                    setExpandedRow(isExpanded ? null : index);
                                }}
                            >
                                {isExpanded ? '▼' : '▶'}
                            </button>
                            <button
                                style={styles.deleteButton}
                                onClick={e => {
                                    e.stopPropagation();
                                    handleDeleteRow(index);
                                }}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>

                    {isExpanded && (
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Bank *</label>
                                <select
                                    style={{
                                        ...styles.select,
                                        ...(error?.bank_id ? styles.inputError : row.bank_id ? styles.inputValid : {})
                                    }}
                                    value={localRow.bank_id}
                                    onChange={e => setField("bank_id", e.target.value)}
                                >
                                    <option value="">Select a bank...</option>
                                    {banks.map(b => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                                {error?.bank_id && <div style={styles.errorText}>{error.bank_id}</div>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Company Name *</label>
                                <input
                                    style={{
                                        ...styles.input,
                                        ...(error?.company_name ? styles.inputError : row.company_name ? styles.inputValid : {})
                                    }}
                                    value={localRow.company_name}
                                    onChange={e => setField("company_name", e.target.value)}
                                    placeholder="Enter company name"
                                />
                                {error?.company_name && <div style={styles.errorText}>{error.company_name}</div>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Account Number *</label>
                                <input
                                    style={{
                                        ...styles.input,
                                        ...(error?.account_number ? styles.inputError : row.account_number ? styles.inputValid : {})
                                    }}
                                    value={localRow.account_number}
                                    onChange={e => setField("account_number", e.target.value)}
                                    placeholder="Enter account number"
                                />
                                {error?.account_number && <div style={styles.errorText}>{error.account_number}</div>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>IBAN *</label>
                                <input
                                    style={{
                                        ...styles.input,
                                        ...(error?.iban ? styles.inputError : row.iban && validateIBAN(row.iban) ? styles.inputValid : {})
                                    }}
                                    value={localRow.iban}
                                    onChange={e => setField("iban", e.target.value.toUpperCase())}
                                    placeholder="AE070331234567890123456"
                                />
                                {error?.iban && <div style={styles.errorText}>{error.iban}</div>}
                                {localRow.iban && validateIBAN(localRow.iban) && !error?.iban &&
                                    <div style={styles.validText}>Valid IBAN format</div>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Employer EID</label>
                                <input
                                    style={styles.input}
                                    value={localRow.employer_eid}
                                    onChange={e => setField("employer_eid", e.target.value)}
                                    placeholder="Optional"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Payer EID</label>
                                <input
                                    style={styles.input}
                                    value={localRow.payer_eid}
                                    onChange={e => setField("payer_eid", e.target.value)}
                                    placeholder="Optional"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Payer QID</label>
                                <input
                                    style={styles.input}
                                    value={localRow.payer_qid}
                                    onChange={e => setField("payer_qid", e.target.value)}
                                    placeholder="Optional"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Top Text</label>
                                <input
                                    style={styles.input}
                                    value={localRow.top_text}
                                    onChange={e => setField("top_text", e.target.value)}
                                    placeholder="Header text for documents"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Bottom Text</label>
                                <input
                                    style={styles.input}
                                    value={localRow.bottom_text}
                                    onChange={e => setField("bottom_text", e.target.value)}
                                    placeholder="Footer text for documents"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };


    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>Other Bank Accounts</h1>
                <p style={styles.subtitle}>
                    Manage additional bank accounts for multi-bank operations and financial flexibility
                </p>

                {/* Summary Stats */}
                <div style={styles.statsContainer}>
                    <div style={{ ...styles.statCard, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <h2 style={styles.statNumber}>{getValidCount()}</h2>
                        <p style={styles.statLabel}>Valid Accounts</p>
                    </div>
                    <div style={{ ...styles.statCard, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <h2 style={styles.statNumber}>{rows.length}</h2>
                        <p style={styles.statLabel}>Total Entries</p>
                    </div>
                    <div style={{ ...styles.statCard, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <h2 style={styles.statNumber}>{getSelectedCount()}</h2>
                        <p style={styles.statLabel}>Selected</p>
                    </div>
                </div>
            </div>

            {/* Success Alert */}
            <div style={styles.alert}>
                <span style={{ fontSize: '1.25rem' }}>✅</span>
                <span style={{ fontWeight: '600' }}>Bank accounts saved successfully!</span>
            </div>

            {/* Action Bar */}
            <div style={styles.actionBar}>
                <div>
                    <input
                        type="checkbox"
                        style={styles.checkbox}
                        checked={rows.length > 0 && rows.every(r => r.selected)}
                        onChange={e => handleSelectAll(e.target.checked)}
                    />
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        {getSelectedCount() > 0 ? `${getSelectedCount()} selected` : 'Select all'}
                    </span>
                </div>

                <div style={styles.actionButtons}>
                    <button
                        style={{ ...styles.button, ...styles.addButton }}
                        onClick={handleAddRow}
                    >
                        ➕ Add Bank Account
                    </button>

                    <button
                        style={{
                            ...styles.button,
                            ...styles.dangerButton,
                            ...(getSelectedCount() === 0 ? styles.buttonDisabled : {})
                        }}
                        onClick={handleDeleteSelected}
                        disabled={getSelectedCount() === 0}
                    >
                        🗑️ Delete Selected ({getSelectedCount()})
                    </button>
                </div>
            </div>

            {/* Bank Accounts Section */}
            <div style={styles.sectionCard}>
                <div style={{ ...styles.sectionHeader, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                    <span style={styles.sectionIcon}>🏦</span>
                    <div>
                        <h2 style={styles.sectionTitle}>Bank Account Details</h2>
                        <p style={styles.sectionSubtitle}>Click to expand and configure each account</p>
                    </div>
                </div>
                <div style={styles.sectionContent}>
                    {rows.map((row, index) => (
                        <BankRow
                            key={index}
                            row={row}
                            index={index}
                            error={errors[index] || {}}
                        />
                    ))}

                    {rows.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                            <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>🏦</p>
                            <p>No bank accounts configured yet.</p>
                            <button
                                style={{ ...styles.button, ...styles.addButton, marginTop: '1rem' }}
                                onClick={handleAddRow}
                            >
                                ➕ Add Your First Bank Account
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Save Button */}
            <div style={styles.buttonContainer}>
                <button
                    style={{
                        ...styles.saveButton,
                        ...(saveSuccess ? styles.saveButtonSuccess : {}),
                        ...(loading ? styles.buttonDisabled : {})
                    }}
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <div style={styles.spinner}></div>
                            <span style={{ marginLeft: '0.5rem' }}>Saving...</span>
                        </>
                    ) : saveSuccess ? (
                        <>
                            <span style={{ marginRight: '0.5rem' }}>✅</span>
                            Saved!
                        </>
                    ) : (
                        `💾 Save ${getValidCount()} Bank Account${getValidCount() !== 1 ? 's' : ''}`
                    )}
                </button>
            </div>

            {/* Success Toast */}
            <div style={styles.successToast}>
                <span>✅</span>
                <span style={{ fontWeight: '600' }}>Bank accounts saved successfully!</span>
            </div>
        </div>
    )
}

export default OtherBankTab