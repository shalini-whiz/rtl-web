

export let profile = [
    {
        key: "name", displayName: "Name", order: 1, type: "string",
        error: "", value: "", helperText: "", required: true,
    },
    {
        key: "businessName", displayName: "Business Name", order: 2, type: "string",
        error: "", value: "", helperText: "", required: true,
    },
    {
        key: "mobileNo", displayName: "Mobile", order: 3, type: "number",
        error: "", value: "", helperText: "", required: true,
    },
    {
        key: "businessDescription", displayName: "Description", order: 4, type: "string",
        error: "", value: "", helperText: "", required: true, titleCase: false, rowsMax: 4,
        multiline: true,
    },
    {
        key: "fssaiNo", displayName: "Fssai No", order: 3, type: "number", error: "", value: "", helperText: "",
        required: false, regExp: /^[0-9]{14}$/,
        regExMessage: "Invalid Fssai No"
    },
    {
        key: "address", displayName: "Address", order: 5, type: "string",
        error: "", value: "", helperText: "", required: true, titleCase: true, rowsMax: 4,
        multiline: true,
    },
    {
        key: "orderEnabled", displayName: "Enable Orders", order: 6, type: "select",
        select: true,
        error: "", value: "", helperText: "", required: false, options: [
            { value: true, key: "Yes" },
            { value: false, key: "No" }
        ],
    },
    {
        key: "latitude", displayName: "Latitude", order: 7,
        type: "number", error: "", value: "", helperText: "", required: false, titleCase: true,
        decimal: true
    },
    {
        key: "longitude", displayName: "Longitude", order: 8,
        type: "number", error: "", value: "", helperText: "", required: false, titleCase: true,
        decimal: true

    }
];


export let vendorProfile = [
    { key: "name", displayName: "Name", order: 1, type: "string", error: "", value: "", helperText: "", required: true },
    { key: "businessName", displayName: "Business Name", order: 2, type: "string", error: "", value: "", helperText: "", required: true },
    { key: "mobileNo", displayName: "Mobile", order: 3, type: "number", error: "", value: "", helperText: "", required: false },
    { key: "businessDescription", displayName: "Description", order: 4, type: "string", error: "", value: "", helperText: "", required: false, titleCase: true, rowsMax: 4, multiline: true },
    { key: "address", displayName: "Address", order: 5, type: "string", error: "", value: "", helperText: "", required: true, titleCase: true, rowsMax: 4, multiline: true },
    { key: "accountName", displayName: "Account Name", order: 6, type: "string", error: "", value: "", helperText: "", required: true },
    { key: "bankName", displayName: "Bank Name", order: 7, type: "string", error: "", value: "", helperText: "", required: true },
    {
        key: "accountNo", displayName: "Account No", order: 8, type: "string",
        error: "", value: "", helperText: "", required: true, regExp: /^[0-9]{5,20}$/,
        regExMessage: "Invalid account"
    },
    { key: "ifscCode", displayName: "IFSC", order: 9, type: "string", error: "", value: "", helperText: "", required: true, titleCase: true, rowsMax: 4 },
    { key: "orderEnabled", displayName: "Enable Orders", order: 10, type: "select", select: true, error: "", value: "", helperText: "", required: false, options: [{ value: true, key: "Yes" }, { value: false, key: "No" }] },
    { key: "latitude", displayName: "Latitude", order: 11, type: "number", error: "", value: "", helperText: "", required: false, decimal: true },
    { key: "longitude", displayName: "Longitude", order: 12, type: "number", error: "", value: "", helperText: "", required: false, decimal: true }
];
