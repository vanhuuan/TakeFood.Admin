import api from './api'
const baseUrl = "https://takefood-apigateway-admin.azurewebsites.net";
export const userServices = {
    getUserPaging: async (pageNumber, pageSize, queryType, queryString, sortBy, sortType) => {
        return await api.get(
            `${baseUrl}/GetPagingUser?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}`
        )
    },
    getUserOrderPaging: async (pageNumber, pageSize, from, to, StateType, startDay, endDay, sortBy, sortType, uid) => {
        return await api.get(
            `${baseUrl}/GetOrderPaging?UserId=${uid}&PageNumber=${pageNumber}&PageSize=${pageSize}&From=${from}&To=${to}&StateType=${StateType}&SortBy=${sortBy}&SortType=${sortType}&CreatedFrom=${startDay}&CreatedTo=${endDay}`
        )
    },
    changeUserState: async (uid) => {
        return await api.put(
            `${baseUrl}/ChangeUserStatus?id=${uid}`, null
        )
    },
    deleteUsser: async (uid) => {
        return await api.delete(
            `${baseUrl}/DeleteUser?id=${uid}`
        )
    },
    getNewUsser: async () => {
        return await api.get(
            `${baseUrl}/GetNewsUser`
        )
    },
    getRevenue: async (year) => {
        return await api.get(
            `${baseUrl}/api/Revenue/RevenueOfSystemYear?year=${year}`
        )
    },
}