import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

function Signin() {
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignin() {
    await signin(email, password);
  }
  return (
    <div>
      <Link
        className="text-white bg-blue-700 px-5 py-1 rounded-md absolute top-5 left-5"
        to={"/"}
      >
        Home
      </Link>
      <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-center items-center flex-col mb-10 gap-4">
          <h1 className="text-3xl font-semibold text-center">
            Sign in to your account
          </h1>
          <p>
            Don't have an account?{" "}
            <Link className="text-blue-600" to={"/signup"}>
              Sign up
            </Link>{" "}
            instead
          </p>
        </div>
        <div className="border border-white rounded-md p-5 flex flex-col gap-5 w-100">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-xl">
              Enter your Email* :{" "}
            </label>
            <input
              type="email"
              name=""
              id=""
              className="border border-gray-600 rounded-md p-2 text-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-xl">
              Enter your password* :{" "}
            </label>
            <input
              type="password"
              name=""
              id=""
              className="border border-gray-600 rounded-md p-2 text-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="text-lg bg-blue-700 rounded-md py-2 cursor-pointer"
            onClick={handleSignin}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
