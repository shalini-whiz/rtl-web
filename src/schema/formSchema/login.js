export let login = [
    {
        key: "mobile", displayName: "Mobile", order: 1, type: "number",
        error: "", value: "", helperText: "", required: true, showCorrectIcon: false,
        regExp: /^\d{10}$/, regExMessage:"Invalid mobile no"

    },
    {
        key: "otp", displayName: "OTP", order: 2, type: "string",
        error: "", value: "", helperText: "", required: true,
        regExp: /^\d{4}$/, regExMessage: "OTP: 4 digits allowed"
    },

];
