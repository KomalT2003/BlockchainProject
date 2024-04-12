import { React, useEffect, useRef, useState } from "react";
import axios from "axios";

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
