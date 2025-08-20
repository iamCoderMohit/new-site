import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useCourse } from "../hooks/useCourse"
import { useEffect } from "react"
import CheckoutCourseCard from "../components/CheckoutCourseCard"
import axios from "axios"
import Loader from "../components/Loader"

function CheckOut() {
    const {getCourse, course, loading} = useCourse()
    const {courseId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchCourse() {
            await getCourse(Number(courseId))
        }

        fetchCourse()
    }, [])

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    async function handleEnroll(){
      try {
        await axios.post(`${BACKEND_URL}/enroll/${courseId}`, {}, {
          headers: {
            Authorization: localStorage.getItem('jwt')
          }
        })
        navigate('/explore')
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div>
        <Navbar />

    {loading ? <div className="absolute top-1/2 right-1/2">
      <Loader />
    </div> : 
    <div className="flex justify-center flex-col w-full h-[80vh] items-center">
        {//@ts-ignore
        <CheckoutCourseCard title={course.title} description={course.description} thumbnail={course.thumbnail} price={course.price}  />}

        <div>
          <button className="text-white bg-blue-700 w-full text-xl font-semibold px-10 rounded-md mt-10 cursor-pointer"
          onClick={handleEnroll}
          >Confirm Enrollment</button>
        </div>
    </div>
    }
    </div>
  )
}

export default CheckOut