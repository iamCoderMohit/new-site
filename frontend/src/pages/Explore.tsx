import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useCourse } from "../hooks/useCourse";
import ImageSlider from "../components/ImageSlider";
import CourseCard from "../components/CourseCard";
import Loader from "../components/Loader";
import Validate from "../components/Validate";
import Overlay from "../components/Overlay";

function Explore() {
  const images = [
    "https://i.pinimg.com/736x/5e/d5/8c/5ed58cbf79e583bfbab7016077008e28.jpg",
    "https://4kwallpapers.com/images/wallpapers/hello-world-pixel-7680x4320-15168.png",
    "https://images.hdqwalls.com/wallpapers/hello-world-dark-oled-5k-ak.jpg",
  ];

  const {getCourses, courses, loading} = useCourse()

  useEffect(() => {
  const fetchCourse = async () => {
    await getCourses()
  }

  fetchCourse()
  }, [])

  const [showValidate, setShowValidate] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <div>
      <Navbar />

      <div className="text-white">
        <h1 className="text-center text-5xl font-bold mb-10">Learn the best, from the best</h1>
      </div>

      <ImageSlider images={images} />

      <h1 className="text-white text-3xl mb-10 font-bold pl-5 mt-10">Have a look at our courses</h1>

      {loading ? <Loader /> : null}

      <div className="flex justify-around flex-wrap gap-5">
        {courses.map((course: any) => (
          <div>
            <CourseCard id={course.id} title={course.title} description={course.description} price={course.price} thumbnail={course.thumbnail} setShowValidate={setShowValidate} setShowOverlay={setShowOverlay} />
          </div>
        ))}
      </div>

        {showValidate ? <Validate /> : null}
        {showOverlay ? <Overlay setShowOverlay={setShowOverlay} setShowValidate={setShowValidate} /> : null}
    </div>
  );
}

export default Explore;
