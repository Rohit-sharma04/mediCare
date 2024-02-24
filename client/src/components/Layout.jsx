import "../styles/LayoutStyles.css";
import { adminMenu, userMenu, doctorMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import userAvatar from "../assets/userAvatar.jpg";
import { useEffect, useState,useContext } from "react";
import logo from "../assets/mediCareLogo.jpg"
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

import { SocketContext } from '../context/SocketProvider';
// id===socket.id

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const[isOpen,setIsOpen]=useState(false);
  const[isSidebarOpen,setIsSidebarOpen]=useState(false);

  const { user } = useSelector((state) => state.user);

  const [showModel, setShowModel] = useState(false);
  const [callerId, setCallerId] = useState(null);
  const [callerName, setCallerName] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const socket = useContext(SocketContext)
  // const { username, id, setId, setUsername } = useContext(UserContext);


  const handleIncomming = (data) => {
    setShowModel(true)
    console.log("toggeled  -----")
    const { callerName, callerId, receiverId } = data;
    setCallerId(callerId);
    setCallerName(callerName);
    setReceiverId(receiverId);
    // alert(`${callerName} is calling `)
  }
  const handleCallAccepted = () => {
    socket.emit("receiver:joinedRoom", ({callerId, receiverId}))
    navigate(`/room/${callerId}/${receiverId}`)
  } 

  useEffect(()=>{
    if (socket) {
      socket.on('connect', () => {
        console.log(`myself ${socket.id}`);
      });

      socket.on("calling", handleIncomming)
    }
    return () => {
      // socket.off("calling", handleIncomming)
    }
  },[socket])

  //eslint-disable-next-line
  const getUser = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };


  // =========== doctor menu ===============

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
      ? doctorMenu
      : userMenu;

  return (
    <>
      {/* navBar */}
      <nav className="fixed top-0 z-40 w-full h-20 bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <Link to={'/'} className="flex ms-2 md:me-24">
                <img src={logo} className="h-12 rounded-full  me-3" alt=" Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">MediCare</span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="flex items-center">
                  <div className="header-content cursor-pointer" >
                    <div className="relative" onClick={() => {
                      navigate("/notification");
                    }}>
                      <i className=" fa-solid fa-bell text-lg text-teal-600 animate-wiggle inline" ></i>
                      <div className="px-1.5 bg-teal-500 rounded-full text-center text-black text-sm inline absolute left-3 -top-3">
                        {user?.notification?.length>0 &&user?.notification?.length}
                        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full" ></div>
                      </div>
                    </div>
                    <p className="hidden md:block text-xl font-semibold ">{user?.name}</p>
                  </div>
                  <div>

                    {/* dropdown button */}
                    <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 " onClick={()=>setIsOpen(!isOpen)}>
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full"
                        src={`${user?.profilePic ? user?.profilePic : userAvatar}`}
                        alt="user photo" />
                    </button>
                  </div>

                  {/* dropdown */}
                 {user&&isOpen? <div className="absolute top-10 right-2 z-40 my-4  list-none divide-y divide-gray-100 rounded bg-white text-base shadow" >
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900 " role="none">{user.name}</p>
                      <p className="truncate text-sm font-medium text-gray-900" role="none">{user.email}</p>
                    </div>
                    <ul className="py-1" role="none">
                    <li>
                        <Link to='/' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " role="menuitem">Home</Link>
                      </li>
                      <li>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " role="menuitem">Profile</Link>
                      </li>
                      <li>
                        <Link to="/login" onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " role="menuitem">Log out</Link>
                      </li>
                    </ul>
                  </div>:""}

                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside id="logo-sidebar" className={`fixed top-20 left-0 z-30 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 
              ${isSidebarOpen?'translate-x-0':'' }`}>
        <div className="h-full px-3 pt-2 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">

            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path; //current position in menu
              return (
                <li key={menu.name} className={`${isActive && "rounded-lg bg-gray-100 text-gray-900"}`}>
                  <Link to={menu.path} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 ">
                    <i className={`${menu.icon} ${isActive &&"text-gray-900"}  w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 `}
                    ></i>
                    <span className="ms-3">{menu.name}</span>
                  </Link>
                </li>
              );
            })}
            {user ? <li onClick={handleLogout}>
              <Link to="/login" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100">
                <i className="fa-solid fa-right-from-bracket  w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "></i>
                <span className="ms-3">Logout</span>
              </Link>
            </li> :
              <Link to="/login" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 ">
                <i className="fa-solid fa-right-from-bracket  w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "></i>
                <span className="ms-3">Login</span>
              </Link>}

          </ul>
        </div>
      </aside>

      {/* content  */}
      <div className="sm:p-8 pt-8  md:p-4 sm:ml-64">
        <div className="md:p-4  mt-14">
          <div className="">{children}</div>
        </div>
      </div>

      {/* calling model */}
      {showModel &&
        <div className="relative z-1000">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex  min-h-full items-center justify-center p-4 text-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{callerName} is calling</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">A patient needs your help.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4  py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={handleCallAccepted}
                  >Accept</button>
                  {/* TODO: ALSO CUT CALL FROM CALLER SIDE */}
                  <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto" onClick={() => setShowModel(false)}>Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );


};

export default Layout;
