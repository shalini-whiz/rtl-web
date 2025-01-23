
let orderInfo = [
    {
        key: "oId", displayName: "Order ID", order: 1, type: "string",
        error: "", value: "", helperText: "",
    },
    {
        key: "orderedDate", displayName: "Order Date", order: 1, type: "date",
        error: "", value: "", helperText: "",formatDate:true
    },
    {
        key: "orderState", displayName: "Order State", order: 1, type: "string",
        error: "", value: "", helperText: "",
    },
    {
        key: "userId", displayName: "User Name", order: 1, type: "string",
        error: "", value: "", helperText: "",
    },
    // {
    //     key: "vendorId", displayName: "Vendor Name", order: 2, type: "string",
    //     error: "", value: "", helperText: "",
    // },
    {
        key: "totalPrice", displayName: "Order Amount", order: 3, type: "number",
        error: "", value: "", helperText: "",
    },
    {
        key: "totalPrice", displayName: "Order Amount", order: 3, type: "number",
        error: "", value: "", helperText: "",
    },
    {
        key: "paymentMode", displayName: "Payment Mode", order: 4, type: "string",
        error: "", value: "", helperText: "",  titleCase: true,
    },
    {
        key: "paymentStatus", displayName: "Payment Status", order: 4, type: "string",
        error: "", value: "", helperText: "",  titleCase: true,
    }
];


export { orderInfo };
