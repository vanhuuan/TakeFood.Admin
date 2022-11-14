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
}