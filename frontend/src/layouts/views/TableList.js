import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import { useHistory } from "react-router-dom";

function TableList() {
  const history = useHistory();
  const [userData, setData] = useState([]);

  useEffect(() => {
    tableData();
  }, []);

  const tableData = () => {
    var data = JSON.stringify({
      fullName: "Robert Tim",
      email: "Tim@gmail.com",
      address: "USA-TX",
      birthDate: "29-07-1993",
      enrolledCourses: "TechBeez",
    });

    var config = {
      method: "get",
      url: "http://localhost:5000/user",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setData(response.data.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const handleRegistration = () => {
    console.log("AddNewTable");
    history.push("/newRegistration");
  };
  console.log("DATA:", userData && userData);

  const deleteUser = (id) => {
    const data = JSON.stringify({
      _id: id,
    });

    const config = {
      method: "post",
      url: `http://localhost:5000/delete/res/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editUser = (id) => {
    history.push(`/edituser/${id}`);
  };

  return (
    <>
      <div style={{ padding: "15px" }}>
        <button
          onClick={handleRegistration}
          type="submit"
          className="btn btn-primary w-45 px-md-5"
        >
          +Add
        </button>
      </div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Student Information</Card.Title>
                <p className="card-category">
                  New Registration Student Listing.
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Address</th>
                      <th className="border-0">DOB</th>
                      <th className="border-0">Course</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Gender</th>


                    </tr>
                  </thead>
                  <tbody>
                    {userData &&
                      userData.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.fullName}</td>
                          <td>{user.email}</td>
                          <td>{user.address}</td>
                          <td>{user.birthDate}</td>
                          <td>{user.course}</td>
                          <td>
                            {user.file && (
                              <img
                                src={user.file}
                                alt="File"
                                style={{
                                  maxWidth: "100px",
                                  maxHeight: "100px",
                                }}
                              />
                            )}
                          </td>
                          <td>{user.gender}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => editUser(user._id)}
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteUser(user._id)}
                              className="btn btn-danger btn-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
