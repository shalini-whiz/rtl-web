//componentA
const { user_columns } = require("../tableSchema/users");
let userMenu = [
    {
        title: "Active Users", key: "activeUsers", value: 0,
        // component: componentA,
        data: { status: "active", "key": "activeUsers" }, columns: user_columns,
        toolBarTitle: "Users"
    },
    {
        title: "Disable Users", key: "disableUsers", value: 2,
        // component: componentA,
        data: { status: "active", key: "disableUsers" }, columns: user_columns,
        toolBarTitle: "Users"

    },
];
export { userMenu };
