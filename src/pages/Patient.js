import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar";
import GoodDay from "../components/GoodDay";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const user = {
  work: "Software Engineer",
  location: "Bottrop, Germany",
  birth: "27-07-03",
  blood: "A+",
  profile: "Patient",
};

function Patient({ state, account }) {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  if (!name) {
    navigate("/login");
  }

  const [patients, setPatient] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const patientData = async () => {
      const patient = await contract.getAllData(account[0]);
      setPatient(patient);
    };
    contract && patientData();
  }, [contract]);

  const grantPermission = async (event) => {
    event.preventDefault();
    const doctorAddress = document.querySelector("#doctorAddress").value;
    if (!ethers.utils.isAddress(doctorAddress)) {
      alert("Invalid Address!");
      return;
    }
    const givePermission = await contract.givePermission(doctorAddress);
    await givePermission.wait();

    toast.success("Permission granted");
  };

  const revokePermission = async (event) => {
    event.preventDefault();
    const doctorAddress = document.querySelector("#doctorAddress").value;
    if (!ethers.utils.isAddress(doctorAddress)) {
      alert("Invalid Address!");
      return;
    }
    const RevokePermission = await contract.RevokePermission(doctorAddress);
    await RevokePermission.wait();

    toast.success("Permission granted");
  };

  return (
    <>
      <Navbar />
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
                  placeholder="Enter Doctor Address"
                  id="doctorAddress"
                />
                <button
                  className="button mx-5 h-12 text-lg font-bold"
                  type="button"
                  onClick={grantPermission}
                >
                  Grant
                </button>
                <button
                  className="button mx-5 h-12 text-lg font-bold"
                  type="button"
                  onClick={revokePermission}
                >
                  Revoke
                </button>
              </div>
            </div>
          </div>

          <div className="w-2/5  px-5">
            <Profile user={user} name={name} />
          </div>
        </div>

        <div className="w-full h-3/6 px-5 flex justify-start">
          <Slider cards={patients} type="1" />
        </div>
      </div>
    </>
  );
}

export default Patient;
