import api from "./api"; 

export const orderService = {
    getOrderDetail: async (id, token) => {
        return await api.get(
            `https://takefoodapigatewayadmin.azurewebsites.net/GetOrderAdminDetail?orderId=${id}`
        )
    },
}