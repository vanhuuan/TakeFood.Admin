import api from "./api"; 

export const authService = {
    login: async (data) => {
        return await api.post('https://takefood-apigateway-admin.azurewebsites.net/SignIn', data)
    },
    register: async (data) => {
        return await api.post('https://takefood-apigateway-admin.azurewebsites.net/SignUp', data)
    }
}


