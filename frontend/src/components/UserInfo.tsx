import { useSelector } from "react-redux"

function UserInfo() {
    const userInfo = useSelector((state: any) => state.userInfo.userInfo)
  return (
    <div className="w-100 h-fit rounded-md bg-gray-900 absolute top-10 z-10 p-4 flex flex-col justify-center">
        <h1 className="mb-5">User Info</h1>
        <h1>{userInfo.name}</h1>
        <h1>{userInfo.email}</h1>
    </div>
  )
}

export default UserInfo