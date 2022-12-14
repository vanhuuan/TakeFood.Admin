import api from './api'
const baseUrl = "https://takefood-apigateway-admin.azurewebsites.net";
export const voucherServices = {
    getSystemVoucherPaging: async (pageNumber, pageSize, queryType, queryString, sortBy, sortType, startDay, endDay) => {
        return await api.get(
            `${baseUrl}/GetPagingSystemVoucher?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}&StartDate=${startDay}&EndDate=${endDay}`
        )
    },
    createVoucher: async (data, token) => {
        return await api.post(
            `${baseUrl}/ddSystemVoucher`, data
        )
    },
    getVoucherById: async (id) => {
        return await api.get(
            `${baseUrl}/GetVoucherByID?ID=${id}`
        )
    },
    updateVoucher: async (data) => {
        return await api.put(
            `${baseUrl}/UpdateSystemVoucher`, data
        )
    },
    deleteVoucher: async (id) => {
        return await api.delete(
            `${baseUrl}/DeleteSystemVoucher?id=${id}`
        )
    },
}