const { util } = require("../../commons");
const { titleCell } = require("../../styles/tableStyle")

export let user_columns = [
    {
        title: "Name", field: "name", editable: "never",
        render: rowData => util.titleCase(rowData.name),
        cellStyle: (e, rowData) => { return titleCell; }
    },
    {
        title: "Email", field: "email", editable: "never",
        render: rowData => util.titleCase(rowData.email)
    },

];
