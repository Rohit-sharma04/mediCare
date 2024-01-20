import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import userAvatar from "../assets/userAvatar.jpg";

// client\src\assets\userAvatar.jpg
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "Update Profile",
      path: `/doctor/updateProfile/${user?._id}`,
      icon: "fa-solid fa-file-pen",
    },
  ];
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
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <Link to={'/'} className="flex ms-2 md:me-24">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">DocApp</span>
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
                        {user && user.notification.length }
                        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full" ></div>
                      </div>
                    </div>
                    <Link to="/profile">{user?.name}</Link>
                  </div>
                  <div>

                    {/* dropdown button */}
                    <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full"
                       src={`${user?.profilePic ? user?.profilePic:userAvatar}`} 
                       alt="user photo" />
                    </button>
                  </div>

                  {/* dropdown */}
                  <div className="z-50 my-4 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700" id="dropdown-user">
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900 dark:text-white" role="none">Neil Sims</p>
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-300" role="none">neil.sims@flowbite.com</p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar" aria-labelledby="logo-sidebar">
        <div className="h-full px-3 pt-2 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">

            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path; //current position in menu
              return (
                <li key={menu.name} className={`${isActive && "rounded-lg bg-gray-100 text-gray-900"}`}>
                  <Link to={menu.path} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <i className={`${menu.icon} w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400  group-hover:text-gray-900 dark:group-hover:text-white `}
                    ></i>
                    <span className="ms-3">{menu.name}</span>
                  </Link>
                </li>

              );
            })}
            <li onClick={handleLogout}>
              <Link to="/login" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <i className="fa-solid fa-right-from-bracket  w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">Logout</span>
              </Link>
            </li>

          </ul>
        </div>
      </aside>

      {/* content  */}
      <div className="md:p-4  sm:ml-64">
        <div className="md:p-4  mt-14">
          <div className="">{children}</div>
        </div>
      </div>


    </>
  );


};

export default Layout;
