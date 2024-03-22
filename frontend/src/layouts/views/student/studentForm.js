import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

function StudentForm() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [age, setAge] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getClass", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setClasses(response.data.data);
      // console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
    
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getSub", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSubjects(response.data.data);
      // console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (value, selectedValues, setSelectedValues) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/addStudent", {
        name,
        fatherName,
        age,
        Class: selectedClasses.join(","),
        subject: selectedSubjects.join(","),
      });
      // console.log("Res from Student form 67",response.data);
      setName("");
      setFatherName("");
      setAge("");
      setSelectedClasses([]);
      history.push("/admin/student");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fatherName" className="form-label">
            Father's Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fatherName"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Classes</label>
          <div style={{ display: "flex" }}>
            {classes &&
              classes.map((cls) => (
                <div
                  key={cls._id}
                  className="custom-control custom-checkbox mr-3"
                >
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={cls._id}
                    value={cls.name}
                    checked={selectedClasses.includes(cls.name)}
                    onChange={() =>
                      handleCheckboxChange(
                        cls.name,
                        selectedClasses,
                        setSelectedClasses
                      )
                    }
                  />
                  <label className="custom-control-label" htmlFor={cls._id}>
                    {" "}
                    {cls.name}
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Subjects</label>
          <div style={{ display: "flex" }}>
            {subjects.map((subject) => (
              <div
                key={subject._id}
                className="custom-control custom-checkbox mr-3"
              >
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={subject._id}
                  value={subject.name}
                  checked={selectedSubjects.includes(subject.name)}
                  onChange={() =>
                    handleCheckboxChange(
                      subject.name,
                      selectedSubjects,
                      setSelectedSubjects
                    )
                  }
                />
                <label className="custom-control-label" htmlFor={subject._id}>
                  {subject.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary bg-primary text-white  w-45 ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
