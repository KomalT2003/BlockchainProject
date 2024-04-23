import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Profile from "../components/Profile";
import GoodDay from "../components/GoodDay";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import axios from "axios";

const user = {
  work: "Neurologist",
  location: "Bottrop, Germany",
  birth: "15-07-03",
  blood: "A+",
  profile: "Doctor",
};

function Doctor({ state, account }) {
  const navigate = useNavigate();
  // const name = localStorage.getItem("name");
  const name = "Komal";

  if (!name) {
    navigate("/login");
  }

  const { contract } = state;
  const [patients, setPatient] = useState([]);
  const [reports, setReports] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const handleClick = () => {
    setIsButtonClicked(true);
  };

  useEffect(() => {
    async function getData() {
      var config = {
        method: "get",
        url: "https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3YzdhZTY1Ny1jZDIxLTQwNzEtYmI1Yy03NjA2M2FjZjI3NWYiLCJlbWFpbCI6InZhbnNoaWthLnNoYWhAc3BpdC5hYy5pbiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhNjE0NTc3NzIxOGVlNzM5YmFkMCIsInNjb3BlZEtleVNlY3JldCI6IjkwMTk3MDgxMGQ1NGIwMGQ5YjA1YWQ4MjM0NjU1NjhmYjNlN2IxZGRlMDQwN2M2MmQzYTYwMTlhZDEyOGFlYmQiLCJpYXQiOjE3MTI5MDIxMDB9.w6LqwH1LJlFDS1ItK7cVR_iLnwvzJjSxveNPra6EsFI",
        },
      };

      const res = await axios(config);
      const array = res.data.rows;

      // console.log(array);

      setReports(array);
    }
    const patientData = async () => {
      const account = document.querySelector("#patientAddress").value;

      try {
        const p = await contract.getPatientData(account);
        const patient = await contract.getAllData(account);
        setPatient(patient);
      } catch (error) {
        toast.error("Access Denied");
      }
    };
    if (isButtonClicked && contract) {
      patientData();
    }
    if (isButtonClicked) {
      getData();
    }
  }, [isButtonClicked, contract]);
  console.log(reports);

  const addAdmin = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const adminAddress = document.querySelector("#adminAddress").value;
    if (!ethers.utils.isAddress(adminAddress)) {
      alert("Invalid Address!");
      return;
    }
    const addAdmin = await contract.addAdmin(adminAddress);
    await addAdmin.wait();
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="bkgrd h-screen flex flex-col p-5">
        <p>{account}</p>
        <div className="flex w-full h-3/6 justify-around items-center">
          <div className="w-3/5 px-5">
            <div className="rounded-xl w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-[250px] px-5 flex flex-col justify-around">
              <GoodDay user={name} />
              <div className="flex items-center">
                <input
                  type="text"
                  className="bg-transparent placeholder-white rounded-md h-12 w-3/5 p-5 border-solid border-2 border-white text-xl"
                  id="adminAddress"
                  placeholder="Enter Admin Address"
                />
                <button
                  className="button mx-5 h-12 text-lg font-bold"
                  type="button"
                  onClick={addAdmin}
                >
                  Admin
                </button>
              </div>
            </div>
          </div>

          <div className="w-2/5  px-5">
            <Profile user={user} name={name} />
          </div>
        </div>

        <div className="w-full h-3/6 px-5 flex justify-around">
          <Slider cards={patients} reports={reports} type="2" />
          <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-[150px] px-5 flex flex-col justify-around m-24">
            <div className="flex items-center">
              <input
                type="text"
                className="bg-transparent placeholder-white rounded-md h-12 w-3/5 p-5 border-solid border-2 border-white text-xl"
                id="patientAddress"
                placeholder="Enter Patient Address"
              />
              <button
                className="button mx-5 h-12 text-lg font-bold"
                type="button"
                onClick={handleClick}
              >
                Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Doctor;
