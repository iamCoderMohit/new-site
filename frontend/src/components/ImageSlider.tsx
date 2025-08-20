import { useEffect, useState } from "react";

function ImageSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [images]);
  return <div>
          <div
        style={{
          backgroundImage: `url(${images[index]})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          transition: "background-image 0.5s ease-in-out",
        }}
        className="w-full h-50"
      ></div>
  </div>;
}

export default ImageSlider;
