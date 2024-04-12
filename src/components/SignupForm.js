import React, { useState } from "react";


import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpForm = ({state,account}) => {

  const navigate = useNavigate()
  // console.log(account)
  

  // if(!account){
  //  toast.error('Connect Wallet') 
  // }

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "male",
    category: "patient",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.success("Logged In");

    localStorage.setItem('name', form.name)
    localStorage.setItem('category',form.category)

    const { contract } = state;
    const person = document.querySelector("#category").value;
    
    if("admin" === person){
      const createAdmin = await contract.createAdmin();
      await createAdmin.wait();
      console.log("Admin Created!");
    } else if("doctor" === person){
      const createDoctor = await contract.createDoctor();
      await createDoctor.wait();
      console.log("Doctor Created!");
    } else {
      console.log("Patient Created!");
    }

    switch (form.category) {
      case "patient":
        navigate("/patient");
        break;
      case "doctor":
        navigate("/doctor");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between bkgrd">
      <h1 className="text-center text-white text-3xl bg-gray-800 py-2 w-full">
        SignUp
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => handleFormFieldChange("name", e)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => handleFormFieldChange("email", e)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => handleFormFieldChange("password", e)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
            Age
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            type="text"
            placeholder="Enter your age"
            value={form.age}
            onChange={(e) => handleFormFieldChange("age", e)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="gender"
            value={form.gender}
            onChange={(e) => handleFormFieldChange("gender", e)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            value={form.category}
            onChange={(e) => handleFormFieldChange("category", e)}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <Link to="/login">
        <button className="text-center text-white pb-5">
          Already have an account?
        </button>
      </Link>
    </div>
  );
};

export default SignUpForm;
