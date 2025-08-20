import { useState } from "react";
import { useCourse } from "../hooks/useCourse";

function CreateCourse() {
  const { createCourse } = useCourse();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [thumb, setThumb] = useState("");

  async function handleCreate() {
    await createCourse(title, desc, Number(price), thumb)
  }
  
  return (
    <div className="text-white">
      <h1>Create a new course</h1>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="title"
          className="border"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="text" placeholder="desc" className="border" 
        onChange={(e) => setDesc(e.target.value)}
        />
        <input type="text" placeholder="price" className="border" 
        onChange={(e) => setPrice(e.target.value)}
        />
        <input type="text" placeholder="thumb" className="border" 
        onChange={(e) => setThumb(e.target.value)}
        />
        <button className="bg-blue-700" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateCourse;
