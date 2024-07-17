import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { message } from "antd";
import DoctorInfo from "../../modal/DoctorInfo";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  //getUsers
  console.log(doctors)

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account
  const handleAccountStatus = async (doctor, status) => {
    try {
      console.log("test6",doctor)
      console.log("clicked")
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        {
          doctorId: doctor._id,
          userIdofDoctor: doctor.userId, 
          status: status,
          timeFrom: doctor.timings[0],
          timeTo: doctor.timings[1]
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        await getDoctors();
        message.success(res.data.message);
        
        // window.location.reload();
      }
    } catch (error) {
      await getDoctors();
      message.error("Something Went Wrong");
    }
  };

  //delete doctor account
  const deleteDoctorAccount=async (doctor)=>{
    try {
      const res = await axios.post(
        "/api/v1/admin/deleteDoctorAccount",
        {
          doctorId: doctor._id,
          userIdofDoctor:doctor.userId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        // window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  }
  const showDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setIsOpen(true);
  };
  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <Layout>
      <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
        
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody >

            {doctors?.map((doctor) => {
              return (
                <>
                <tr key={doctor._id} className="bg-white border-b  hover:bg-gray-50 ">

                  <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap ">
                    {`${doctor.firstName}  ${doctor.lastName}`}
                  </th>
                  <td className="px-6 py-2">
                    {doctor.phone}
                  </td>
                  <td className="px-6 py-2">
                    <span className={(doctor.status) === 'pending' ? 'text-yellow-500' : 'text-green-500'}>
                      {doctor.status}
                    </span>
                  </td>

                  <td className="px-6 py-2 flex">
                    {doctor.status === "pending" ? (
                      <div>
                      <i className="fa-regular fa-circle-check ml-0.5 px-2 py-2.5 text-center text-green-500 text-lg cursor-pointer"
                       onClick={() => handleAccountStatus(doctor, "approved")}></i>
                       <i className="fa-regular fa-circle-xmark ml-0.5 px-2 py-2.5 text-center text-red-500 text-lg cursor-pointer"
                       onClick={()=> deleteDoctorAccount(doctor)}></i>
                      </div>
                    ) : (
                      <i className="fa-regular fa-circle-xmark ml-0.5 px-2 py-2.5 text-center text-red-500 text-lg cursor-pointer"
                       onClick={()=> deleteDoctorAccount(doctor)}></i>
                      
                    )}
                    <i className="fa-solid fa-eye ml-0.5 px-2 py-2.5 text-center text-blue-500 text-lg cursor-pointer"  onClick={() => showDoctorDetails(doctor)}></i>
                  </td>
                </tr>
                </>
                )
            })}


          </tbody>
        </table>
      </div>
      {isOpen && selectedDoctor && (
        <DoctorInfo setIsOpen={setIsOpen} doctor={selectedDoctor} />
      )}
    </Layout>
  );
};

export default Doctors;
