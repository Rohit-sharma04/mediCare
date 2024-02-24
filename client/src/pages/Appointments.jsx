import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import noData from "../assets/noData.svg"
import { useNavigate } from "react-router-dom";

const Appointments = () => {

  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
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

  const handleClick = (appointment) => {
    console.log(appointment)
    navigate(`/room/${appointment.userId}/${appointment.doctorUserId}`)
  }


  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const updatedAppointments = appointments.map(appointment => {
        const appointmentTimeString = appointment.date + " " + appointment.time;
        const appointmentTime = new Date(appointmentTimeString);
        const appointmentTimeplus30 = new Date(appointmentTime.getTime() + 30 * 60000);
        
        if (currentDate >= appointmentTime && currentDate <= appointmentTimeplus30) {
          return { ...appointment, isCallEnabled: true };
        } else {
          return { ...appointment, isCallEnabled: false };
        }
      });
  
      // Update the state with the updated appointments array
      setAppointments(updatedAppointments);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [appointments]);

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
                Docotr Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3">
                Call
              </th>

            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ?
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
                      Dr. {appointment.doctorName}
                    </th>
                    <td className="px-6 py-4">
                      {`${appointment.date} ${appointment.time}`}
                    </td>
                    {console.log("apointment time and date", appointment.date, appointment.time)}
                    <td className="px-6 py-4">
                    {console.log(appointment.isCallEnabled)}
                      <button
                        className={`bg-green-400 text-white px-4 py-2 rounded-lg ${!appointment.isCallEnabled && 'cursor-not-allowed opacity-50 bg-gray-400'}`}
                        disabled={!appointment.isCallEnabled}
                        onClick={() => handleClick(appointment)}>
                        Call
                      </button>
                    </td>
                  </tr>)
              })}
          </tbody>
        </table>
      </div>
    </Layout>
  );

}
export default Appointments;
