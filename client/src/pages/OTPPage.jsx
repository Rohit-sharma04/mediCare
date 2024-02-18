import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { message } from "antd";
import axios from "axios";

const OTPPage = () => {
    const params=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    console.log("param",params.email)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onfinishHandler = async (values) => {
        const otp=values[1]+values[2]+values[3]+values[4]+values[5]+values[6]
        console.log(otp)
        
        try {
            dispatch(showLoading());
            const res = await axios.post("/api/v1/user/verify-otp",{email:params.email,otp} );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate(`/${params.email}/reset-password`);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("something went wrong");
        }
    };


    return (
        <>
            <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-100 py-12">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email {params.email}</p>
                            </div>
                        </div>

                        <div>
                            <form  onSubmit={handleSubmit(onfinishHandler)}>
                                <div className="flex flex-col space-y-16">
                                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                        <div className="w-12 h-12 ">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength="1" 
                                             {...register('1', { required: true })} />
                                        </div>
                                        <div className="w-12 h-12 ">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength="1" 
                                                {...register('2', { required: true })}
                                            />
                                        </div>
                                        <div className="w-12 h-12 ">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength="1" 
                                                {...register('3', { required: true })}
                                            />
                                        </div>
                                        <div className="w-12 h-12 ">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength="1" 
                                            {...register('4', { required: true })} />
                                        </div>
                                        <div className="w-12 h-12 ">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength="1" 
                                            {...register('5', { required: true })} />
                                        </div>
                                        <div className="w-12 h-12 ">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength="1"
                                             {...register('6', { required: true })}/>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-5">
                                        <div>
                                            <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm">
                                                Verify Account
                                            </button>
                                        </div>

                                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn&apos;t recieve code?</p> <div className="flex flex-row items-center text-blue-600">Resend</div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OTPPage
