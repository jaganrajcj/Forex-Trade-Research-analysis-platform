import axios from "axios"
import useAuth from '@/hooks/useAuth'
import jwt_decode from "jwt-decode";



const Login = async (email, password, rememberMe, navigate, setError, handleLoginError, setUserData, userData) => {

    console.log(email, password)
    try {
        const res = await axios.post(import.meta.env.VITE_API_URL + '/users/login', {
            email,
            password
        })
        setUserData({
            id: res.data.id,
            token: res.data.token,
            type: res.data.type
        })
        console.log(res)
        localStorage.setItem("auth-token", res.data.token);

        if (res.data.id) {
            // console.log(res.data)
            const decoded = jwt_decode(res.data.token);
            console.log("🚀 ~ file: authService.js:27 ~ Login ~ decoded.user.type:", decoded.user.type)
            switch (decoded.user.type) {
                case 2000:
                    navigate('/dashboard/')
                    break
                case 2300:
                    navigate('/moderator/')
                    break
                case 2400:
                    navigate('/admin/')
                    break
                default:
                    console.log("Invalid type from decoded JWT!")
            }
        }
    }
    catch (err) {
        handleLoginError(err)
    }
}

const Logout = (navigate, setUserData) => {
    navigate("/")
    console.log('Logging out...')
    setTimeout(() => {
        setUserData({
            id: undefined,
            token: undefined,
            type: undefined,
        })
    }, 300)
    localStorage.setItem("auth-token", "");
}

const updatePassword = async (userData, current, newPass) => {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_API_URL + '/users/change-password',
            {
                currentPassword: current,
                newPassword: newPass
            },
            { headers: { "x-auth-token": userData.token } }
        ).then((result) => {
            if (result.data.status) resolve(result.data)
            else reject({ status: false, message: 'Invalid current password' })
        }).catch((err) => {
            reject({ status: false, message: err.message })
        })

    })
}

const Register = async (name, email, password, handleRegistrationError, successCallback) => {
    console.log("From authService.Register", name, email, password)
    try {
        const res = await axios.post(import.meta.env.VITE_API_URL + '/users/register', {
            name,
            email,
            password
        })
        console.log(res)
        if (res.data.status) successCallback()
    }
    catch (err) {
        handleRegistrationError(err)
    }
}

const SignIn = async (email, password) => {
    try {
        const res = await axios.post(import.meta.env.VITE_API_URL + '/users/login', {
            email,
            password
        })
        return res
    }
    catch (err) {
        return err.response
    }
}

const SignUp = async (data) => {
    try {
        const res = await axios.post(import.meta.env.VITE_API_URL + '/users/register', data)

        return res
    }
    catch (err) {
        return err.response

    }
}

const requestPasswordReset = async (email) => {
    try {
        const res = await axios.post(import.meta.env.VITE_API_URL + '/users/forgot-password', { email })
        return res
    }
    catch (err) {
        return err.response
    }
}

const resetPassword = async ({ password, confirmPass }, token) => {
    try {
        // const res = await axios.post(import.meta.env.VITE_API_URL + '/users/reset-password',
        //     { password, confirmPassword: confirmPass }
        // )
        console.log("Token: ", token)
        const res = await axios.post(import.meta.env.VITE_API_URL + `/users/forgot-password/reset/${token}`,
            { password, confirmPassword: confirmPass })

        return res
    }
    catch (err) {
        return err.response
    }
}

export const authService = {
    Login,
    Logout,
    Register,
    updatePassword,
    SignIn,
    SignUp,
    requestPasswordReset,
    resetPassword
}

