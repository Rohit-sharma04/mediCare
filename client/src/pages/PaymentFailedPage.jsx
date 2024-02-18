import { Link } from "react-router-dom"

const PaymentFailedPage = () => {
    return (
        <div className="bg-gray-100">
            <div className="bg-white p-6  md:mx-auto">
                <svg
                    viewBox="0 0 122.879 122.879" className="text-red-600 w-16 h-16 mx-auto my-6" >
                    <path fillRule="evenodd" fill="currentColor"
                        d="M61.44,0c33.933,0,61.439,27.507,61.439,61.439 s-27.506,61.439-61.439,61.439C27.507,122.879,0,95.372,0,61.439S27.507,0,61.44,0L61.44,0z M73.451,39.151 c2.75-2.793,7.221-2.805,9.986-0.027c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.076,12.249 c2.729,2.77,2.689,7.257-0.08,10.022c-2.773,2.765-7.23,2.758-9.955-0.013L61.446,71.54L49.428,83.728 c-2.75,2.793-7.22,2.805-9.986,0.027c-2.763-2.776-2.776-7.293-0.027-10.084L51.48,61.434L39.403,49.185 c-2.728-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.953,0.013l11.997,12.165L73.451,39.151L73.451,39.151z" />
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-xl text-gray-900 font-semibold text-center">Payment Failed!</h3>
                    <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                    <p> Have a great day!  </p>
                    <div className="py-10 text-center">
                        <Link to="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            GO BACK
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentFailedPage
