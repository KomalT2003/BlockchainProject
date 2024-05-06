import { React, useEffect, useRef, useState } from "react";
import axios from "axios";
require("dotenv").config();
const BearerToken = process.env.BearerToken;
async function getData() {
  var config = {
    method: "get",
    url: "https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100",
    headers: {
      Authorization: BearerToken,
    },
  };

  const res = await axios(config);
  const array = res.data.rows;

  console.log(array);

  return array;
}

function Getter() {
  const linkRef = useRef(null);
  const [array, setArray] = useState([]);

  const handleClick = () => {
    linkRef.current.click();
  };

  useEffect(() => {
    getData().then((array) => {
      setArray(array);
    });
  }, []);

  return (
    <>
      {array ? (
        array.map((data, index) => (
          <div key={index}>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${data.ipfs_pin_hash}`}
              ref={linkRef}
              style={{ display: "none" }}
              download="file.pdf"
            />
            <button onClick={handleClick}>
              View File {data.metadata.name}
            </button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Getter;
