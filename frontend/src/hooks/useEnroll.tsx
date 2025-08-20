import axios from "axios";
import { useState } from "react";

export function useEnroll() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false)

  const myEnrollments = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${BACKEND_URL}/enroll`, {
        headers: {
            Authorization: localStorage.getItem('jwt')
        }
      });

      setEnrollments(res.data.enrollments);
    } catch (error) {
        console.error(error)
    } finally{
        setLoading(false)
    }
  };

  return {myEnrollments, enrollments, loading}
}
