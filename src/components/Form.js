import { ethers } from "ethers";
import React, { useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3YzdhZTY1Ny1jZDIxLTQwNzEtYmI1Yy03NjA2M2FjZjI3NWYiLCJlbWFpbCI6InZhbnNoaWthLnNoYWhAc3BpdC5hYy5pbiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhNjE0NTc3NzIxOGVlNzM5YmFkMCIsInNjb3BlZEtleVNlY3JldCI6IjkwMTk3MDgxMGQ1NGIwMGQ5YjA1YWQ4MjM0NjU1NjhmYjNlN2IxZGRlMDQwN2M2MmQzYTYwMTlhZDEyOGFlYmQiLCJpYXQiOjE3MTI5MDIxMDB9.w6LqwH1LJlFDS1ItK7cVR_iLnwvzJjSxveNPra6EsFI`;

function Form(props) {
  const [form, setForm] = useState({
    patientAddress: "",
    diagnosis: "",
    treatment: "",
    docname: "",
    doctorAddress: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const file_info = {
    name: "OS Exp7.pdf",
    lastModified: 1682348132272,
    lastModifiedDate: "Mon Apr 24 2023 20:25:32 GMT+0530 (India Standard Time)",
    webkitRelativePath: "",
    size: 194023,
  };
  const [selectedFile, setSelectedFile] = useState(file_info);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: selectedFile.name,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addData = async (event) => {
    event.preventDefault();
    const { contract } = props.state;

    try {
      const addPatientData = await contract.addPatientData(
        ethers.utils.getAddress(form.patientAddress),
        form.diagnosis,
        form.treatment,
        form.docname,
        ethers.utils.getAddress(form.doctorAddress)
      );
      const tx = await addPatientData.wait();

      await handleSubmission();

      // console.log(`Transaction confirmed: ${tx.transactionHash}`);
      toast.success("Transaction Successful");
      props.onClick();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md p-6 w-1/2 absolute z-50 left-1/4 right-1/4 top-1/4">
      <h2 className="text-lg font-medium mb-4">Enter Details</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="patientAddress" className="block font-medium mb-2">
            Patient Address
          </label>
          <input
            type="text"
            id="patientAddress"
            value={form.patientAddress}
            onChange={(e) => handleFormFieldChange("patientAddress", e)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="diagnosis" className="block font-medium mb-2">
            Diagnosis
          </label>
          <input
            type="text"
            id="diagnosis"
            value={form.diagnosis}
            onChange={(e) => handleFormFieldChange("diagnosis", e)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="treatment" className="block font-medium mb-2">
            Treatment
          </label>
          <input
            type="text"
            id="treatment"
            value={form.treatment}
            onChange={(e) => handleFormFieldChange("treatment", e)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="docname" className="block font-medium mb-2">
            Doctor Name
          </label>
          <input
            type="text"
            id="docname"
            value={form.docname}
            onChange={(e) => handleFormFieldChange("docname", e)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="doctorAddress" className="block font-medium mb-2">
            Doctor Address
          </label>
          <input
            type="text"
            id="doctorAddress"
            value={form.doctorAddress}
            onChange={(e) => handleFormFieldChange("doctorAddress", e)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="filename" className="block font-medium mb-2">
            Filename
          </label>
          <input
            type="file"
            id="filename"
            onChange={changeHandler}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={addData}
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            className="ml-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
            onClick={props.onClick}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
