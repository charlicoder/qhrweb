"use client"

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator"; // Not used in this example, but you can keep it if needed
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Progress } from "@/components/ui/progress"; // Not used directly
import { useRouter } from 'next/navigation';

// Import Lucide React Icons
import {
    Building,
    MapPin,
    Phone,
    Mail,
    Globe,
    Banknote,
    Upload,
    CloudUpload,
    X,
    Check,
    RefreshCcw,
    Loader2
} from "lucide-react";

// Import Sonner for toasts
import { toast } from "sonner";

// Mock data - replace with actual API calls
const countryList = [
    "United Arab Emirates", "Qatar", "Saudi Arabia", "Jordan", "Kuwait", "Bahrain", "Oman", "Egypt", "Lebanon", "Other"
];

const currencyList = ["AED", "USD", "EUR", "QAR", "SAR", "JOD", "KWD", "BHD", "OMR", "EGP", "LBP"];

// Mock translation function (if needed, consider a library like i18next)
const t = (key) => key;

// API base points to the Django server on port 8000 at the same host
// Use environment variables for Next.js
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:8000/administration/api`;

// Helper to get CSRF token from cookies (ensure you have a way to access cookies in Next.js)
function getCookie(name, req) {
    if (typeof document !== 'undefined') {
        // Client-side
        let cookieValue = null;
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
        return cookieValue;
    } else if (req && req.headers && req.headers.cookie) {
        // Server-side (e.g., in getServerSideProps)
        const cookies = req.headers.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
        return null;
    }
    return null;
}


export default function ModernDetailsTab({ initialData, initialBanks }) {
    const [banks, setBanks] = useState(initialBanks || []);
    const [branches, setBranches] = useState([]);
    const [logoPreview, setLogoPreview] = useState(null);
    const [smallLogoPreview, setSmallLogoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false); // Keep for UI feedback on button
    const router = useRouter();

    const [formData, setFormData] = useState({
        name_en: initialData?.name_en || "",
        name_ar: initialData?.name_ar || "",
        address_en: initialData?.address_en || "",
        address_ar: initialData?.address_ar || "",
        country: initialData?.country || "",
        phone1: initialData?.phone1 || "",
        phone2: initialData?.phone2 || "",
        fax: initialData?.fax || "",
        email: initialData?.email || "",
        website: initialData?.website || "",
        po_box: initialData?.po_box || "",
        zip_code: initialData?.zip_code || "",
        bank_id: initialData?.bank || '', // Map from initial data
        bank_branch_id: initialData?.bank_branch || '', // Map from initial data
        account_number: initialData?.account_number || "",
        currency: initialData?.currency || "AED",
        company_logo: initialData?.company_logo || null, // Will store URL or File
        small_company_logo: initialData?.small_company_logo || null, // Will store URL or File
        employer_eid: initialData?.employer_eid || "",
        industry_type: initialData?.industry_type || "",
        profile: initialData?.profile || "",
        legal_form: initialData?.legal_form || "",
        calendar_type: initialData?.calendar_type || "Gregorian"
    });

    const [touched, setTouched] = useState({}); // For tracking touched fields

    // Fetch branches on mount if bank_id is pre-filled
    useEffect(() => {
        if (formData.bank_id) {
            fetch(`${API_BASE}/bank-branches/?bankId=${formData.bank_id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch bank branches');
                    return res.json();
                })
                .then(data => setBranches(Array.isArray(data) ? data : []))
                .catch(err => console.error(err));
        }
        // Set initial logo previews if they exist from initial data
        if (initialData?.company_logo) setLogoPreview(initialData.company_logo);
        if (initialData?.small_company_logo) setSmallLogoPreview(initialData.small_company_logo);
    }, [formData.bank_id, initialData?.company_logo, initialData?.small_company_logo]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setTouched(prev => ({ ...prev, [field]: true }));

        // Auto-translate logic
        if (field === "name_en" && value) {
            setFormData(prev => ({ ...prev, name_ar: value + " (AR)" }));
        }
        if (field === "address_en" && value) {
            setFormData(prev => ({ ...prev, address_ar: value + " (AR)" }));
        }
    };

    const handleBankChange = (bankId) => {
        setBranches([]); // Clear existing branches
        setFormData(prev => ({ ...prev, bank_id: bankId, bank_branch_id: "" })); // Update bank_id and reset branch_id

        if (bankId) {
            fetch(`${API_BASE}/bank-branches/?bankId=${bankId}`)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch bank branches');
                    return res.json();
                })
                .then(data => setBranches(Array.isArray(data) ? data : []))
                .catch(err => console.error(err));
        }
    };

    const handleLogoDrop = (file, type) => {
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            if (type === 'logo') {
                setLogoPreview(previewUrl);
                setFormData(prev => ({ ...prev, company_logo: file })); // Store the File object
            } else {
                setSmallLogoPreview(previewUrl);
                setFormData(prev => ({ ...prev, small_company_logo: file })); // Store the File object
            }
        }
    };

    const handleFileRemove = (type) => {
        if (type === 'logo') {
            setLogoPreview(null);
            setFormData(prev => ({ ...prev, company_logo: null }));
        } else {
            setSmallLogoPreview(null);
            setFormData(prev => ({ ...prev, small_company_logo: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSaveSuccess(false); // Reset save success state

        try {
            let body;
            const headers = {
                'Accept': 'application/json',
            };

            // Normalize payload: map bank_id/bank_branch_id to serializer fields
            const toSend = {
                ...formData,
                bank: formData.bank_id || null,
                bank_branch: formData.bank_branch_id || null,
            };
            delete toSend.bank_id;
            delete toSend.bank_branch_id;

            // Remove read-only/system fields that the API should not accept
            delete toSend.id;
            delete toSend.created_at;
            delete toSend.updated_at;

            // If there are files, use FormData
            if (formData.company_logo instanceof File || formData.small_company_logo instanceof File) {
                body = new FormData();
                Object.entries(toSend).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        if ((key === 'company_logo' || key === 'small_company_logo') && value instanceof File) {
                            body.append(key, value);
                        } else if (key === 'company_logo' || key === 'small_company_logo') {
                            // Skip sending URL strings for existing logos in multipart
                            return;
                        } else if (typeof value !== 'object' || value instanceof File) {
                            body.append(key, value);
                        } else if (typeof value === 'object') {
                            body.append(key, JSON.stringify(value));
                        }
                    }
                });
                // Browser will set Content-Type for FormData
            } else {
                // Clean up non-file values that are URLs if they are not meant to be sent as strings
                const cleaned = { ...toSend };
                if (typeof cleaned.company_logo === 'string' && !formData.company_logo) { // Only delete if it's an old URL and not a new File
                    delete cleaned.company_logo;
                }
                if (typeof cleaned.small_company_logo === 'string' && !formData.small_company_logo) { // Only delete if it's an old URL and not a new File
                    delete cleaned.small_company_logo;
                }
                body = JSON.stringify(cleaned);
                headers['Content-Type'] = 'application/json';
            }

            // Always add CSRF token
            const csrfToken = getCookie('csrftoken', router.query.req); // Example: passing req if available
            if (csrfToken) {
                headers['X-CSRFToken'] = csrfToken;
            } else {
                console.warn("CSRF token not found. Ensure it's handled correctly in Next.js.");
            }

            const res = await fetch(`${API_BASE}/company-branch/1/`, {
                method: 'PATCH',
                credentials: 'include', // Ensure credentials are sent if needed
                headers: {
                    ...headers,
                    ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {})
                },
                body
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Failed to update company branch: ${errorData.detail || res.statusText}`);
            }

            setSaveSuccess(true); // Update UI to show success
            // Optionally, use Sonner for success notification
            toast.success("Company details saved successfully!", {
                description: "Your changes have been applied.",
            });

        } catch (err) {
            console.error("Submission Error:", err);
            // Use Sonner for error notification
            toast.error("Uh oh! Something went wrong.", {
                description: err.message || "Failed to save company details.",
            });
        } finally {
            setLoading(false);
            // Set saveSuccess to false after a delay for the button's visual feedback
            setTimeout(() => {
                setSaveSuccess(false);
            }, 3000);
        }
    };

    const handleReset = () => {
        // Reset to initial fetched data or to empty defaults
        setFormData({
            name_en: initialData?.name_en || "",
            name_ar: initialData?.name_ar || "",
            address_en: initialData?.address_en || "",
            address_ar: initialData?.address_ar || "",
            country: initialData?.country || "",
            phone1: initialData?.phone1 || "",
            phone2: initialData?.phone2 || "",
            fax: initialData?.fax || "",
            email: initialData?.email || "",
            website: initialData?.website || "",
            po_box: initialData?.po_box || "",
            zip_code: initialData?.zip_code || "",
            bank_id: initialData?.bank || '',
            bank_branch_id: initialData?.bank_branch || '',
            account_number: initialData?.account_number || "",
            currency: initialData?.currency || "AED",
            company_logo: initialData?.company_logo || null,
            small_company_logo: initialData?.small_company_logo || null,
            employer_eid: initialData?.employer_eid || "",
            industry_type: initialData?.industry_type || "",
            profile: initialData?.profile || "",
            legal_form: initialData?.legal_form || "",
            calendar_type: initialData?.calendar_type || "Gregorian"
        });
        setLogoPreview(initialData?.company_logo || null);
        setSmallLogoPreview(initialData?.small_company_logo || null);
        setTouched({});
    };

    const DropzoneCard = ({ onDrop, preview, title, icon, onRemove, fileExists }) => {
        const handleFileSelect = (e) => {
            const file = e.target.files[0];
            if (file) onDrop(file);
        };

        return (
            <Card className="border-2 border-dashed group transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="text-center py-6 relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        id={`upload-${title.replace(/\s/g, '-')}`} // Unique ID for input
                        className="hidden"
                    />
                    <label htmlFor={`upload-${title.replace(/\s/g, '-')}`} className="cursor-pointer block">
                        {preview ? (
                            <div className="flex flex-col items-center">
                                <Avatar className="w-20 h-20 mb-4 border-4 border-primary">
                                    <AvatarImage src={preview} alt={title} />
                                    <AvatarFallback>
                                        <Building className="w-10 h-10 text-primary" />
                                    </AvatarFallback>
                                </Avatar>
                                <p className="text-primary font-medium text-sm">Click to change {title.toLowerCase()}</p>
                                {onRemove && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the file input
                                            onRemove();
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div>
                                {icon}
                                <h3 className="mt-2 mb-1 font-semibold text-lg">{title}</h3>
                                <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                                <p className="mt-1 text-xs text-muted-foreground">Max 2MB • PNG, JPG, SVG</p>
                            </div>
                        )}
                    </label>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1
                    className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
                >
                    Company Details
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Configure your company information and banking details with our modern, intuitive interface
                </p>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 gap-6">

                    {/* Company Information Section */}
                    <Card className="rounded-lg overflow-hidden shadow-sm">
                        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 flex items-center gap-3">
                            <Building className="h-8 w-8" />
                            <div>
                                <CardTitle className="font-semibold text-xl">Company Information</CardTitle>
                                <CardDescription className="opacity-80">Basic company details and contact information</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <Label htmlFor="name_en">Company Name (English)</Label>
                                    <div className="flex items-center mt-1.5">
                                        <Building className="h-4 w-4 mr-2 text-primary" />
                                        <Input
                                            id="name_en"
                                            value={formData.name_en}
                                            onChange={(e) => handleInputChange('name_en', e.target.value)}
                                            className="rounded-md"
                                            placeholder="e.g. My Company Ltd."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="name_ar">Company Name (Arabic)</Label>
                                    <div className="flex items-center mt-1.5">
                                        <Building className="h-4 w-4 mr-2 text-primary" />
                                        <Input
                                            id="name_ar"
                                            value={formData.name_ar}
                                            onChange={(e) => handleInputChange('name_ar', e.target.value)}
                                            className="rounded-md"
                                            placeholder="اسم شركتك"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <Label htmlFor="address_en">Address (English)</Label>
                                    <div className="flex items-start mt-1.5">
                                        <MapPin className="h-4 w-4 mt-2 mr-2 text-primary" />
                                        <textarea
                                            id="address_en"
                                            value={formData.address_en}
                                            onChange={(e) => handleInputChange('address_en', e.target.value)}
                                            className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                                            placeholder="e.g. 123 Business Ave, Suite 456"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <Label htmlFor="address_ar">Address (Arabic)</Label>
                                    <div className="flex items-start mt-1.5">
                                        <MapPin className="h-4 w-4 mt-2 mr-2 text-primary" />
                                        <textarea
                                            id="address_ar"
                                            value={formData.address_ar}
                                            onChange={(e) => handleInputChange('address_ar', e.target.value)}
                                            className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                                            placeholder="عنوانك باللغة العربية"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Select value={formData.country} onValueChange={(val) => handleInputChange('country', val)}>
                                        <SelectTrigger className="w-full mt-1.5 rounded-md">
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countryList.map(country => (
                                                <SelectItem key={country} value={country}>{country}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information Section */}
                    <Card className="rounded-lg overflow-hidden shadow-sm">
                        <CardHeader className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 flex items-center gap-3">
                            <Phone className="h-8 w-8" />
                            <div>
                                <CardTitle className="font-semibold text-xl">Contact Information</CardTitle>
                                <CardDescription className="opacity-80">Phone numbers, email, and web presence</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <Label htmlFor="phone1">Primary Phone</Label>
                                    <div className="flex items-center mt-1.5">
                                        <Phone className="h-4 w-4 mr-2 text-primary" />
                                        <Input
                                            id="phone1"
                                            value={formData.phone1}
                                            onChange={(e) => handleInputChange('phone1', e.target.value)}
                                            className="rounded-md"
                                            placeholder="e.g. 0097141234567"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="phone2">Secondary Phone</Label>
                                    <div className="flex items-center mt-1.5">
                                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <Input
                                            id="phone2"
                                            value={formData.phone2}
                                            onChange={(e) => handleInputChange('phone2', e.target.value)}
                                            className="rounded-md"
                                            placeholder="Optional"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="flex items-center mt-1.5">
                                        <Mail className="h-4 w-4 mr-2 text-primary" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="rounded-md"
                                            placeholder="e.g. info@company.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="website">Website</Label>
                                    <div className="flex items-center mt-1.5">
                                        <Globe className="h-4 w-4 mr-2 text-primary" />
                                        <Input
                                            id="website"
                                            value={formData.website}
                                            onChange={(e) => handleInputChange('website', e.target.value)}
                                            className="rounded-md"
                                            placeholder="Optional"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="po_box">P.O. Box</Label>
                                    <Input
                                        id="po_box"
                                        value={formData.po_box}
                                        onChange={(e) => handleInputChange('po_box', e.target.value)}
                                        className="mt-1.5 rounded-md"
                                        placeholder="Optional"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="zip_code">Zip Code</Label>
                                    <Input
                                        id="zip_code"
                                        value={formData.zip_code}
                                        onChange={(e) => handleInputChange('zip_code', e.target.value)}
                                        className="mt-1.5 rounded-md"
                                        placeholder="Optional"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Banking Information Section */}
                    <Card className="rounded-lg overflow-hidden shadow-sm">
                        <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-6 flex items-center gap-3">
                            <Banknote className="h-8 w-8" />
                            <div>
                                <CardTitle className="font-semibold text-xl">Banking Information</CardTitle>
                                <CardDescription className="opacity-80">Bank account details and currency settings</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <Label htmlFor="bank_id">Bank Name</Label>
                                    <Select value={formData.bank_id} onValueChange={handleBankChange}>
                                        <SelectTrigger className="w-full mt-1.5 rounded-md">
                                            <SelectValue placeholder="Select a bank" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value=""><em>Select a bank</em></SelectItem>
                                            {banks.map(bank => (
                                                <SelectItem key={bank.id} value={String(bank.id)}>{bank.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="bank_branch_id">Bank Branch</Label>
                                    <Select
                                        value={formData.bank_branch_id}
                                        onValueChange={(val) => handleInputChange('bank_branch_id', val)}
                                        disabled={!formData.bank_id}
                                    >
                                        <SelectTrigger className="w-full mt-1.5 rounded-md">
                                            <SelectValue placeholder="Select a branch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {branches.map(branch => (
                                                <SelectItem key={branch.id} value={String(branch.id)}>{branch.branch_name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="account_number">Account Number</Label>
                                    <Input
                                        id="account_number"
                                        value={formData.account_number}
                                        onChange={(e) => handleInputChange('account_number', e.target.value)}
                                        className="mt-1.5 rounded-md"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select value={formData.currency} onValueChange={(val) => handleInputChange('currency', val)}>
                                        <SelectTrigger className="w-full mt-1.5 rounded-md">
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {currencyList.map(currency => (
                                                <SelectItem key={currency} value={currency}>
                                                    {currency}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Logo Upload Section */}
                    <Card className="rounded-lg overflow-hidden shadow-sm">
                        <CardHeader className="bg-gradient-to-r from-pink-400 to-yellow-500 text-white p-6 flex items-center gap-3">
                            <CloudUpload className="h-8 w-8" />
                            <div>
                                <CardTitle className="font-semibold text-xl">Company Branding</CardTitle>
                                <CardDescription className="opacity-80">Upload your company logos and branding materials</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DropzoneCard
                                    onDrop={(file) => handleLogoDrop(file, 'logo')}
                                    preview={logoPreview}
                                    title="Company Logo"
                                    icon={<Upload className="h-12 w-12 text-primary" />}
                                    onRemove={() => handleFileRemove('logo')}
                                    fileExists={!!formData.company_logo}
                                />
                                <DropzoneCard
                                    onDrop={(file) => handleLogoDrop(file, 'small')}
                                    preview={smallLogoPreview}
                                    title="Small Logo (SVG preferred)"
                                    icon={<Upload className="h-12 w-12 text-primary" />}
                                    onRemove={() => handleFileRemove('small')}
                                    fileExists={!!formData.small_company_logo}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Information Section */}
                    <Card className="rounded-lg overflow-hidden shadow-sm">
                        <CardHeader className="bg-gradient-to-r from-teal-300 to-pink-300 text-gray-800 p-6 flex items-center gap-3">
                            <Building className="h-8 w-8" />
                            <div>
                                <CardTitle className="font-semibold text-xl">Additional Information</CardTitle>
                                <CardDescription className="opacity-80">Optional company details and settings</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <Label htmlFor="employer_eid">Employer EID</Label>
                                    <Input
                                        id="employer_eid"
                                        value={formData.employer_eid}
                                        onChange={(e) => handleInputChange('employer_eid', e.target.value)}
                                        className="mt-1.5 rounded-md"
                                        placeholder="Optional"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="industry_type">Industry Type</Label>
                                    <Input
                                        id="industry_type"
                                        value={formData.industry_type}
                                        onChange={(e) => handleInputChange('industry_type', e.target.value)}
                                        className="mt-1.5 rounded-md"
                                        placeholder="Optional"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Label htmlFor="profile">Company Profile</Label>
                                    <textarea
                                        id="profile"
                                        value={formData.profile}
                                        onChange={(e) => handleInputChange('profile', e.target.value)}
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md mt-1.5"
                                        placeholder="Optional"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="legal_form">Legal Form</Label>
                                    <Input
                                        id="legal_form"
                                        value={formData.legal_form}
                                        onChange={(e) => handleInputChange('legal_form', e.target.value)}
                                        className="mt-1.5 rounded-md"
                                        placeholder="Optional"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="calendar_type">Calendar Type</Label>
                                    <Select value={formData.calendar_type} onValueChange={(val) => handleInputChange('calendar_type', val)}>
                                        <SelectTrigger className="w-full mt-1.5 rounded-md">
                                            <SelectValue placeholder="Select calendar type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Gregorian">Gregorian</SelectItem>
                                            <SelectItem value="Hijri">Hijri</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="p-6 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-700 flex justify-center gap-4">
                        <Button
                            type="submit"
                            size="lg"
                            className="min-w-[180px] py-2.5 px-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                            style={{
                                background: saveSuccess
                                    ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
                                    : 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                            }}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : saveSuccess ? (
                                <Check className="mr-2 h-4 w-4" />
                            ) : null}
                            {loading ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={handleReset}
                            className="min-w-[180px] py-2.5 px-6 rounded-lg border-white text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                        >
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Reset Form
                        </Button>
                    </div>
                </div>
            </form>

            {/* The Toaster component in _app.js handles the display of notifications */}
        </div>
    );
}

// getServerSideProps to fetch initial data
export async function getServerSideProps(context) {
    const { req } = context;
    const csrfToken = getCookie('csrftoken', req); // Get CSRF token server-side

    const API_BASE_SERVER = process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:8000/administration/api`;

    try {
        // Fetch company branch details
        const branchRes = await fetch(`${API_BASE_SERVER}/company-branch/1/`, {
            headers: {
                'Accept': 'application/json',
                ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}), // Include CSRF token if available
                // Add any other required headers like Authorization
            },
        });
        if (!branchRes.ok) throw new Error('Failed to fetch company branch data');
        const companyData = await branchRes.json();

        // Fetch banks list
        const banksRes = await fetch(`${API_BASE_SERVER}/banks/`, {
            headers: {
                'Accept': 'application/json',
                ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}),
            },
        });
        if (!banksRes.ok) throw new Error('Failed to fetch banks');
        const banksData = await banksRes.json();

        return {
            props: {
                initialData: companyData,
                initialBanks: Array.isArray(banksData) ? banksData : [],
            },
        };
    } catch (error) {
        console.error("Error fetching data in getServerSideProps:", error);
        // Return empty props or an error state to the page
        return {
            props: {
                initialData: null,
                initialBanks: [],
                error: error.message,
            },
        };
    }
}
