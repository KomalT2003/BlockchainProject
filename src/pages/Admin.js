import React from "react";
import { useState } from "react";
import Profile from "../components/Profile";
import LineGraph from "../components/LineGraph";
import GoodDay from "../components/GoodDay";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const user = {
  work: "Database Manager",
  location: "Bottrop, Germany",
  birth: "18-07-03",
  blood: "A+",
  profile: "Admin",
};

function Admin({ state }) {
  const navigate = useNavigate();
  // const name = localStorage.getItem("name");
  const name = "Navneet";

  if (!name) {
    navigate("/login");
  }

  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      {show && <Form onClick={onClick} state={state} />}
      <Navbar />
      <div
        className={`bkgrd h-screen flex flex-col p-5 ${
          show ? "filter blur-sm" : ""
        }`}
      >
        <div className="flex w-full h-3/6 justify-around items-center">
          <div className="w-3/5 px-5">
            <div className="rounded-xl w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-[250px] px-5 flex flex-col justify-around items-start">
              <GoodDay user={name} />
              <button
                className="button h-12 w-1/2 text-lg font-bold"
                type="button"
                onClick={onClick}
              >
                Add Patient Data
              </button>
            </div>
          </div>
          <div className="w-2/5  px-5">
            <Profile user={user} name={name} />
          </div>
        </div>
        <div className="w-full h-3/6 px-5">
          <LineGraph />
        </div>
      </div>
    </>
  );
}

export default Admin;
