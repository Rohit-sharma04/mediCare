/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { message } from 'antd';
import { useState } from "react";
import { convertBase64 } from "../lib/helper";
import { useForm } from "react-hook-form";
import userAvatar from '../assets/userAvatar.jpg';

const EditUserProfile = ({ setIsOpen, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState(userAvatar);

  const { register, handleSubmit, formState: { errors } } = useForm();

  // console.log("render")
  const handleFinish = async (values) => {
    try {
      console.log(values)
      const isProfilePicChanged = profilePic !== userAvatar
      dispatch(showLoading());

      const payload = isProfilePicChanged
        ? { ...values, profilePic }
        : values;
      console.log("payload", payload)
      const res = await axios.patch("/api/v1/user/update-profile", 
      { ...payload }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Updated Successfully!");
        navigate("/profile");
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
    // console.log(base64)
    setProfilePic(base64)

  }
  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden fixed   z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
        <div className="relative p-4 w-full max-w-md max-h-full ">
          <div className="relative bg-white rounded-lg shadow-sm ">
            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              onClick={() => setIsOpen(false)}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>

            <section className="bg-gray-50 rounded-lg shadow ">
              <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-[50%vh] lg:py-0">

               
                <form className=" w-full py-7  space-y-4 md:space-y-6 " onSubmit={handleSubmit(handleFinish)}>
                  {/* <!--image upload start--> */}
                  <label htmlFor="name" className="mb-2  rounded-md block text-sm font-medium text-gray-900 ">Your profile pic</label>
                  <div className="flex items-center">
                    {user?.profilePic ? <div className="mr-4 h-12 w-12 flex-none overflow-hidden rounded-xl border">
                      <img className="mr-4 h-12 w-12 object-cover" id="imgInp" src={user.profilePic} alt="Avatar Upload" />
                    </div> : <div className="mr-4 h-12 w-12 flex-none overflow-hidden rounded-xl border">
                      <img className="mr-4 h-12 w-12 object-cover" id="imgInp" src={profilePic} alt="Avatar Upload" />
                    </div>}

                    <label className="cursor-pointer">
                      <span className="rounded-full bg-green-400 px-4 py-2 text-sm text-white hover:bg-green-500 hover:shadow-lg focus:outline-none">Browse</span>
                      <input type="file" className="hidden"
                        onChange={handleSelectFile}
                      />
                    </label>
                  </div>

                  {/* <!-- image upload end --> */}
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 ">Your name</label>
                    <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" defaultValue={user.name}  {...register('name')} />
                  </div>

                  <button type="submit" className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 ">Update Profile</button>
                </form>
                {/* </div>
                </div> */}
              </div>
            </section>


          </div>
        </div>
      </div>

    </>
  )
}

export default EditUserProfile
