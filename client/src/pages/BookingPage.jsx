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

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [buttonValue,setButtonValue]=useState('');

  const dispatch = useDispatch();

  console.log("doctor", doctor)
  console.log("user", user)
  console.log("availableSlot", availableSlots)
  console.log("date",date)
  // selected doctor data
console.log(moment.tz(new Date(), "Asia/Kolkata").format())

  const getDoctorData = async () => {
    try {

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
         
      if (!date && !buttonValue) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date.toDateString(),
          time: buttonValue,
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
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
 const handleButton=(e)=>{
    console.log(e.target.textContent)
    setButtonValue(e.target.textContent)
 }
  useEffect(() => {
    getDoctorData();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {doctor && (
          <div>
            <h4>
              Dr.{doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fees : {doctor.feesPerCunsaltation}</h4>
            <h4>
              Timings : {doctor.timings && doctor.timings[0]} -{" "}
              {doctor.timings && doctor.timings[1]}{" "}
            </h4>
            <div className="flex flex-col ">

              <DatePicker
                showIcon
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                maxDate={(new Date()).setDate((new Date()).getDate() + 30)}
              />


              <button
                className="text-white bg-blue-400 hover:bg-blue-500  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 max-w-56"
                onClick={handleAvailability}
              >
                show Available Slots
              </button>
              <div className="flex flex-wrap">
                {availableSlots?.length > 0 && availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-700 font-medium rounded-full text-sm px-3 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900" onClick={handleButton}>{slot}</button>
                ))}
              </div>
              <button className="text-white bg-green-400 hover:bg-green-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 max-w-56"
                onClick={handleBooking}
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
