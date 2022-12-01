import axios from 'axios'

export const adminServices = {
    getAdminPaging: async (pageNumber, pageSize, queryType, queryString, sortBy, sortType, token) => {
        return await axios.get(
            `https://takefoodapigatewayadmin.azurewebsites.net/GetPagingAdmin?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    makeAdmin: async (adminEmail, token) => {
        return await axios.put(
            `https://takefoodapigatewayadmin.azurewebsites.net/MakeAdmin?userEmail=${adminEmail}`, null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    removeAdmin: async (adminId, token) => {
        return await axios.delete(
            `https://takefoodapigatewayadmin.azurewebsites.net/RemoveAdmin?userId=${adminId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
}