import axios from 'axios'

export const userServices = {
    getUserPaging: async (pageNumber, pageSize, queryType, queryString, sortBy, sortType, token) => {
        return await axios.get(
            `https://takefoodauthentication.azurewebsites.net/GetPagingUser?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}`, 
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getUserOrderPaging: async (pageNumber, pageSize, from, to,  StateType, startDay, endDay, sortBy, sortType, uid, token) => {
        return await axios.get(
            `https://takefooduserorder.azurewebsites.net/GetOrderPaging?UserId=${uid}&PageNumber=${pageNumber}&PageSize=${pageSize}&From=${from}&To=${to}&StateType=${StateType}&SortBy=${sortBy}&SortType=${sortType}&CreatedFrom=${startDay}&CreatedTo=${endDay}`, 
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    changeUserState: async (uid, token) => {
        console.log(token)
        return await axios.put(
        `https://takefoodauthentication.azurewebsites.net/ChangeUserStatus?id=${uid}`, null , 
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    deleteUsser: async (uid, token) => {
        return await axios.delete(
            `https://takefoodauthentication.azurewebsites.net/DeleteUser?id=${uid}`, 
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getNewUsser: async (token) => {
        return await axios.get(
            `https://takefoodauthentication.azurewebsites.net/GetNewsUser`, 
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
}