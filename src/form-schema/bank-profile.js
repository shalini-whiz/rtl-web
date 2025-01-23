
let bankprofile = [
    {
        key: "accountName", displayName: "Account Name", order: 1, type: "string",
        error: "", value: "", helperText: "", required: true,
    },
    {
        key: "bankName", displayName: "Bank Name", order: 2, type: "string",
        error: "", value: "", helperText: "", required: true,
    },
    {
        key: "accountNo", displayName: "Account No", order: 3, type: "string",
        error: "", value: "", helperText: "", required: true,
        regExp: /^[0-9]{5,20}$/, regExMessage: "Invalid account"

    },
    {
        key: "ifscCode", displayName: "IFSC", order: 4, type: "string",
        error: "", value: "", helperText: "", required: true, titleCase: true, rowsMax: 4
    }
];

export { bankprofile };
