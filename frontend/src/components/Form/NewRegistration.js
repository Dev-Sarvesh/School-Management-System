import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const NewRegistration = () => {
  const history = useHistory();
  const [file, setFile] = useState();
  const [confirmData, setConfirmData] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    birthDate: "",
    gender: "",
    course: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
    file: "",
    role: "USER",
  });

  const {
    fullName,
    address,
    birthDate,
    gender,
    course,
    email,
    password,
    confirmPassword,
    number,
    role,
  } = formData;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirmData) {
      alert("Please confirm your data before submitting.");
      return;
    }
    // Create FormData object
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", fullName);
    formDataToSend.append("address", address);
    formDataToSend.append("birthDate", birthDate);
    formDataToSend.append("course", course);
    formDataToSend.append("email", email);
    formDataToSend.append("file", file);
    formDataToSend.append("gender", gender);
    formDataToSend.append("password", password);
    formDataToSend.append("confirmPassword", confirmPassword);
    formDataToSend.append("number", number);
    formDataToSend.append("role", role);

    if (formData.length == 0) {
      alert("Please fill out all fields");
    } else if (password !== confirmPassword) {
      alert("password not matched");
    } else if (number.length != 10) {
      alert("Enter Correct Contact!! ");
    } else {
      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          body: formDataToSend, 
        });
        if (response.ok) {
          console.log("Registration successful!");
          setFormData({
            fullName: "",
            address: "",
            birthDate: "",
            course: "",
            email: "",
            role: "",
            gender: "",
            password: "",
            confirmPassword: "",
            number: "",
          });
          setFile(null); // Clear the file state
          history.push("/admin/dashboard");
        } else {
          console.error("Failed to register:", response.statusText);
        }
      } catch (error) {
        console.error("Error registering:", error);
      }
    }
  };

  return (
    <div className="container py-5">
      <button
        className="btn btn-primary w-45 px-md-5"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </button>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="mb-5 text-uppercase fw-bold">
                Student/Teacher registration form
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="form-label fs-4 fw-normal"
                  >
                    FullName
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="form-control form-control-lg"
                    value={fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fs-4 fw-normal">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 fw-bolder fs-4">
                  <label className="form-label">Phone No.</label>
                  <input
                    className="form-control form-control-lg"
                    type="number"
                    name="number"
                    value={number}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                  />
                </div>

                <div className="mb-3 fw-bolder fs-4">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                </div>

                <div className="mb-3 fw-bolder fs-4">
                  <label className="form-label">Confirm Password*</label>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    name="confirmPassword"
                    id="exampleInputConfirmPassword1"
                    value={confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="form-select form-select-sm mb-3 ">
                  <select
                    name="gender"
                    aria-label="Default select example"
                    onChange={handleChange}
                  >
                    <option default>Select Your Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="address"
                    className="form-label fs-4 fw-normal"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="form-control form-control-lg"
                    value={address}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="birthDate"
                    className="form-label fs-4 fw-normal"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    className="form-control form-control-lg"
                    value={birthDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fs-3 fw-normal ">
                    Course/Subject
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="course"
                      id="PCM"
                      value="PCM"
                      checked={course === "PCM"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="PCM">
                      PCM
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="course"
                      id="BeezOnSale"
                      value="BeezOnSale"
                      checked={course === "BeezOnSale"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="BeezOnSale">
                      BeezOnSale
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="course"
                      id="finance"
                      value="finance"
                      checked={course === "finance"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="Finance">
                      Finance
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="course"
                      id="IB"
                      value="IB"
                      checked={course === "IB"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="IB">
                      IB
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="avatar" className="form-label">
                    Avatar (jpeg/png file only, max 5MB)
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="confirmData"
                    defaultChecked={confirmData}
                    onChange={() => setConfirmData(!confirmData)}
                  />
                  <label className="custom-control-label" htmlFor="confirmData">
                    Confirm your filled data is correct and ready to be
                    submitted.
                  </label>
                </div>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-warning btn-lg">
                    Submit form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRegistration;
