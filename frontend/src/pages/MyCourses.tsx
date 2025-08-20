import { useEffect } from "react"
import Navbar from "../components/Navbar"
import { useEnroll } from "../hooks/useEnroll"
import CheckoutCourseCard from "../components/CheckoutCourseCard"
import Loader from "../components/Loader"

function MyCourses() {
    const {myEnrollments, enrollments, loading} = useEnroll()

    useEffect(() => {
        async function fetchCourse(){
            await myEnrollments()
        }

        fetchCourse()
    }, [])

    console.log(enrollments)
  return (
    <div>
        <Navbar />

        {loading ? <div className="absolute top-1/2 right-1/2">
            <Loader />
        </div> : <div className="flex justify-around flex-wrap">
            {enrollments.map((course) => (
        //@ts-ignore
        <CheckoutCourseCard title={course.course.title} description={course.course.description} price={course.course.price} thumbnail={course.course.thumbnail} />
        ))}
        </div> }
    </div>
  )
}

export default MyCourses