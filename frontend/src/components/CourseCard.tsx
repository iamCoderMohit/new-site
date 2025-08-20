import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface courseCardInput {
  id: number,
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  setShowValidate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function CourseCard({
  id,
  title,
  description,
  price,
  thumbnail,
  setShowValidate,
  setShowOverlay,
}: courseCardInput) {
  const isLoggedIn = useSelector((state: any) => state.userInfo.isLoggedIn);
  const navigate = useNavigate()

  return (
    <div className="text-white border border-gray-800 p-3 rounded-md">
      <img src={thumbnail} className="w-100 h-50 rounded-md" alt="" />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">{title}</h1>
        <h1 className="text-xl text-green-500 font-medium">Rs {price}/-</h1>
      </div>
      <h1 className="text-gray-600">{description}</h1>

      {isLoggedIn ? (
        <button
          className="bg-blue-700 w-full rounded-md mt-3 cursor-pointer font-medium"
          onClick={() => navigate(`/checkout/${id}`)}
        >
          Buy Now
        </button>
      ) : (
        <button
          className="bg-blue-700 w-full rounded-md mt-3 cursor-pointer font-medium"
          onClick={() => (
            setShowValidate((prev) => !prev), setShowOverlay((prev) => !prev)
          )}
        >
          Buy Now
        </button>
      )}
    </div>
  );
}

export default CourseCard;
