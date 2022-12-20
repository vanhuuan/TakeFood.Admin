import api from "./api"; 

export const orderService = {
    getOrderDetail: async (id, token) => {
        return await api.get(
            `https://takefood-apigateway-admin.azurewebsites.net/GetOrderAdminDetail?orderId=${id}`
        )
    },
    notifySuccess: async (id) => {
        return await api.get(
            `https://takefood-apigateway-mobile.azurewebsites.net/NotifyPay?orderId=${id}`
        )
    },
    notifyFailed: async (id) => {
        return await api.get(
            `https://takefood-apigateway-mobile.azurewebsites.net/NotifyCancel?orderId=${id}`
        )
    },
}