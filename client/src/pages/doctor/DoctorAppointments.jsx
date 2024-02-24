import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import noData from '../../assets/noData.svg'
import axios from "axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  console.log(appointments)
  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);



  return (
    <Layout>
      <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
        

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Patient Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>

            </tr>
          </thead>
          <tbody>
            {appointments.length == 0 ?
              <>
                <tr>
                  <td colSpan="3" className=" text-center  py-2">
                    <img src={noData} className="mx-auto w-96 min-h-[60vh]" alt="no Data" />
                  </td>
                </tr></> :
              appointments?.map((appointment) => {
                return (
                  <tr key={appointment._id} className="bg-white border-b  hover:bg-gray-50 ">

                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {appointment.userName}
                    </th>
                    <td className="px-6 py-4">
                      {`${appointment.date} ${appointment.time}`}
                    </td>

                  </tr>)
              })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DoctorAppointments;
