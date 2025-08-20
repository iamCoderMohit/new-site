import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useCourse } from "../hooks/useCourse"
import { useEffect } from "react"
import CheckoutCourseCard from "../components/CheckoutCourseCard"

function CheckOut() {
    const {getCourse, course} = useCourse()
    const {courseId} = useParams()

    useEffect(() => {
        async function fetchCourse() {
            await getCourse(Number(courseId))
        }

        fetchCourse()
    }, [])

  return (
    <div>
        <Navbar />

        {//@ts-ignore
        <CheckoutCourseCard title={course.title} description={course.description} thumbnail={course.thumbnail} price={course.price}  />}
    </div>
  )
}

export default CheckOut