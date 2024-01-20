import "../styles/RegiserStyles.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { message } from 'antd';
import { useState } from "react";
import { convertBase64 } from "../lib/helper";
import { useForm } from "react-hook-form";
import userAvatar from '../assets/userAvatar.jpg';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState(userAvatar);

  const { register, handleSubmit, formState: { errors } } = useForm();

  //form handler
  const handleFinish = async (values) => {
    try {
      console.log(values)
      const isProfilePicChanged = profilePic !== userAvatar
      dispatch(showLoading());
      
      const payload = isProfilePicChanged
        ? { ...values,profilePic }
        : values;
      console.log("payload",payload)
      const res = await axios.post("/api/v1/user/register", { ...payload });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const handleSelectFile = async (event) => {

    const file = event.target.files[0];

    console.log(file)
    const base64 = await convertBase64(file);
    console.log(base64)
    setProfilePic(base64)

  }
  return (
    <>
      {/* <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Image" name="image">
            <Input type="file" onChange={handleSelectFile} />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div> */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <a href="#" className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="mr-2 h-8 w-8" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Flowbite
          </a>
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">Create and account</h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleFinish)}>
                {/* <!--image upload start--> */}

                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your profile pic</label>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 flex-none overflow-hidden rounded-xl border">
                    <img className="mr-4 h-12 w-12 object-cover" id="imgInp" src={profilePic} alt="Avatar Upload" />
                  </div>
                  <label className="cursor-pointer">
                    <span className="rounded-full bg-green-400 px-4 py-2 text-sm text-white hover:bg-green-500 hover:shadow-lg focus:outline-none">Browse</span>
                    <input type="file" className="hidden"
                      onChange={handleSelectFile}
                    />
                  </label>
                </div>

                {/* <!-- image upload end --> */}
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                  <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm" placeholder="john Doe"  {...register('name', { required: true })} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm" placeholder="name@domain.com"
                    {...register('email', { required: true })} />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" placeholder="••••••••" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    {...register('password', { required: true })} />
                </div>
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link></p>
              </form>
            </div>
          </div>
        </div>
      </section>





    </>
  );
};

export default Register;
