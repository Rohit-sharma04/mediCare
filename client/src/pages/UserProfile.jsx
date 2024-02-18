import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams, } from "react-router-dom";
import userAvatar from '../assets/userAvatar.jpg'
import EditUserProfile from "../modal/EditUserProfile";
import bg from "../assets/bullseye-gradient.svg"

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const params = useParams();


    const getUserInfo = async () => {
        try {
            const res = await axios.post(
                "/api/v1/user/getUserData",
                { userId: params.id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (res.data.success) {
                console.log(res.data)
                setUser(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getUserInfo();
        //eslint-disable-next-line
    }, []);
    return (
        <Layout>

            <main className="profile-page ">
                <section className="h-[500px] relative block">
                    <div
                        className="absolute top-0 h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${bg})` }}>
                    </div>

                </section>

                <section className="bg-red-200  relative py-2">
                    <div className="container mx-auto px-4">
                        <div className="relative -mt-96 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
                            <div className="px-6 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="image flex justify-center   w-full  px-4 lg:order-2 lg:w-3/12">
                                        {/* <div className=""> */}
                                        {user?.profilePic ?
                                            <img alt="..." src={user?.profilePic} className=" max-w-[150px] max-h-[150px] absolute -m-16  rounded-full border-none align-middle shadow-xl" />
                                            : <img alt="..." src={userAvatar} className="max-w-[150px] max-h-[150px] absolute  -m-16  rounded-full border-none align-middle shadow-xl" />}
                                        {/* </div> */}
                                    </div>
                                    <div className="button block w-full px-4 lg:order-3 lg:w-4/12 lg:self-center text-center sm:text-start  ">
                                        <div className="mt-32 px-3 py-6 sm:mt-0 ">
                                            <button className="mb-1 rounded bg-pink-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600 sm:mr-2 " onClick={() => setIsOpen(true)}>
                                                Edit
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className="mt-12 text-center pt-16">

                                    <h3 className="text-slate-700 mb-2  text-4xl font-semibold leading-normal">
                                        {user?.name}
                                    </h3>
                                    <h3 className="text-slate-700 mb-2  text-xl font-semibold leading-normal">
                                        {user?.email}
                                    </h3>
                                </div>
                                <div className="border-slate-200 mt-10 border-t py-10 text-center">
                                    <div className="flex flex-wrap justify-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </main>
            {user && isOpen && (
                <EditUserProfile setIsOpen={setIsOpen} user={user} />
            )}
        </Layout>

    );
};

export default UserProfile;
