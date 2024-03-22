import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Student() {
  const history = useHistory();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const handleButtonSubmission = (id) => {
    history.push(`/admin/studentDetails/${id}`);
  };

  useEffect(() => {
    fetchData();
    fetchTeacher();
  }, []);

  const fetchTeacher = () => {
    axios
      .get("http://localhost:5000/teacherDetails")
      .then((response) => {
        setTeachers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  };

  const fetchData = () => {
    axios
      .get("http://localhost:5000/allStudents")
      .then((response) => {
        console.log("Thisis FetchData con:", response.data.data);
        setStudents(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  console.log("Students From Student.js:", students);
  console.log("Teachers From Student.js:", teachers);

  const handleClassClick = () => {
    history.push("/addStudent");
  };

  return (
    <>
      <div className="d-grid p-2">
        <span onClick={handleClassClick}>
          <button className="btn btn-lg bg-primary text-white  w-45">
            + New Student
          </button>
        </span>
      </div>

      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">S.No</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Father Name</th>
                      <th className="border-0">Age</th>
                      <th className="border-0">Class</th>
                      <th className="border-0">Subject</th>
                      <th className="border-0">Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => {
                      const teacher = teachers.find(
                        (teacher) => teacher.classId === student.classId
                      );
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{student.StudentResult.name}</td>
                          <td>{student.StudentResult.fatherName}</td>
                          <td>{student.StudentResult.age}</td>
                          <td>{student.ClassResult.name}</td>
                          <td>{student.SubjectResult.name}</td>
                          <td>{teacher ? teacher.TeacherResult.name : ""}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-info bg-info text-white"
                              onClick={() =>
                                handleButtonSubmission(student._id)
                              }
                            >
                              Info
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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

export default Student;
