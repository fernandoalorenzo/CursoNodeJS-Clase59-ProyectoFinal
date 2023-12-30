/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { UsersTable } from "../components/users/UsersTable";

export default function Users () {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/users");
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log(data.data);
//       setUsers(data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
		<>
      {/* <div className="container container-fluid w-75">
        <div className="row">
          
          <h1 className="text-center">Lista de Usuarios</h1>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <Link
            className="btn btn-primary align-self-end"
            to="/users/create">
            <i className="fa-regular fa-square-plus"></i>
          </Link>
        </div>
        <div className="row">
          <UsersTable users={users} />
        </div>
			</div> */}
      <UsersTable />
		</>
  );
}

