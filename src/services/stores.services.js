import api from "./api"; 

const baseUrl = "https://takefood-apigateway-admin.azurewebsites.net";
export const storeServices = {
    createStore: async (data, id) => {
        return await api.post(
            `${baseUrl}/CreateStore?OwnerID=${id}`,
            data
        )
    },

    getStore: async (id) => {
        return await api.get(
            `${baseUrl}/GetStoreByOwner?ownerID=${id}`
        )
    },
    getCategories: async () => {
        return await api.get(
            `${baseUrl}/api/Category/GetStoreCategory`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            })
    },
    getFood: async (id) => {
        return await api.get(
            `${baseUrl}/api/Food/GetAllFoodByStore?StoreID=${id}`
        )
    },
    getTopping: async (id) => {
        return await api.get(
            `${baseUrl}/GetAllTopping/${id}`
        )
    },
    getStorePaging: async (pageNumber, pageSize, queryType, queryString, sortBy, sortType) => {
        return await api.get(
            `${baseUrl}/GetPagingStore?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}`
        )
    },
    getStoreDetail: async (storeId, token) => {
        return await api.get(
            `${baseUrl}/GetRegisterDetailStore?storeId=${storeId}`
        )
    },
    activeStore: async (storeId) => {
        return await api.put(
            `${baseUrl}/ActiveStore?storeId=${storeId}`, null
        )
    },
    deactiveStore: async (storeId) => {
        return await api.put(
            `${baseUrl}/DeActiveStore?storeId=${storeId}`, null
        )
    },
    getStoreStatic: async (storeId, year, payment) => {
        return await api.get(
            `https://takefood-orderservice.azurewebsites.net/api/Revenue/RevenueOfYear?storeID=${storeId}&year=${year}&paymentMethod=${payment}`
        )
    },
}