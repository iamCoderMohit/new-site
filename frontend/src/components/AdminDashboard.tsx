import { Link } from "react-router-dom"

function AdminDashboard() {
  return (
    <div className="text-white">
        <h1>Welcome to admin dashboard</h1>

        <Link to={'/admin/create'}><button className="bg-blue-700">Create a New Course</button></Link>
    </div>
  )
}

export default AdminDashboard