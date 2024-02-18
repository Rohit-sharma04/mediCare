import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'moment-timezone';
// import { loadStripe } from '@stripe/stripe-js';
// import {useStripe} from '@stripe/react-stripe-js'
const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [buttonValue, setButtonValue] = useState('');
  // const stripe =useStripe();
  const dispatch = useDispatch();

  console.log("doctor", doctor)
  console.log("user", user)
  console.log("availableSlot", availableSlots)
  console.log("date", date)
  // selected doctor data
  console.log(moment.tz(new Date(), "Asia/Kolkata").format())

  const getDoctorData = async () => {
    try {
      console.log(params.doctorId)
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {

        console.log(res.data.data)
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ============ handle availiblity==============
  const handleAvailability = async () => {
    try {

      // dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setAvailableSlots(res.data.availableSlots)
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }

    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }

  };

  // =============== booking func
  const handleBooking = async () => {
    try {
      if (!user) {
        return message.error("User must be logged in")
      }
      if (!date || !buttonValue) {
        console.log(" Time Required")
        return message.error(" Time Required");
      }
      dispatch(showLoading());

      // Create a checkout session with Stripe
      const sessionResponse= await axios.post(
        '/api/v1/stripe/create-checkout-session',
        {
          name: doctor.firstName + doctor.lastName,
          date: date.toDateString(),
          time: buttonValue,
          fees: doctor.feesPerCunsaltation,
          doctorId: params.doctorId,
          userId: user._id,  
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (sessionResponse.data.session.url) {
        window.location.href = sessionResponse.data.session.url;
      }

    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleButton = (e) => {
    console.log(e.target.textContent)
    console.log(date)
    setButtonValue(e.target.textContent)
    console.log(buttonValue)
  }
  useEffect(() => {
    getDoctorData();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            {doctor?.profilePic ? <img className="h-48 md:w-48 w-full md:h-auto p-3 md:rounded-full object-cover "
              src={doctor?.profilePic} alt="Doctor's image" /> :
              <img className="h-48 md:w-48 w-full md:h-auto p-3 md:rounded-full object-cover "
                src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*" alt="Doctor's image" />
            }

          </div>
          <div className="px-8 pt-3 ">
            <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold"> Dr.{doctor?.firstName} {doctor?.lastName}</div>
            <p className="block mt-1  text-black">Specialty: {doctor?.specialization}</p>
            <p className="block mt-1  text-black"> Timings : {doctor?.timings && doctor?.timings[0]} -{" "}
              {doctor?.timings && doctor?.timings[1]}{" "}</p>
            <p className="block mt-1  text-black">Fees: {doctor?.feesPerCunsaltation}</p>
            <div className="flex flex-col ">

              <p className="mt-2 text-gray-500">Select Date:</p>

              <DatePicker
                showIcon
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                maxDate={(new Date()).setDate((new Date()).getDate() + 30)}
              />
              <button
                className="text-white mt-2 bg-blue-400 hover:bg-blue-500  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 max-w-56"
                onClick={handleAvailability}
              >
                show Available Slots
              </button>
              <div className="flex flex-wrap ">
                {availableSlots?.length > 0 && availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-700 font-medium rounded-full text-sm px-3 py-2.5 text-center me-2 mb-2 " onClick={(e) => handleButton(e)}>{slot}</button>
                ))}
              </div>
              <button className="text-white mt-2 bg-green-400 hover:bg-green-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 max-w-56"
                onClick={handleBooking}>
                Book Now
              </button>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
