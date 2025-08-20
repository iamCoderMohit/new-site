import axios from "axios"
import { useState } from "react"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export function useCourse(){
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState([])

    const getCourses = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BACKEND_URL}/course/all`)

            setCourses(res.data.courses)
        } catch (error) {
            console.error(error)
        } finally{
            setLoading(false)
        }
    }

    const getCourse = async (id: number) => {
        setLoading(true)
        try {
            const res = await axios.get(`${BACKEND_URL}/course/${id}`)

            setCourse(res.data.course)
        } catch (error) {
            console.error(error)
        } finally{
            setLoading(false)
        }
    }

    const createCourse = async (title: string, description: string, price: number, thumbnail: string) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/course`, {title, description, price, thumbnail}, {
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            })

            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    return {getCourses, courses, loading, getCourse, course, createCourse}
}