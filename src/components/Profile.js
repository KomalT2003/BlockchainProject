import React from "react";

function Profile(props) {
  const r = Math.floor(Math.random() * 20);

  return (
    <div className="rounded-xl bg-blue-500  h-[300px] text-white flex flex-col justify-around bg-opacity-100 transition-all ease-out duration-500">
      <div className="flex justify-between ml-10 mt-8 h-3/5">
        {/* <img className="rounded-lg" src={`https://xsgames.co/randomusers/assets/avatars/male/${r}.jpg`} alt="Hello" /> */}
        <div className=" flex flex-col ">
          <p className="text-4xl uppercase">{props.name}</p>
          <li className="text-3xl  mt-3">{props.user.work}</li>
          <li className="text-3xl mt-4">{props.user.location}</li>
        </div>
      </div>
      <div className="flex h-1/5 justify-around">
        <div>
          <p className="font-semibold text-xl uppercase">Date Birth</p>
          <p className="text-xl text-center">{props.user.birth}</p>
        </div>
        <div>
          <p className="font-semibold text-xl uppercase">Blood Group</p>
          <p className="text-xl text-center">{props.user.blood}</p>
        </div>
        <div>
          <p className="font-semibold text-xl uppercase">profile type</p>
          <p className="text-xl text-center">{props.user.profile}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
