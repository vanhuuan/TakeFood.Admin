import axios from 'axios'

export const storeServices = {
    createStore: async (data, id, token) => {
        return await axios.post(
            `https://takefoodapigatewayadmin.azurewebsites.net/CreateStore?OwnerID=${id}`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },

    getStore: async (id, token) => {
        return await axios.get(
            `https://takefoodapigatewayadmin.azurewebsites.net/GetStoreByOwner?ownerID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getCategories: async () => {
        return await axios.get(
            'https://takefoodapigatewayadmin.azurewebsites.net/api/Category/GetStoreCategory',
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            })
    },
    getFood: async (id, token) => {
        return await axios.get(
            `https://takefoodapigatewayadmin.azurewebsites.net/api/Food/GetAllFoodByStore?StoreID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getTopping: async (id, token) => {
        return await axios.get(
            `https://takefoodapigatewayadmin.azurewebsites.net/GetAllTopping/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getStorePaging: async (pageNumber, pageSize, queryType, queryString, sortBy, sortType, token) => {
        return await axios.get(
            `https://takefoodapigatewayadmin.azurewebsites.net/GetPagingStore?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getStoreDetail: async (storeId, token) => {
        return await axios.get(
            `https://takefoodapigatewayadmin.azurewebsites.net/GetRegisterDetailStore?storeId=${storeId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    activeStore: async (storeId, token) => {
        return await axios.put(
            `https://takefoodapigatewayadmin.azurewebsites.net/ActiveStore?storeId=${storeId}`, null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    deactiveStore: async (storeId, token) => {
        return await axios.put(
            `https://takefoodapigatewayadmin.azurewebsites.net/DeActiveStore?storeId=${storeId}`, null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
}