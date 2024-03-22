import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Subjects() {
  const history = useHistory();
  const [tableData, setTableData] = useState([]);

  const buttonClick = () => {
    history.push("/addSubject");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var data = JSON.stringify({
      name: "BioLogy",
      title: "The Human Cycle",
    });

    var config = {
      method: "get",
      url: "http://localhost:5000/getSub",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setTableData(response.data.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log("TableData",tableData)

  return (
    <>
      <Container fluid>
        <div className="d-grid p-2" onClick={buttonClick}>
          <button className="btn btn-lg btn-primary">
            + Add a new subject
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
                      <th className="border-0">Name</th>
                      <th className="border-0">Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData &&
                      tableData.map((sub, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{sub.name}</td>
                          <td>{sub.title}</td>
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

export default Subjects;
