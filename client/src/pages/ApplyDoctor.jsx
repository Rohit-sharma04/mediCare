import Layout from "../components/Layout";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useForm } from "react-hook-form";
import { convertBase64 } from "../lib/helper";
import { useState } from "react";
import userAvatar from '../assets/userAvatar.jpg';

const ApplyDoctor = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(userAvatar);
  // const [certificate,setCertificate]=useState([])

  //handle form
  const handleFinish = async (values) => {
    try {
      const certificate = [];
      for (let certi of values.certificates) {
        const base64 = await convertBase64(certi);
        certificate.push(base64)
      }
      console.log("cirtificate", certificate)

      //add certificate  in form
      values.certificates = certificate;

      console.log("form values", values)
      console.log("from", [values.hourFrom + ':' + values.minutesFrom + values.ampmFrom,
      values.hourTo + ':' + values.minutesTo + values.ampmTo])
      const newValues = { ...values };

      ['hourFrom', 'minutesFrom', 'ampmFrom', 'hourTo', 'minutesTo', 'ampmTo'].forEach((e) => delete newValues[e])

      //about is also deleted for now
      // delete newValues['about']

      console.log("new vslues", newValues)
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...newValues,
          profilePic:profilePic,
          userId: user._id,
          timings: [
            values.hourFrom + ':' + values.minutesFrom + " " + values.ampmFrom,
            values.hourTo + ':' + values.minutesTo + " " + values.ampmTo
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
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
      <Layout>
        <section className="bg-gray-50 py-1">
          <div className="mx-auto mt-6 w-full px-4 lg:w-8/12">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-slate-100 shadow-sm ">
              <div className="mb-0 rounded-t bg-white px-6 py-6">
                <div className="flex justify-between text-center">
                  <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                </div>
              </div>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <form onSubmit={handleSubmit(handleFinish)}>
                  <h6 className="mb-6 mt-3 text-sm font-bold uppercase text-slate-400">User Information</h6>
                  <div className="w-full px-4 lg:w-6/12">
                      <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > Profile pic *</label>
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
                              required
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  <div className="flex flex-wrap">
                    <div className="w-full px-4 lg:w-6/12">
                      <div className="relative mb-3 w-full">
                        <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > Email address *</label>
                        <input
                          type="email"
                          {...register('email', { required: true })}
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm  transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="jesse@example.com" />
                      </div>
                    </div>
                    <div className="w-full px-4 lg:w-6/12">
                      <div className="relative mb-3 w-full">
                        <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > First Name *</label>
                        <input type="text"
                          {...register('firstName', { required: true })}
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="Lucky" />
                      </div>
                    </div>
                    <div className="w-full px-4 lg:w-6/12">
                      <div className="relative mb-3 w-full">
                        <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > Last Name *</label>
                        <input type="text"
                          {...register('lastName', { required: true })}
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="Jesse" />
                      </div>
                    </div>
                  </div>

                  <hr className="border-b-1 mt-6 border-gray-300" />

                  {/* <!-- end of user info -->  */}
                  <h6 className="mb-6 mt-3 text-sm font-bold uppercase text-slate-400">Contact Information</h6>
                  <div className="flex flex-wrap">
                    <div className="lg:w-12/12 w-full px-4">
                      <div className="relative mb-3 w-full">
                        <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > Address *</label>
                        <input type="text"
                          {...register('address', { required: true })}
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" />
                      </div>
                    </div>
                    <div className="w-full px-4 lg:w-4/12">
                      <div className="relative mb-3 w-full">
                        <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > website </label>
                        <input type="text"
                          {...register('website')}
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="www.google.com" />
                      </div>
                    </div>
                    <div className="w-full px-4 lg:w-4/12">
                      <div className="relative mb-3 w-full">
                        <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > phone number *</label>
                        <input type="text"
                          {...register('phone', { required: true })}
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="9123456780" />
                      </div>
                    </div>
                  </div>

                  {/* <!-- end of contact info -->  */}

                  <hr className="border-b-1 mt-6 border-gray-300" />


                  <h6 className="mb-6 mt-3 text-sm font-bold uppercase text-slate-400">professional details</h6>
                  <div className="flex flex-wrap">
                    <div className="w-full px-4 lg:w-4/12">
                      <div className="relative mb-3 w-full">
                        <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > specialization *</label>
                        <input type="text"
                          {...register('specialization', { required: true })}
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="Neurology" />
                      </div>
                    </div>
                    <div className="w-full px-4 lg:w-4/12">
                      <div className="relative mb-3 w-full">
                        <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > experience *</label>
                        <input type="text"
                          {...register('experience', { required: true })}
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="5 years" />
                      </div>
                    </div>
                    <div className="w-full px-4 lg:w-4/12">
                      <div className="relative mb-3 w-full">
                        <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > fees per consultation *</label>
                        <input type="number"
                          {...register('feesPerCunsaltation', { required: true })}
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm focus:outline-none focus:ring" placeholder="500" />
                      </div>
                    </div>

                    {/* <!-- time picker  start  --> */}
                    <div className="w-full px-4 lg:w-4/12">
                      <div className="relative mb-3 w-full">
                        <label className="mb-2 mt-3 text-xs font-bold uppercase text-gray-600">consultation Timning</label>
                        <div className="flex flex-wrap md:flex-nowrap justify-start">
                          <div className="relative mb-3 ">
                            <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > from </label>
                            <div className="w-30 mt-2 rounded-lg bg-white py-2 shadow-sm ">
                              <div className="flex">
                                <select defaultValue={"01"}
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
                                <span className="text-xl">:</span>

                                <select defaultValue={"00"}
                                  {...register('minutesFrom')}
                                  className="text-sm outline-none appearance-none rounded border-0 bg-white  transition-all duration-150 ease-linear focus:outline-none focus:ring ">
                                  <option  value="00">00</option>
                                  <option  value="30">30</option>
                                </select>
                                <select defaultValue={"AM"}
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
                                <select defaultValue={"01"}
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
                                <span className="text-lg">:</span>

                                <select defaultValue={"00"}
                                  {...register('minutesTo')}
                                  className="text-sm outline-none appearance-none rounded border-0 bg-white  transition-all duration-150 ease-linear focus:outline-none focus:ring ">
                                  <option value="00">00</option>
                                  <option value="30">30</option>
                                </select>

                                <select defaultValue={"AM"}
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
                    </div>
                    {/* <!-- time picker  end -->  */}

                  </div>
                  {/* </div> */}

                  {/* <!-- end of  professional detail   --> */}

                  {/* certificate upload */}
                  <hr className="border-b-1 mt-6 border-gray-300" />

                  <h6 className="mb-6 mt-3 text-sm font-bold uppercase text-slate-400">Certificates</h6>
                  <div className="flex flex-wrap">
                    <div className="lg:w-12/12 w-full px-4">
                      <div className="relative mb-3 w-full">
                        <label className=" text-gray-900  mb-2 block text-xs font-bold uppercase" htmlFor="multiple_files">Upload your certificates *</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white  shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" id="multiple_files" type="file" multiple
                          {...register('certificates', { required: true })}
                        />
                        <p className="mt-1 text-xs text-gray-500 " id="file_input_help">SVG, PNG, JPG.</p>
                      </div>
                    </div>
                  </div>




                  {/* about me section */}
                  <hr className="border-b-1 mt-6 border-gray-300" />

                  <h6 className="mb-6 mt-3 text-sm font-bold uppercase text-slate-400">About Me</h6>
                  <div className="flex flex-wrap">
                    <div className="lg:w-12/12 w-full px-4">
                      <div className="relative mb-3 w-full">
                        <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase" > About me </label>
                        <textarea
                          type="text"
                          {...register('about')}
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" rows="4"
                          placeholder="A renounde doctor at  AIIMS DELHI with 10 year of experiance ."></textarea>
                      </div>
                    </div>
                  </div>
                  <button className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-3" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </Layout>
    </>
  )
};

export default ApplyDoctor;
