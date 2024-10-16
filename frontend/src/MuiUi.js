import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { json } from 'react-router';
import { useScrollTrigger } from '@mui/material';

const MuiUi = () => {
  // const columns = ["Name", "Company", "City", "State"];
  const columns = [
    {
      name: "id",
      label: "S.No",
    },
    { name: "name"},
    { name: "age"},
    {
      name: "gender",
      label: "Gender",
      options: {
        customBodyRender:(value)=> (
          <p
            className={`capitalize px-3 py-1 bg-blue-500 inLine-block rounded-full
              ${value === "male" ? "bg-blue-500" : "bg-pink-500"}`}
          >
            {value}
          </p>
        ),
      },
    },
  ]

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        let local = data?.users?.map((user) => ({
          ...user,
          name: user?.firstName + " " + user?.lastName,
        }));

        setUsers(local);
      });
  }, []);

  const options = {
    // filterType: 'checkbox',
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30],
  };
  const getMuiTheme = () => createTheme({
    typography: {
      fontFamily:"Poppins"
    },
    palette: {
     background: {
      paper: "#1e293b",
      default:"#0f172a",
     },
     mode: "dark",
    },
    components: {
      MuiTableCell: {
        head: {
          padding: "10px 4px",
        },
        body: {
          padding: "7px 15px",
          color: "#e2e8f8",
        },
      },
    },
  });

  return (
    <div className='bg-slate-700 py-10 min-h-screen grid place-items-center'>
      <div className='w-10/12 max-w-4xl'>
        <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"users List"}
          data={users}
          columns={columns}
          options={options}
        />
        </ThemeProvider>
      </div>
    </div>
  )
}

export default MuiUi
