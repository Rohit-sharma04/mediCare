/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <>
    <div className="card w-60 m-2 bg-white rounded-lg overflow-hidden shadow-md transform transition-transform hover:-translate-y-2">

      <div className="doctor-image w-full h-60 bg-cover bg-center relative" >
        <img src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*" />


        <div className="name-spec absolute bottom-3 left-3 text-white text-shadow" style={{textShadow:" 1px 1px 3px rgba(0, 0, 0, 0.5)"}} >

          <div className="name text-2xl font-bold mb-1 ">Dr. {doctor.firstName} {doctor.lastName}</div>
          <div className="specialisation text-xl font-bold"> {doctor.specialization}</div>
          
        </div>
      </div>

      <div className="details p-2">
        <div className="info mb-2.5  " >
          <span className="label  font-bold  ">Experience: </span>{doctor.experience}
        </div>

        <div className="info mb-2.5">
          <span className="label font-bold ">Consultation Fees: </span>{doctor.feesPerCunsaltation}
        </div>

        <div className="info mb-2.5">
          <span className="label font-bold ">Timing: </span> Mon - Fri: {doctor.timings[0]} - {doctor.timings[1]}
        </div>
        <button
          className="align-middle tracking-tight mb-2 font-sans font-bold text-center uppercase transition-all  text-xs py-2.5 px-2.5 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 "
          type="button"  onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
          Book Appointment
        </button>
      </div>

    </div>
    </>
  )
};

export default DoctorList;
