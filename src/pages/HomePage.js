import React from "react";
import doctor from "../Images/doctors.png";
import connect from "../Images/connect.png";
import records from "../Images/records.png";
import medi from "../Images/medi.png";
import insurance from "../Images/insurance.png";
import family from "../Images/family.png";
import Card from "../components/Card";
import Header from "../components/Header";

function HomePage() {
  return (
    <div>
      <Header />
      <div className="h-screen w-[100%] flex bkgrd">
        <div className="logo w-1/3 h-full flex justify-center items-center">
          <img className="w-5/6" src={doctor} alt="doctors" />
        </div>
        <div className="w-2/3 h-full flex flex-col justify-center items-center">
          <p className="text-5xl px-10 leading-normal mb-5">
            A <span className="text-blue-800">decentralised platform</span> that
            enables secure, fast and transparent exchange
          </p>
          <img className="h-1/4" src={connect} alt="connection" />
        </div>
      </div>
      <div className="h-screen w-[100%] flex flex-col bkgrd">
        <h1 className="text-5xl text-white h-1/5 my-10 text-center py-10">
          <span className="text-cyan-600">EFficiencies</span> in every aspect of
          healthcare
        </h1>
        <div className="flex h-4/5 text-3xl items-center">
          <Card type="3" img={records} title="Medical Records" />
          <Card type="3" img={medi} title="Supply Chain" />
          <Card type="3" img={insurance} title="Medical Insurance" />
        </div>
      </div>
      <div className="h-screen w-[100%] flex flex-col bkgrd">
        <h1 className="text-5xl text-white h-1/5 my-10 text-center py-10">
          Our <span className="text-cyan-600">Technology</span> In Action
        </h1>
        <div className="flex justify-around">
          <div className="w-2/4 flex justify-center items-center">
            <ul className="bg-cyan-900 rounded-lg list-disc list-inside text-white text-4xl w-4/5 h-4/5 p-10">
              <li>No need to carry files</li>
              <li>Easy to track disease</li>
              <li>Doctors Analysis</li>
              <li>No loss of data</li>
              <li>Claims for Insurance</li>
            </ul>
          </div>
          <img className="w-1/4" src={family} alt="family" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
