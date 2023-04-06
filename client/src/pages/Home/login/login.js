import axios from "axios"

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
        // console.log(res)
        localStorage.setItem("auth-token", res.data.token);
        console.log("🚀 ~ file: login.js:4 ~ Login ~ userData", userData)

        if (res.data.id) {
            console.log("this should work")
            // navigate('/dashboard/')
            switch (res.data.type) {
                case 1:
                    navigate('/dashboard/')
                    break
                case 2:
                    navigate('/moderator/')
                    break
                case 3:
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

export default Login
