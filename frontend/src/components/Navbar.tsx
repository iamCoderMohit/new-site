import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { persistor } from "../store/store";
import { logout } from "../features/authSlice";

function Navbar() {
  const isLoggedIn = useSelector((state: any) => state.userInfo.isLoggedIn);
  const userInfo = useSelector((state: any) => state.userInfo.userInfo)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className="text-white flex justify-between px-20 py-5 h-[75px]">
      <div className="cursor-pointer text-lg font-semibold">
        <Link to={"/"}>Logo</Link>
      </div>
      <div className="flex gap-10">
        <button className="cursor-pointer text-lg font-semibold">
          <Link to={"/explore"}>Explore</Link>
        </button>
        <button className="cursor-pointer text-lg font-semibold">
          Courses
        </button>
        <button className="cursor-pointer text-lg font-semibold">About</button>
      </div>
      <div className="flex gap-10">
        {isLoggedIn ? (
          <div className="flex gap-5 items-center">
            <div className="bg-gray-900 w-10 h-10 flex justify-center items-center font-bold text-xl rounded-full cursor-pointer">
              {userInfo.name[0].toUpperCase()}
            </div>
            <button className="cursor-pointer text-lg font-semibold"
            onClick={() => (
              localStorage.clear(),
              persistor.purge(),
              dispatch(logout()),
              navigate('/')
            )}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex gap-10">
            <button className="cursor-pointer text-lg font-semibold">
              <Link to={"/signin"}>Sign in</Link>
            </button>
            <button className="cursor-pointer text-lg font-semibold">
              <Link to={"/signup"}>Sign up</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
