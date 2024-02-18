import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useParams, } from "react-router-dom";
import doctorAvatar from "../../assets/doctorAvatar.jpg"
import EditDoctorProfile from "../../modal/EditDoctorProfile";
import bg from "../../assets/bullseye-gradient.svg"
const Profile = () => {
  const [doctor, setDoctor] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();


  //getDOc Details
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>

      {doctor && <main className="profile-page">
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
                  <div className="image  flex justify-center  w-full  px-4 lg:order-2 lg:w-3/12">
                    {doctor?.profilePic ?
                      <img alt="..." src={doctor?.profilePic} className=" max-w-[150px] max-h-[150px] absolute -m-16  rounded-full border-none align-middle shadow-xl " />
                      : <img alt="..." src={doctorAvatar}      className="max-w-[150px] max-h-[150px] absolute  -m-16  rounded-full border-none align-middle shadow-xl " />}
                  </div>

                  <div className="button block w-full px-4 lg:order-3 lg:w-4/12 lg:self-center text-center sm:text-start  ">
                    <div className="mt-32 px-3 py-6 sm:mt-0 ">
                      <button className="mb-1 rounded bg-pink-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600 sm:mr-2 " onClick={() => setIsOpen(true)}>
                        Edit
                      </button>
                    </div>
                  </div>

                </div>
                <div className="mt-12 text-center">

                  <h3 className="text-slate-700 mb-2  text-4xl font-semibold leading-normal">
                    {doctor.firstName} {doctor.lastName}</h3>
                  <div className="text-slate-400 mb-2 mt-0 text-sm font-bold uppercase leading-normal">
                    <i className="fa-solid fa-stethoscope text-slate-400 mr-2 text-lg"></i>
                    {doctor.specialization}
                  </div>
                  <div className="text-slate-400 mb-2 mt-0 text-sm font-bold uppercase leading-normal">
                    <i className="fas fa-map-marker-alt text-slate-400 mr-2 text-lg"></i>
                    {doctor.address}
                  </div>


                  <div className="text-slate-600 mb-2 mt-10"><i className="fas fa-briefcase text-slate-400 mr-2 text-lg"></i>Solution Manager - Creative Tim Officer</div>
                  <div className="text-slate-600 mb-2"><i className="fas fa-university text-slate-400 mr-2 text-lg"></i>University of Computer Science</div>
                </div>
                <div className="border-slate-200 mt-10 border-t py-10 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4 lg:w-9/12">
                      <p className="text-slate-700 mb-4 text-lg leading-relaxed">An artist of considerable range, Jenna the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>}
      {doctor && isOpen && (
        <EditDoctorProfile setIsOpen={setIsOpen} doctor={doctor} />
      )}
    </Layout>
  );
};

export default Profile;
