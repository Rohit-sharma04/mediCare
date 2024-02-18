/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { message } from 'antd';
import { useState } from "react";
import { convertBase64 } from "../lib/helper";
import { useForm } from "react-hook-form";
import doctorAvatar from '../assets/doctorAvatar.jpg';

const timeRegex = /^(\d{2}):(\d{2}) (AM|PM)$/i;

const EditDoctorProfile = ({ setIsOpen, doctor }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profilePic, setProfilePic] = useState(doctorAvatar);

    const { register, handleSubmit, formState: { errors } } = useForm();

    let match = doctor.timings[0].match(timeRegex);
    const hourFrom = match ? match[1] : '';
    const minutesFrom = match ? match[2] : '';
    const amPmFrom = match ? match[3].toUpperCase() : '';

    match = doctor.timings[1].match(timeRegex);
    const hourTo = match ? match[1] : '';
    const minutesTo = match ? match[2] : '';
    const amPmTo = match ? match[3].toUpperCase() : '';


    const handleFinish = async (values) => {
        try {
            console.log(values)
            const newValues = { ...values };
            ['hourFrom', 'minutesFrom', 'ampmFrom', 'hourTo', 'minutesTo', 'ampmTo'].forEach((e) => delete newValues[e])

            const isProfilePicChanged = profilePic !== doctorAvatar
            dispatch(showLoading());

            const payload = isProfilePicChanged
                ? { ...newValues, profilePic }
                : newValues;
            console.log("payload", payload)
            const res = await axios.patch("/api/v1/doctor/update-profile",
                {
                    ...payload,
                    timings: [
                        values.hourFrom + ':' + values.minutesFrom + " " + values.ampmFrom,
                        values.hourTo + ':' + values.minutesTo + " " + values.ampmTo
                    ],
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success("Updated Successfully!");
                navigate("/doctor/profile");
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
                                    <label htmlFor="name" className="mb-2  rounded-md block text-sm font-medium text-gray-900 ">Your profile pic</label>
                                    <div className="flex items-center">
                                        {doctor?.profilePic ? <div className="mr-4 h-12 w-12 flex-none overflow-hidden rounded-xl border">
                                            <img className="mr-4 h-12 w-12 object-cover" id="imgInp" src={doctor.profilePic} alt="Avatar Upload" />
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

                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 ">first name</label>
                                        <input type="text"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm" defaultValue={doctor.firstName}
                                            {...register('firstName')} />

                                        <label className="mb-2 block text-sm font-medium text-gray-900 ">last name</label>
                                        <input type="text"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" defaultValue={doctor.lastName}  {...register('lastName')} />

                                        <label className="mb-2 block text-sm font-medium text-gray-900 " > specialization </label>
                                        <input type="text"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" defaultValue={doctor.specialization}  {...register('specialization')} />

                                        <label className="mb-2 block text-sm font-medium text-gray-900 " > experience </label>
                                        <input type="text"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" defaultValue={doctor.experience}  {...register('experience')} />

                                        <label className="mb-2 block text-sm font-medium text-gray-900 " >fees per consultation </label>
                                        <input type="number"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" defaultValue={doctor.feesPerCunsaltation}  {...register('feesPerCunsaltation')} />

                                        <label className="mb-2 mt-3 text-xs font-bold uppercase text-gray-600">consultation Timning</label>
                                        <div className="flex flex-wrap md:flex-nowrap justify-start">
                                            <div className="relative mb-3 ">
                                                <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > from </label>
                                                <div className="w-30 mt-2 rounded-lg bg-white py-2 shadow-sm ">
                                                    <div className="flex">
                                                        <select defaultValue={hourFrom}
                                                            {...register('hourFrom')}
                                                            className="text-sm outline-none appearance-none rounded border-0 bg-white  transition-all duration-150 ease-linear focus:outline-none focus:ring ">
                                                            <option value="01">1</option>
                                                            <option value="02">2</option>
                                                            <option value="03">3</option>
                                                            <option value="04">4</option>
                                                            <option value="05">5</option>
                                                            <option value="06">6</option>
                                                            <option value="07">7</option>
                                                            <option value="08">8</option>
                                                            <option value="09">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                        </select>
                                                        <span className="mr-3 text-xl">:</span>

                                                        <select defaultValue={minutesFrom}
                                                            {...register('minutesFrom')}
                                                            className="text-sm outline-none appearance-none rounded border-0 bg-white  transition-all duration-150 ease-linear focus:outline-none focus:ring ">
                                                            <option value="00">00</option>
                                                            <option value="30">30</option>
                                                        </select>

                                                        <select defaultValue={amPmFrom}
                                                            {...register('ampmFrom')}
                                                            className="text-sm outline-none appearance-none rounded border-0 bg-white  transition-all duration-150 ease-linear focus:outline-none focus:ring ">
                                                            <option value="AM">AM</option>
                                                            <option value="PM">PM</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative mb-3 ml-2 ">
                                                <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > to </label>
                                                <div className="w-30 mt-2 rounded-lg bg-white py-2 shadow-sm ">
                                                    <div className="flex">
                                                        <select defaultValue={hourTo}
                                                            {...register('hourTo')}
                                                            className="text-sm outline-none appearance-none rounded border-0 bg-white  transition-all duration-150 ease-linear focus:outline-none focus:ring ">
                                                            <option value="01">1</option>
                                                            <option value="02">2</option>
                                                            <option value="03">3</option>
                                                            <option value="04">4</option>
                                                            <option value="05">5</option>
                                                            <option value="06">6</option>
                                                            <option value="07">7</option>
                                                            <option value="08">8</option>
                                                            <option value="09">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                        </select>
                                                        <span className="mr-3 text-lg">:</span>

                                                        <select defaultValue={minutesTo}
                                                            {...register('minutesTo')}
                                                            className="text-sm outline-none appearance-none rounded border-0 bg-white  transition-all duration-150 ease-linear focus:outline-none focus:ring ">
                                                            <option value="00">00</option>
                                                            <option value="30">30</option>
                                                        </select>

                                                        <select defaultValue={amPmTo}
                                                            {...register('ampmTo')}
                                                            className="text-sm outline-none appearance-none rounded border-0 bg-white  transition-all duration-150 ease-linear focus:outline-none focus:ring ">
                                                            <option value="AM">AM</option>
                                                            <option value="PM">PM</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>

                                    <button type="submit" className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 ">Update Profile</button>
                                </form>

                            </div>
                        </section>


                    </div>
                </div>
            </div>
        </>
    )
}

export default EditDoctorProfile
