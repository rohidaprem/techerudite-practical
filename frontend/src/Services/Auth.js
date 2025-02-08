import axios from "axios"

export const SignUpAuthApi = async ({ details }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/sign-up`, details);
        return data;
    } catch (error) {
        return error.response.data;
    }
}
export const SignInAuthApi = async ({ details }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/sign-in`, details);
        return data;
    } catch (error) {
        return error.response.data;
    }
}
export const VerifyAuthApi = async ({ token }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify/${token}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
} 