import React from "react";

function Card(props) {
  const {type,card} = props;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString();
    // const formattedTime = date.toLocaleTimeString();
    return `${formattedDate}`;
  };

  if (type === "1") {
    // Patient
    return (
      <div
        content={`Doctor Name: ${card.docName}\n Date: ${formatTimestamp(String(card.timestamp))} `}
        className="card flex flex-col hover:after:content-[attr(content)] hover:after:text-sm"
      >
      <p className="text-xl">Diagnosis</p>
        <p className="text-sm mb-5">{card.diagnosis}</p>
      <p className="text-xl">Treatment</p>

        <p className="text-sm">{card.treatment}</p>
        
      </div>
    );
  } else if (type === "2") {
    // Doctor
    return (
      <div
        content={`Doctor Name: ${card.docName}\n Date: ${formatTimestamp(String(card.timestamp))} `}
        className="card flex flex-col hover:after:content-[attr(content)] hover:after:text-sm"
      >
      <p className="text-xl">Diagnosis</p>
        <p className="text-sm mb-5">{card.diagnosis}</p>
      <p className="text-xl">Treatment</p>

        <p className="text-sm">{card.treatment}</p>
        
      </div>
    );
  } else if (type === "3") {
    // Home
    return (
      <div className="flex flex-col items-center">
        <img src={props.img} alt="records" className="w-1/2" />
        <p className="text-white mt-5">{props.title}</p>
      </div>
    );
  }
}

export default Card;
