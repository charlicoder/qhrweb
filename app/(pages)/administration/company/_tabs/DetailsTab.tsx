"use client"

import React, { useState } from 'react'
import {
    TextField,
    Button,
    MenuItem,
    Grid,
    InputLabel,
    Select,
    FormControl,
    Box,
    Typography,
    Avatar,
    CircularProgress,
    Card,
    CardContent,
    Chip,
    IconButton,
    Fade,
    Paper,
    Divider,
    Container,
    InputAdornment
} from "@mui/material";
import {
    Business as BusinessIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Language as WebsiteIcon,
    AccountBalance as BankIcon,
    Upload as UploadIcon,
    CloudUpload as CloudUploadIcon,
    Close as CloseIcon,
    Check as CheckIcon,
    Refresh as RefreshIcon
} from "@mui/icons-material";

// Mock data - replace with actual API calls
const countryList = [
    "United Arab Emirates", "Qatar", "Saudi Arabia", "Jordan", "Kuwait", "Bahrain", "Oman", "Egypt", "Lebanon", "Other"
];

const currencyList = ["AED", "USD", "EUR", "QAR", "SAR", "JOD", "KWD", "BHD", "OMR", "EGP", "LBP"];

// API base points to the Django server on port 8000 at the same host
const API_BASE = "";


