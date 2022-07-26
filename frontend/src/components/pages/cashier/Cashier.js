import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Card, Modal } from "react-bootstrap";
import { listMenu } from "../../functions/menu";

import { listMenuSection } from "../../functions/menusection";

const Cashier = () => {
  // Initial Variable
  // Data Fetch Variable
  const [dataListMenuSection, setDataListMenuSection] = useState([]);
  const [dataListMenuShow, setDataListMenuShow] = useState([]);
  const [dataListMenu, setDataListMenu] = useState([]);
  const [dataSelectedMenu, setDataSelectedMenu] = useState([]);
  // Modal
  const [show, setShow] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    // setDataModal({ menuName: menuName, menuId: menuId });
    setShow(true);
  };

  console.log(dataListMenuSection);

  // useEffect Action
  useEffect(() => {
    loadDataMenuSection();
    loadDataMenu();
  }, []);

  // Fetch Data
  const loadDataMenuSection = () => {
    listMenuSection()
      .then((res) => {
        setDataListMenuSection(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const loadDataMenu = () => {
    listMenu()
      .then((res) => {
        setDataListMenu(res.data);
        setDataListMenuShow(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  //Handling Event
  const handleClickSort = (data) => {
    setDataListMenuShow(dataListMenu);
    setDataListMenuShow((dataCurrent) =>
      dataCurrent.filter((listMenu) => {
        return listMenu.menuSection === data;
      })
    );
  };

  const handleClickMenuName = (data) => {
    setDataSelectedMenu((prev) => [...prev, { menuName: data, menuId: data }]);
  };

  const handleClickShowList = () => {
    setDataListMenuShow(dataListMenu);
  };

  return (
    <div>
      <Container fluid={true}>
        <Row>
          <Col md={8} className="mt-2">
            <Row>
              <Col>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleClickShowList()}
                >
                  แสดงทั้งหมด add data
                </Button>
                {"   "}
                {dataListMenuSection.map((item, index) => (
                  <>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => handleClickSort(item._id)}
                    >
                      {item.menuSectionName}
                    </Button>
                    {"   "}
                  </>
                ))}
              </Col>
            </Row>
            <Row className="mt-2">
              {dataListMenuShow.map((item, index) => (
                <Col md={2}>
                  <Card
                    onClick={() => handleShow()}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Img
                      variant="top"
                      src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18230cc1913%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18230cc1913%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.53973770141602%22%20y%3D%2297.50013675689698%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                    />
                    <Card.Body className="m-auto">
                      <Card.Title> {item.menuName} </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col className="mt-2" md={4}>
            <Card border="secondary" key={"Light"}>
              <Card.Header>สรุปบิล</Card.Header>
              <Card.Body>
                <Card.Title> รายการอาหาร </Card.Title>
                {Object.keys(dataSelectedMenu).length === 0 ? (
                  <Card.Text>ไม่มีรายการ</Card.Text>
                ) : (
                  ""
                )}
                {dataSelectedMenu.map((item, index) => (
                  <Card.Text>
                    <Row>
                      <Col> {item.menuName} </Col>
                      <Col className="align-items-end"> จำนวน 1 2 3 </Col>
                    </Row>
                  </Card.Text>
                ))}

                <Card.Title> สรุปรายการ </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Modal */}
      
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      
    </div>
  );
};

export default Cashier;
