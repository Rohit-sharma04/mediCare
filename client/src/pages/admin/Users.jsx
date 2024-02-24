import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
const Users = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
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
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Doctor
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>

            {users?.map((user) => {
              return (
                <tr key={user._id} className="bg-white border-b  hover:bg-gray-50 ">

                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {user.name}
                  </th>
                  <td className="px-6 py-4">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span >
                      {user.isDoctor?'YES':'NO'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                   
                      <button className="p-2 rounded-lg bg-red-5
                      00 text-white bg-red-600 font-semibold hover:bg-red-500">Block</button>
                  </td>
                </tr>)
            })}


          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Users;
