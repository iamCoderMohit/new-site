import Navbar from "../components/Navbar"

function Home() {
  return (
    <div className="h-screen flex flex-col">
        <Navbar />

        <div className="text-white flex flex-col items-center justify-center h-[calc(100% - 75px)]  flex-1">
            <h1 className="text-5xl font-bold">Where knowledge meets passion</h1>
            <p className="text-xl w-2/3 text-center mt-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt soluta eius recusandae! Officia nemo, placeat distinctio ducimus corrupti odit voluptatibus!</p>
        </div>
    </div>
  )
}

export default Home