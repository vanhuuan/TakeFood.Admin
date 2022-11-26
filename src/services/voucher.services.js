import axios from 'axios'

export const voucherServices = {
    getSystemVoucherPaging: async (pageNumber, pageSize, queryType, queryString, sortBy, sortType, startDay, endDay, token) => {
        console.log(`https://takefoodvoucherservice.azurewebsites.net/GetPagingSystemVoucher?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}&StartDate=${startDay}&EndDate=${endDay}`)
        return await axios.get(
            `https://takefoodvoucherservice.azurewebsites.net/GetPagingSystemVoucher?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}&StartDate=${startDay}&EndDate=${endDay}`, 
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    createVoucher: async (data, token) => {
        return await axios.post(
            `https://takefoodvoucherservice.azurewebsites.net/AddSystemVoucher`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getVoucherById: async (id, token) => {
        return await axios.get(
            `https://takefoodvoucherservice.azurewebsites.net/GetVoucherByID?ID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    updateVoucher: async (data, token) => {
        return await axios.put(
            `https://takefoodvoucherservice.azurewebsites.net/UpdateSystemVoucher`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    deleteVoucher: async (id, token) => {
        return await axios.delete(
            `https://takefoodvoucherservice.azurewebsites.net/DeleteSystemVoucher?id=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
}