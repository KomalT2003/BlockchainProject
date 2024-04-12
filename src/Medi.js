const axios = require("axios");

const options = {
  method: "GET",
  url: "https://chemists-pharmacy-and-drugstores-of-india.p.rapidapi.com/doctors/1",
  headers: {
    "content-type": "application/octet-stream",
    "X-RapidAPI-Key": "06ad6eaf8dmsh1dadc89c2dd0e3fp1fbdedjsn28c77c1abd9e",
    "X-RapidAPI-Host":
      "chemists-pharmacy-and-drugstores-of-india.p.rapidapi.com",
  },
};

const Medi = async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

Medi();
