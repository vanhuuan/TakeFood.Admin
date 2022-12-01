import axios from 'axios'

export const orderService = {
    getOrderDetail: async (id, token) => {
        return await axios.get(
            `https://takefoodapigatewayadmin.azurewebsites.net/GetOrderAdminDetail?orderId=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
}