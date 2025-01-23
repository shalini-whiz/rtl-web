let vendorSignUp = [
    {
        key: "mobile", displayName: "Mobile", order: 1, type: "string",
        error: "", value: "",helperText:"",required: true, showCorrectIcon: false
    },
    {
        key: "otp", displayName: "OTP", order: 2, type: "string",
        error: "", value: "", helperText: "",required: true
    },
    {
        key: "name", displayName: "Name", order: 3, type: "string",
        error: "", value: "", helperText: "",required: true, titleCase: true
    },
    {
        key: "businessName", displayName: "Business Name", order: 4, type: "string",
        error: "", value: "", helperText: "", required: true, titleCase: true
    },
    {
        key: "accountName", displayName: "Account Name", order: 5, type: "string",
        error: "", value: "", helperText: "",required: true, titleCase: true
    },
    {
        key: "bankName", displayName: "Bank Name", order: 6,
        type: "string", error: "", value: "", helperText: "",required: true, titleCase: true
    },
    {
        key: "ifscCode", displayName: "IFSC Code", order: 7,
        type: "string", error: "", value: "", helperText: "",required: true, titleCase: true
    },
    {
        key: "accountNo", displayName: "Account No", order: 8,
        type: "string", error: "", value: "", helperText: "",required: true, titleCase: true,
        regExp: /^[0-9]{5,20}$/, regExMessage: "Invalid account"

    }
];

export { vendorSignUp };
