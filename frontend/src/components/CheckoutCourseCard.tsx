interface courseCardInput {
    title: string,
    description: string,
    thumbnail: string,
    price: number
}

function CheckoutCourseCard({title, description, thumbnail, price}: courseCardInput) {
  return (
    <div>
        <div className="text-white w-fit border border-gray-700 p-5 rounded-md">
            <img className="h-60 w-110 rounded-md" src={thumbnail} alt="" />
            <div className="flex justify-between items-center mt-5">
                <h1 className="font-bold text-3xl">{title}</h1>
                <h1 className="text-xl font-semibold text-green-500">Rs {price}/-</h1>
            </div>
            <h1 className="text-xl">{description}</h1>
        </div>
    </div>
  )
}

//was working on the right side of this page where user can see the checkout options 
//also create admin pages with proper validation

export default CheckoutCourseCard