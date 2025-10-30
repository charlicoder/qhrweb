"use client"

import React, { useState, useEffect } from "react";
// import { fetchReportSignatories, saveReportSignatories, fetchAllReportSignatories } from "../../api/companySetupApi";

const MAX_SIGNATORIES = 6;

const mockReportTypes = [
    { name: "Monthly Financial Report", id: 1 },
    { name: "Annual Performance Report", id: 2 },
    { name: "HR Summary Report", id: 3 },
    { name: "Compliance Report", id: 4 },
    { name: "Board Meeting Minutes", id: 5 },
    { name: "Audit Report", id: 6 }
];

const SignatoriesTab = () => {
    const [reportTypes] = useState(mockReportTypes);
    const [reportName, setReportName] = useState("");
    const [signatories, setSignatories] = useState(Array(MAX_SIGNATORIES).fill({ name: "", underline: false }));
    const [showUnderline, setShowUnderline] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [activeCount, setActiveCount] = useState(0);

    const handleSignatoryChange = (idx, field, value) => {
        setSignatories(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
    };

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) return;

        const updated = [...signatories];
        const [moved] = updated.splice(draggedIndex, 1);
        updated.splice(dropIndex, 0, moved);
        setSignatories(updated);
        setDraggedIndex(null);
    };

    const handleSave = async () => {
        if (!reportName) return;
        setLoading(true);
        try {
            // await saveReportSignatories(BRANCH_ID, reportName, signatories);
            setSaveSuccess(true);
            setShowAlert(true);
            setTimeout(() => {
                setSaveSuccess(false);
                setShowAlert(false);
            }, 4000);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setReportName("");
        setSignatories(Array(MAX_SIGNATORIES).fill({ name: "", underline: false }));
        setShowUnderline(false);
        setShowAlert(false);
    };

    const getFilledSignatories = () => {
        return signatories.filter(sig => sig.name.trim() !== '').length;
    };

    const styles = {
        container: {
            maxWidth: '1000px',
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
            maxWidth: '600px',
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
        configGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        },
        label: {
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
        },
        select: {
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            border: '2px solid #e5e7eb',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backgroundColor: 'white',
            outline: 'none'
        },
        selectFocus: {
            borderColor: '#3b82f6',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
        },
        checkboxContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            borderRadius: '0.75rem',
            backgroundColor: '#f8fafc',
            border: '2px solid #e2e8f0'
        },
        checkbox: {
            width: '1.25rem',
            height: '1.25rem',
            accentColor: '#3b82f6'
        },
        checkboxLabel: {
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        infoIcon: {
            width: '1rem',
            height: '1rem',
            color: '#6b7280',
            cursor: 'help'
        },
        signatoryGrid: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        },
        signatoryRow: {
            display: 'grid',
            gridTemplateColumns: '40px 1fr auto',
            gap: '1rem',
            alignItems: 'center',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '2px solid #e5e7eb',
            backgroundColor: 'white',
            transition: 'all 0.3s ease'
        },
        signatoryRowFilled: {
            borderColor: '#3b82f6',
            backgroundColor: '#f0f9ff'
        },
        signatoryRowDragging: {
            opacity: 0.5,
            transform: 'scale(0.98)'
        },
        dragHandle: {
            cursor: 'grab',
            color: '#6b7280',
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            backgroundColor: '#f3f4f6',
            transition: 'all 0.2s ease'
        },
        dragHandleActive: {
            cursor: 'grabbing',
            backgroundColor: '#e5e7eb'
        },
        input: {
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '2px solid #e5e7eb',
            fontSize: '0.875rem',
            transition: 'all 0.3s ease',
            outline: 'none'
        },
        inputFocus: {
            borderColor: '#3b82f6',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
        },
        underlineCheckbox: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: '#6b7280'
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        button: {
            padding: '0.75rem 2rem',
            borderRadius: '0.75rem',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '120px'
        },
        primaryButton: {
            background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(33, 150, 243, 0.4)'
        },
        primaryButtonSuccess: {
            background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
        },
        secondaryButton: {
            backgroundColor: 'transparent',
            color: 'white',
            border: '2px solid white'
        },
        buttonDisabled: {
            opacity: 0.6,
            cursor: 'not-allowed'
        },
        spinner: {
            width: '1rem',
            height: '1rem',
            border: '2px solid transparent',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        infoNote: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '1rem',
            borderRadius: '0.75rem',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            fontSize: '0.875rem',
            color: '#1e40af'
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

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>Report Signatories</h1>
                <p style={styles.subtitle}>
                    Configure authorized signatories for official reports and documents
                </p>

                {/* Summary Stats */}
                <div style={styles.statsContainer}>
                    <div style={{ ...styles.statCard, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <h2 style={styles.statNumber}>{activeCount}</h2>
                        <p style={styles.statLabel}>Active Signatories</p>
                    </div>
                    <div style={{ ...styles.statCard, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <h2 style={styles.statNumber}>{MAX_SIGNATORIES}</h2>
                        <p style={styles.statLabel}>Total Positions</p>
                    </div>
                </div>
            </div>

            {/* Success Alert */}
            <div style={styles.alert}>
                <span style={{ fontSize: '1.25rem' }}>✅</span>
                <span style={{ fontWeight: '600' }}>Signatories configuration saved successfully!</span>
            </div>

            {/* Configuration Section */}
            <div style={styles.sectionCard}>
                <div style={{ ...styles.sectionHeader, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <span style={styles.sectionIcon}>📝</span>
                    <div>
                        <h2 style={styles.sectionTitle}>Report Configuration</h2>
                        <p style={styles.sectionSubtitle}>Select report type and signature preferences</p>
                    </div>
                </div>
                <div style={styles.sectionContent}>
                    <div style={styles.configGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Report Type</label>
                            <select
                                style={styles.select}
                                value={reportName}
                                onChange={e => setReportName(e.target.value)}
                                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            >
                                <option value="">Select a report type...</option>
                                {reportTypes.map(rt => (
                                    <option value={rt.name} key={rt.id}>{rt.name}</option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Global Signature Settings</label>
                            <div style={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    style={styles.checkbox}
                                    checked={showUnderline}
                                    onChange={e => setShowUnderline(e.target.checked)}
                                />
                                <label style={styles.checkboxLabel}>
                                    Show underlines for all signatures
                                    <span
                                        style={styles.infoIcon}
                                        title="If checked, all signature lines will be underlined on printed reports"
                                    >
                                        ℹ️
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Signatories Section */}
            <div style={styles.sectionCard}>
                <div style={{ ...styles.sectionHeader, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                    <span style={styles.sectionIcon}>👥</span>
                    <div>
                        <h2 style={styles.sectionTitle}>Signature Positions</h2>
                        <p style={styles.sectionSubtitle}>Drag to reorder • Fill in authorized signatories</p>
                    </div>
                </div>
                <div style={styles.sectionContent}>
                    <div style={styles.signatoryGrid}>
                        {signatories.map((sig, idx) => (
                            <div
                                key={idx}
                                style={{
                                    ...styles.signatoryRow,
                                    ...(sig.name.trim() ? styles.signatoryRowFilled : {}),
                                    ...(draggedIndex === idx ? styles.signatoryRowDragging : {})
                                }}
                                draggable
                                onDragStart={e => handleDragStart(e, idx)}
                                onDragOver={e => handleDragOver(e, idx)}
                                onDrop={e => handleDrop(e, idx)}
                            >
                                <div
                                    style={{
                                        ...styles.dragHandle,
                                        ...(draggedIndex === idx ? styles.dragHandleActive : {})
                                    }}
                                    title="Drag to reorder"
                                >
                                    ⋮⋮
                                </div>

                                <input
                                    style={styles.input}
                                    placeholder={`Signatory ${idx + 1} - Name/Position (e.g., John Smith, CEO)`}
                                    value={sig.name}
                                    onChange={e => handleSignatoryChange(idx, "name", e.target.value)}
                                    onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                />

                                <div style={styles.underlineCheckbox}>
                                    <input
                                        type="checkbox"
                                        checked={sig.underline || showUnderline}
                                        onChange={e => handleSignatoryChange(idx, "underline", e.target.checked)}
                                        disabled={showUnderline}
                                        style={{ width: '1rem', height: '1rem', accentColor: '#3b82f6' }}
                                    />
                                    <span>Underline</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Info Note */}
            <div style={styles.infoNote}>
                <span style={{ fontSize: '1.25rem', marginTop: '0.125rem' }}>💡</span>
                <div>
                    <strong>Ordering Instructions:</strong> Drag the grip handles (⋮⋮) to reorder signatories.
                    They will appear in this exact order on your reports. Leave unused positions empty.
                </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.buttonContainer}>
                <button
                    style={{
                        ...styles.button,
                        ...styles.primaryButton,
                        ...(saveSuccess ? styles.primaryButtonSuccess : {}),
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
                        'Save Configuration'
                    )}
                </button>

                <button
                    style={{ ...styles.button, ...styles.secondaryButton }}
                    onClick={handleReset}
                >
                    🔄 Reset Form
                </button>
            </div>

            {/* Success Toast */}
            <div style={styles.successToast}>
                <span>✅</span>
                <span style={{ fontWeight: '600' }}>Configuration saved successfully!</span>
            </div>
        </div>
    )
}

export default SignatoriesTab