import { useState } from "react";
import axios from "axios";
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3YzdhZTY1Ny1jZDIxLTQwNzEtYmI1Yy03NjA2M2FjZjI3NWYiLCJlbWFpbCI6InZhbnNoaWthLnNoYWhAc3BpdC5hYy5pbiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhNjE0NTc3NzIxOGVlNzM5YmFkMCIsInNjb3BlZEtleVNlY3JldCI6IjkwMTk3MDgxMGQ1NGIwMGQ5YjA1YWQ4MjM0NjU1NjhmYjNlN2IxZGRlMDQwN2M2MmQzYTYwMTlhZDEyOGFlYmQiLCJpYXQiOjE3MTI5MDIxMDB9.w6LqwH1LJlFDS1ItK7cVR_iLnwvzJjSxveNPra6EsFI`;
const FileUpload = () => {
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

  return (
    <>
      <label class="form-label">Choose File</label>
      <input type="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
};

export default FileUpload;
