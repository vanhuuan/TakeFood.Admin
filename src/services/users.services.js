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
}