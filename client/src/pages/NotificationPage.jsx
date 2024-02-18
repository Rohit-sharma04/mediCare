import Layout from "../components/Layout";
import { message} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useState } from "react";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("inbox")

  const { user } = useSelector((state) => state.user);
  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
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
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("somthing went wrong");
    }
  };

  // delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrong In Ntifications");
    }
  };
  return (
    <Layout>
      <div className="mb-4 border-b border-gray-200 ">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="me-2" >
            <button className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-400 ${tab==='inbox'&&" text-blue-600 border-blue-600 "}`} onClick={() => setTab("inbox")}
            >Inbox</button>
          </li>
          <li className="me-2" >
            <button className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-400 ${tab==='archive'&&"text-blue-600 border-blue-600 "}`} onClick={() => setTab("archive")}>Archive</button>
          </li>
        </ul>
      </div>

      <div >
        {tab == "inbox" ? <div className="">
        <div className="flex justify-end">
            <h4 className="p-2 text-blue-500 cursor-pointer" onClick={handleMarkAllRead}>
              Move to Archive
            </h4>
          </div>
          {user?.notification.map((notificationMgs, index) => (
            <div key={index} className="cursor-pointer" >
              <div
                className="text-sm text-gray-500 p-3 my-2 rounded-lg bg-gray-50" >
                {notificationMgs.message}
              </div>
            </div>
          ))}
          
        </div> :
          <div id="archive" className="">
          <div className="flex justify-end">
            <h4
              className="p-2 text-blue-500 cursor-pointer"
              onClick={handleDeleteAllRead}>
              Delete All
            </h4>
          </div>
          {user?.seennotification.map((notificationMgs, index) => (
            <div key={index} className="cursor-pointer" >
              <div
                className="text-sm text-gray-500 p-3 my-2 rounded-lg bg-gray-50">
                {notificationMgs.message}
              </div>
            </div>
          ))}
          </div>
        }
      </div>
    </Layout>
  );
};

export default NotificationPage;
