import { Link } from "react-router-dom";
import NotFound from "../assets/404NotFound.svg";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <img className="h-3/4" src={NotFound} alt="Not Found"/>
      <Link 
        to='/' 
        className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
      >
        Go Back To Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
