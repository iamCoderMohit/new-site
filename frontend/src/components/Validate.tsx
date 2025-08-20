import { Link } from "react-router-dom"

function Validate() {
  return (
    <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-700 rounded-md p-5 backdrop-blur-2xl z-2">
        <h1 className="text-lg font-bold mb-5">You need to sign in first to perform this action</h1>

        
        <div className="mb-5">
            <p>Don't have an account</p>
            <Link to={'/signup'}><button className="bg-blue-700 w-full rounded-md cursor-pointer">Sign up</button></Link>
        </div>

        
        <div className="">
            <p>Already have an account</p>
            <Link to={'/signin'}><button className="bg-blue-700 w-full rounded-md cursor-pointer">Sign in</button></Link>
        </div>
    </div>
  )
}

export default Validate