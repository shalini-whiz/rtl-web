import Orders from "../components/orders/Orders"
const { pending_orders,accepted_orders,rejected_orders, delivered_orders,cancelled_orders,ready_orders} = require("../schema/tableSchema/orders")
let orderMenu = [
    {
        title: "Pending", key: "pendingOrders", value: 0, component: Orders,
        data: { orderState: "new" },columns:pending_orders
    },
    {
        title: "Accepted", key: "acceptedOrders", value: 1, component: Orders,
        data: { orderState: "accepted" }, columns: accepted_orders
    },
    {
        title: "Rejected", key: "rejectedOrders", value: 2, component: Orders,
        data: { orderState: "rejected" }, columns: rejected_orders
    },
    {
        title: "Ready", key: "readyOrders", value: 3, component: Orders,
        data: { orderState: "ready" }, columns: ready_orders
    },
    {
        title: "Delivered", key: "deliveredOrders", value: 4, component: Orders,
        data: { orderState: "delivered" }, columns: delivered_orders
    },
    {
        title: "Cancelled", key: "cancelledOrders", value: 5, component: Orders,
        data: { orderState: "cancelled" },columns:cancelled_orders
    }
];

export { orderMenu}