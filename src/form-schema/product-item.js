
let productItem = [

    {
        key: "prodLineId", displayName: "Product Item", order: 1, type: "select",select:true,
        error: "", value: "", helperText: "", required: true, config: { "key": "name", "value": "_id" },
        placeholder: "select product line", options:[]
    },
    {
        key: "prodMasterId", displayName: "Product Master", order: 2, type: "select",select:true,
        error: "", value: "", helperText: "", required: true, config: { "key": "name", "value": "_id" },
        placeholder: "select product master", options: []

    },
    {
        key: "name", displayName: "Name", order: 3, type: "string",
        error: "", value: "", helperText: "", required: true
    },
    {
        key: "brand", displayName: "Brand", order: 4, type: "string",
        error: "", value: "", helperText: "", required: false
    },
    {
        key: "packages", displayName: "Packages", order: 5, type: "string",
        error: "", value: "", helperText: "", required: true
    },
    {
        key: "quantity", displayName: "Quantity", order: 6, type: "number",
        error: "", value: "", helperText: "", required: true,inputProps:{min: 1 }
    },
    {
        key: "price", displayName: "Price", order: 7, type: "number",
        error: "", value: "", helperText: "", required: true
    },
    {
        key: "description", displayName: "Description", order: 8, type: "string",
        error: "", value: "", helperText: "", required: true, multiline: true, rowsMax: 4
    },
    {
        key: "startDate", displayName: "Start Date", order: 9, type: "datetime-local",
        error: "",  helperText: "", required: true, value:""

    },
    {
        key: "endDate", displayName: "End Date", order: 10, type: "datetime-local",
        error: "", value: "", helperText: "", required: true
    },

];

export { productItem };
