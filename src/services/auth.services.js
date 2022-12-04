import api from "./api"; 

export const authService = {
    login: async (data) => {
        return await api.post('https://takefoodapigatewayadmin.azurewebsites.net/SignIn', data)
    },
    register: async (data) => {
        return await api.post('https://takefoodapigatewayadmin.azurewebsites.net/SignUp', data)
    }
}


