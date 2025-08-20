import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({children}: {children: JSX.Element}){
    const user = useSelector((state: any) => state.userInfo.userInfo)

    if(!user) return <Navigate to={'/'} />
    if(user.role !== 'ADMIN') return <Navigate to={'/'} />

    return children
}

export default AdminRoute