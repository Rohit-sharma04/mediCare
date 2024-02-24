import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import DoctorList from "../components/DoctorList";
import { message } from "antd";
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [specialization,setSpecialization]=useState("")
  // login user data
  const getDoctorsData = async (firstName = "", lastName = "", specialization = "") => {
    try {

      const res = await axios.post(
        "/api/v1/user/getAllDoctors",
        {
          firstName,
          lastName,
          specialization
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText === "") message.error("Please enter something") 
    console.log(searchText)
    const NewsearchText = searchText.replace(/\s{2,}/g, ' ').trim()

    const indexOfSpace = NewsearchText.indexOf(" ")
    if (indexOfSpace === -1) {
      const firstName1 = NewsearchText.slice(0, NewsearchText.length);
      setFirstName(firstName1)
      setLastName("")
      return getDoctorsData(firstName, lastName)
    }
    const firstName1 = NewsearchText.slice(0, indexOfSpace);
    const lastName1 = NewsearchText.slice(indexOfSpace + 1);
    setFirstName(firstName1)
    setLastName(lastName1)
    getDoctorsData(firstName, lastName)
  }

  const toggleDropdown = () => {
    const dropdown = document.querySelector('#dropdown-menu');
    dropdown.classList.toggle('hidden');
  }

  const handleFilter = (e) => {
    console.log(e.target.outerText)
    let specialization1 = e.target.outerText
    if(specialization1==='All') specialization1='';
    setSpecialization(specialization1)
    getDoctorsData(firstName, lastName, specialization1);
    toggleDropdown()
  }
  useEffect(() => {
    getDoctorsData();
  }, []);

  const medicalSpecializations = [
    "All",
    "Dentistry",
    "Neurology",
    "Dermatology",
    "Cardiology",
    "Radiology",
    "Gynaecology",
    "Psychiatry",
    "Orthopedics",
    "Pediatrics",
    "Oncology",
    "Ophthalmology",
    "Urology",
    "Nephrology",
    "Endocrinology",
    "Gastroenterology",
    "Hematology",
    "Allergy & Immunology",
    "Anesthesiology",
    "Family Medicine",
    "General Surgery",
    "Plastic Surgery",
    "Otolaryngology",
    "Infectious Disease",
    "Emergency Medicine",
    "Neonatology",
  ];

  return (
    <Layout>
      <>
        <div className="flex flex-wrap justify-center items-center ">
          {/* search */}
          <form>
            <div className="container flex justify-center items-center max-w-90 px-4 sm:px-6 lg:px-8 mb-2">
              <div className="relative">

                <input type="search" name="search"
                  value={searchText}
                  className="max-h-12 max-w-80 pr-8 py-3 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search anything..."
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <div className="absolute top-2.5 right-3">
                  <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                </div>
              </div>

              <button className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 " type="submit" onClick={handleSearch}>search</button>
            </div>
          </form>

          {/* dropdown */}
          <div className="relative">
            <div id="dropdown-button" onClick={toggleDropdown} className="flex w-48 cursor-pointer select-none justify-between rounded border border-solid border-gray-400 bg-white px-5 py-2 shadow-md"> 
            {specialization.length ?specialization:"Select"}
              <i className="fa-solid fa-angle-down flex items-center "></i>
            </div>

            <div id="dropdown-menu" className="absolute top-12 mt-2 hidden w-52 rounded border border-gray-300 bg-white shadow-md z-10 max-h-[70vh] overflow-scroll">
              {medicalSpecializations.map((medicalSpecialization) => (
                <div key={medicalSpecialization} className="cursor-pointer px-4 py-3 hover:bg-gray-100" onClick={(e) => handleFilter(e)} value={medicalSpecialization}>{medicalSpecialization}</div>
              ))
              }
            </div>
          </div>
        </div>


        <div className="flex flex-wrap justify-center md:justify-start py-8 ">
          {doctors && doctors.map((doctor) => <DoctorList key={doctor._id} doctor={doctor} />)}
        </div>
      </>
    </Layout>
  );
};

export default HomePage;
