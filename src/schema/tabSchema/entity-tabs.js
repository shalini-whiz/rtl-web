
import AuthService from "../../service/AuthService"
const { userMenu } = require("./user-tabs")

console.log(AuthService.getUserRole())
let entityTabs = {
    "users": userMenu,
    "dashboard": []
}

export { entityTabs };
