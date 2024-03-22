import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

function ClassList() {
  const history = useHistory();
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var data = JSON.stringify({
      name: "IV",
      title: "The Fourth Cycle",
    });

    var config = {
      method: "get",
      url: "http://localhost:5000/getClass",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setClassData(response.data.data)
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClassClick = () => {
    history.push("/classForm");
  };

  return (
    <Container fluid>
      <div className="d-grid p-2" onClick={handleClassClick}>
        <button className="btn btn-lg btn-primary">
          + Add a new Class and Title
        </button>
      </div>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">S.No</th>
                    <th className="border-0">ClassName</th>
                    <th className="border-0">Title</th>
                  </tr>
                </thead>
                <tbody>
                  {classData &&
                    classData.map((classItem, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{classItem.name}</td>
                        <td>{classItem.title}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ClassList;
