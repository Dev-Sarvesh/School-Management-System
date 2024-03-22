import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SubjectForm() {
  const history = useHistory();
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");

  const onInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "subject":
        setSubject(value);
        break;

      case "title":
        setTitle(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/addSubject", {
        name: subject,
        title: title,
      });
      console.log(response.data);
      setSubject("");
      setTitle("");
      history.push("/admin/subjects");
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Subject Details</h1>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          name="subject"
                          placeholder="Subject Name"
                          value={subject}
                          onChange={onInputChange}
                        />
                      </div>

                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Title</span>
                        </div>
                        <textarea
                          className="form-control blockquote"
                          aria-label="With textarea"
                          name="title"
                          value={title}
                          onChange={onInputChange}
                        ></textarea>
                      </div>

                      <div className="d-grid gap-2 mt-3">
                        <button
                          type="submit"
                          className="btn btn-lg btn-primary"
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SubjectForm;