const DetailsTab = () => {

    const [banks, setBanks] = useState([]);
    const [branches, setBranches] = useState([]);
    const [logoPreview, setLogoPreview] = useState(null);
    const [smallLogoPreview, setSmallLogoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name_en: "",
        name_ar: "",
        address_en: "",
        address_ar: "",
        country: "",
        phone1: "",
        phone2: "",
        fax: "",
        email: "",
        website: "",
        po_box: "",
        zip_code: "",
        bank_id: "",
        bank_branch_id: "",
        account_number: "",
        currency: "AED",
        company_logo: null,
        small_company_logo: null,
        employer_eid: "",
        industry_type: "",
        profile: "",
        legal_form: "",
        calendar_type: "Gregorian"
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleSubmit = () => {
    }

    const handleInputChange = () => {
        console.log("handleInputChange")
    }

    const handleBankChange = () => {
        console.log("handleInputChange")
    }

    const handleLogoDrop = () => {
        console.log("handleInputChange")
    }

    const handleReset = () => {
        console.log("handleInputChange")
    }

    const DropzoneCard = ({ onDrop, preview, title, icon }) => {
        const handleFileSelect = (e) => {
            const file = e.target.files[0];
            if (file) onDrop(file);
        };

        return (
            <Card
                sx={{
                    border: '2px dashed',
                    borderColor: preview ? 'primary.main' : 'grey.300',
                    bgcolor: preview ? 'primary.50' : 'grey.50',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.50',
                        transform: 'translateY(-2px)',
                        boxShadow: 6
                    }
                }}
            >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                        id={`upload-${title}`}
                    />
                    <label htmlFor={`upload-${title}`} style={{ cursor: 'pointer', display: 'block' }}>
                        {preview ? (
                            <Box>
                                <Avatar
                                    src={preview}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        mx: 'auto',
                                        mb: 2,
                                        border: 3,
                                        borderColor: 'primary.main'
                                    }}
                                />
                                <Typography variant="body2" color="primary.main" fontWeight="medium">
                                    Click to change {title.toLowerCase()}
                                </Typography>
                            </Box>
                        ) : (
                            <Box>
                                {icon}
                                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Drag & drop or click to upload
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                                    Max 2MB • PNG, JPG, SVG
                                </Typography>
                            </Box>
                        )}
                    </label>
                </CardContent>
            </Card>
        );
    };



    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Fade in timeout={800}>
                <Box>
                    {/* Header */}
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}
                        >
                            Company Details
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            Configure your company information and banking details with our modern, intuitive interface
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>

                            {/* Company Information Section */}
                            <Grid item xs={12}>
                                <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                                    <Box sx={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        p: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}>
                                        <BusinessIcon sx={{ fontSize: 32 }} />
                                        <Box>
                                            <Typography variant="h5" fontWeight="600">
                                                Company Information
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Basic company details and contact information
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ p: 4 }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Company Name (English)"
                                                    value={formData.name_en}
                                                    onChange={(e) => handleInputChange('name_en', e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2,
                                                            transition: 'all 0.3s ease'
                                                        }
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <BusinessIcon color="primary" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Company Name (Arabic)"
                                                    value={formData.name_ar}
                                                    onChange={(e) => handleInputChange('name_ar', e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <BusinessIcon color="primary" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Address (English)"
                                                    value={formData.address_en}
                                                    onChange={(e) => handleInputChange('address_en', e.target.value)}
                                                    variant="outlined"
                                                    multiline
                                                    rows={3}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <LocationIcon color="primary" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Address (Arabic)"
                                                    value={formData.address_ar}
                                                    onChange={(e) => handleInputChange('address_ar', e.target.value)}
                                                    variant="outlined"
                                                    multiline
                                                    rows={3}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <LocationIcon color="primary" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Country</InputLabel>
                                                    <Select
                                                        value={formData.country}
                                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                                        label="Country"
                                                        sx={{ borderRadius: 2 }}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 300,
                                                                    borderRadius: 12
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        {countryList.map(country => (
                                                            <MenuItem value={country} key={country}>
                                                                {country}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Contact Information Section */}
                            <Grid item xs={12}>
                                <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                                    <Box sx={{
                                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                        color: 'white',
                                        p: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}>
                                        <PhoneIcon sx={{ fontSize: 32 }} />
                                        <Box>
                                            <Typography variant="h5" fontWeight="600">
                                                Contact Information
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Phone numbers, email, and web presence
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ p: 4 }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Primary Phone"
                                                    placeholder="e.g. 0097141234567"
                                                    value={formData.phone1}
                                                    onChange={(e) => handleInputChange('phone1', e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <PhoneIcon color="primary" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Secondary Phone"
                                                    placeholder="Optional"
                                                    value={formData.phone2}
                                                    onChange={(e) => handleInputChange('phone2', e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <PhoneIcon color="action" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Email Address"
                                                    placeholder="e.g. info@company.com"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    variant="outlined"
                                                    type="email"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <EmailIcon color="primary" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Website"
                                                    placeholder="Optional"
                                                    value={formData.website}
                                                    onChange={(e) => handleInputChange('website', e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <WebsiteIcon color="primary" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="P.O. Box"
                                                    placeholder="Optional"
                                                    value={formData.po_box}
                                                    onChange={(e) => handleInputChange('po_box', e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Zip Code"
                                                    placeholder="Optional"
                                                    value={formData.zip_code}
                                                    onChange={(e) => handleInputChange('zip_code', e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Banking Information Section */}
                            <Grid item xs={12}>
                                <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                                    <Box sx={{
                                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                        color: 'white',
                                        p: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}>
                                        <BankIcon sx={{ fontSize: 32 }} />
                                        <Box>
                                            <Typography variant="h5" fontWeight="600">
                                                Banking Information
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Bank account details and currency settings
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ p: 4 }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Bank Name</InputLabel>
                                                    <Select
                                                        value={formData.bank_id}
                                                        onChange={(e) => handleBankChange(e.target.value)}
                                                        label="Bank Name"
                                                        sx={{ borderRadius: 2 }}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 300,
                                                                    borderRadius: 12
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <MenuItem value="">
                                                            <em>Select a bank</em>
                                                        </MenuItem>
                                                        {banks.map(bank => (
                                                            <MenuItem value={bank.id} key={bank.id}>
                                                                {bank.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth disabled={!formData.bank_id}>
                                                    <InputLabel>Bank Branch</InputLabel>
                                                    <Select
                                                        value={formData.bank_branch_id}
                                                        onChange={(e) => handleInputChange('bank_branch_id', e.target.value)}
                                                        label="Bank Branch"
                                                        sx={{ borderRadius: 2 }}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 300,
                                                                    borderRadius: 12
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        {branches.map(branch => (
                                                            <MenuItem value={branch.id} key={branch.id}>
                                                                {branch.branch_name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Account Number"
                                                    value={formData.account_number}
                                                    onChange={(e) => handleInputChange('account_number', e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Currency</InputLabel>
                                                    <Select
                                                        value={formData.currency}
                                                        onChange={(e) => handleInputChange('currency', e.target.value)}
                                                        label="Currency"
                                                        sx={{ borderRadius: 2 }}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 300,
                                                                    borderRadius: 12
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        {currencyList.map(currency => (
                                                            <MenuItem value={currency} key={currency}>
                                                                <Chip
                                                                    label={currency}
                                                                    size="small"
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    sx={{ mr: 1 }}
                                                                />
                                                                {currency}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Logo Upload Section */}
                            <Grid item xs={12}>
                                <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                                    <Box sx={{
                                        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                        color: 'white',
                                        p: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}>
                                        <CloudUploadIcon sx={{ fontSize: 32 }} />
                                        <Box>
                                            <Typography variant="h5" fontWeight="600">
                                                Company Branding
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Upload your company logos and branding materials
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ p: 4 }}>
                                        <Grid container spacing={4}>
                                            <Grid item xs={12} md={6}>
                                                <DropzoneCard
                                                    onDrop={(file) => handleLogoDrop(file, 'logo')}
                                                    preview={logoPreview}
                                                    title="Company Logo"
                                                    icon={<UploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <DropzoneCard
                                                    onDrop={(file) => handleLogoDrop(file, 'small')}
                                                    preview={smallLogoPreview}
                                                    title="Small Logo (SVG preferred)"
                                                    icon={<UploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />}
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Additional Information Section */}
                            <Grid item xs={12}>
                                <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                                    <Box sx={{
                                        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                                        color: 'text.primary',
                                        p: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}>
                                        <BusinessIcon sx={{ fontSize: 32 }} />
                                        <Box>
                                            <Typography variant="h5" fontWeight="600">
                                                Additional Information
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                Optional company details and settings
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ p: 4 }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Employer EID"
                                                    placeholder="Optional"
                                                    value={formData.employer_eid}
                                                    onChange={(e) => handleInputChange('employer_eid', e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Industry Type"
                                                    placeholder="Optional"
                                                    value={formData.industry_type}
                                                    onChange={(e) => handleInputChange('industry_type', e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Company Profile"
                                                    placeholder="Optional"
                                                    value={formData.profile}
                                                    onChange={(e) => handleInputChange('profile', e.target.value)}
                                                    variant="outlined"
                                                    multiline
                                                    rows={3}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Legal Form"
                                                    placeholder="Optional"
                                                    value={formData.legal_form}
                                                    onChange={(e) => handleInputChange('legal_form', e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                />
                                                <FormControl fullWidth sx={{ mt: 3 }}>
                                                    <InputLabel>Calendar Type</InputLabel>
                                                    <Select
                                                        value={formData.calendar_type}
                                                        onChange={(e) => handleInputChange('calendar_type', e.target.value)}
                                                        label="Calendar Type"
                                                        sx={{ borderRadius: 2 }}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 300,
                                                                    borderRadius: 12
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <MenuItem value="Gregorian">Gregorian</MenuItem>
                                                        <MenuItem value="Hijri">Hijri</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Action Buttons */}
                            <Grid item xs={12}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        borderRadius: 3,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: 3
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
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
                                        type="button"
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
                            </Grid>
                        </Grid>
                    </form>


                </Box>
            </Fade>
        </Container>
    )
}

export default DetailsTab