import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUserInfo } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export function useAuth(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signup = async (name: string, email: string, password: string) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/user/signup`, {name, email, password})

            localStorage.setItem('jwt', res.data.token)

            const user = await axios.get(`${BACKEND_URL}/user/me`, {
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            })

            dispatch(setIsLoggedIn(true))
            dispatch(setUserInfo(user.data.user))
            navigate('/explore')
        } catch (error) {
            console.error(error)
        }
    }

    const signin = async (email: string, password: string) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/user/signin`, {email, password})

            localStorage.setItem('jwt', res.data.token)

            const user = await axios.get(`${BACKEND_URL}/user/me`, {
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            })

            dispatch(setIsLoggedIn(true))
            dispatch(setUserInfo(user.data.user))
            navigate('/explore')
        } catch (error) {
            console.error(error)
        }
    }

    return {signup, signin}
}
