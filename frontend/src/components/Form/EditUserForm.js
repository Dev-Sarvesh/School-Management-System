import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function EditUserForm(props) {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [file, setFile] = useState(null);
  const [confirmData, setConfirmData] = useState(false);
  const { id } = props.match.params;

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  const fetchUserData = async (id) => {
    await axios
      .get(`http://localhost:5000/data/${id}`)
      .then(function (response) {
        setUserData(response.data);
        setFile(response.data.file);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("value", value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    setFile(file);
    console.log("FILE", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirmData) {
      alert("Please confirm your data before submitting.");
      return;
    }

    var data = JSON.stringify(userData);
    console.log("DATA from FEE", data);
    var config = {
      method: "post",
      url: "http://localhost:5000/edit",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Profile Updated Successfully");
        history.push("/admin/table");
      })
      .catch(function (error) {
        console.log(error);
      });
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
                    value={userData.fullName || ""}
                    onChange={handleInputChange}
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
                    value={userData.email || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fs-4 fw-normal">Gender</label>
                  <div className="form-select form-select-sm mb-3 ">
                    <select
                      name="gender"
                      aria-label="Select Your Gender"
                      className="form-select"
                      value={userData.gender || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Your Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
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
                    value={userData.address || ""}
                    onChange={handleInputChange}
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
                    value={userData.birthDate || ""}
                    onChange={handleInputChange}
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
                      checked={userData.course === "PCM"}
                      onChange={handleInputChange}
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
                      checked={userData.course === "BeezOnSale"}
                      onChange={handleInputChange}
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
                      checked={userData.course === "finance"}
                      onChange={handleInputChange}
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
                      checked={userData.course === "IB"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="IB">
                      IB
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload File</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                  {userData.file && (
                    <p>
                      Previous File:
                      <a href={userData.file} download>
                        {userData.file}
                      </a>
                    </p>
                  )}
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
                  <button type="submit" className="btn btn-success btn-lg">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserForm;
