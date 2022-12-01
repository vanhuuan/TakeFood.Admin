import axios from 'axios'


export const authService = {
    login: async (data) => {
        return await axios.post('https://takefoodapigatewayadmin.azurewebsites.net/SignIn', data)
    },
    register: async (data) => {
        return await axios.post('https://takefoodapigatewayadmin.azurewebsites.net/SignUp', data)
    }
}


