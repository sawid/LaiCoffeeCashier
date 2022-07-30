import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import InputSpinner from "react-bootstrap-input-spinner";
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
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({ menuName: "", menuId: "" });
  const [dataModalDelete, setDataModalDelete] = useState({
    menuName: "",
    menuId: "",
  });
  const [numberMenu, setNumberMenu] = useState(1);

  // Temporary Data
  const [dataMenuMemo, setDataMenuMemo] = useState({ menuMemo: "" });

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (menuName, menuId) => {
    setDataModal({ menuName: menuName, menuId: menuId });
    setShow(true);
    // console.log(dataModal);
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  const handleShowModalDelete = (menuName, menuId) => {
    setDataModalDelete({ menuName: menuName, menuId: menuId });
    setShowModalDelete(true);
  };

  // console.log(dataListMenuSection);

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
  //OnClick Event
  const handleClickSort = (data) => {
    setDataListMenuShow(dataListMenu);
    setDataListMenuShow((dataCurrent) =>
      dataCurrent.filter((listMenu) => {
        return listMenu.menuSection === data;
      })
    );
  };

  const handleClickMenuAddSelect = (menuName, menuId, numberMenu, menuMemo) => {
    if (
      dataSelectedMenu.find((element) => {
        return element.menuId === menuId;
      })
    ) {
      const newState = dataSelectedMenu.map((item) => {
        if (item.menuId === menuId) {
          var totalNumberMenu = item.menuAmount + numberMenu;
          return { ...item, menuAmount: totalNumberMenu };
        }
        return item;
      });
      setDataSelectedMenu(newState);
    } else {
      setDataSelectedMenu((prev) => [
        ...prev,
        {
          menuName: menuName,
          menuId: menuId,
          menuAmount: numberMenu,
          menuMemo: menuMemo,
        },
      ]);
    }
    setShow(false);
    setNumberMenu(1);
    setDataMenuMemo({ menuMemo: "" })
  };

  const handleClickShowList = () => {
    setDataListMenuShow(dataListMenu);
  };

  const handleRemoveSelectedMenu = (menuId) => {
    const newStateRemove = dataSelectedMenu.filter(
      (item) => item.menuId !== menuId
    );
    setDataSelectedMenu(newStateRemove);
    setShowModalDelete(false);
  };

  //onChange Event
  const handleChangeInputMenuMemo = (e) => {
    setDataMenuMemo({ ...dataMenuMemo, [e.target.name]: e.target.value });
  };
  console.log(dataMenuMemo);
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
                  แสดงทั้งหมด
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
                    onClick={() => handleShow(item.menuName, item._id)}
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
                      <Col md={4}>
                        <Col>{item.menuName}</Col>
                        {item.menuMemo.length === 0 ? 
                        <React.Fragment></React.Fragment> : <Col className="text-warning"> * {item.menuMemo}</Col>
                      }
                        
                      </Col>
                      <Col className="align-items-end">
                        {" "}
                        จำนวน {item.menuAmount}{" "}
                      </Col>
                      <Col md={3} className="text-right">
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            handleShowModalDelete(item.menuName, item.menuId)
                          }
                        >
                          <BsFillTrashFill /> ลบเมนู
                        </Button>
                      </Col>
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

      <Modal className="font-sarabun" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>เพิ่มรายการ {dataModal.menuName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>จำนวน</Form.Label>
          <InputSpinner
            type={"real"}
            precision={0}
            max={10}
            min={1}
            step={1}
            value={numberMenu}
            onChange={(num) => setNumberMenu(num)}
            variant={"dark"}
            size="md"
          />
          <Form className="mt-2">
            <Form.Group>
              <Form.Label>หมายเหตุ</Form.Label>
              <Form.Control
                name="menuMemo"
                size="md"
                type="text"
                placeholder="รายละเอียด"
                onChange={(e) => handleChangeInputMenuMemo(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleClickMenuAddSelect(
                dataModal.menuName,
                dataModal.menuId,
                numberMenu,
                dataMenuMemo.menuMemo
              )
            }
          >
            เพิ่มเมนู
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="font-sarabun"
        show={showModalDelete}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>ลบรายการ {dataModalDelete.menuName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>ยืนยันการลบเมนู</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalDelete()}>
            ปิด
          </Button>
          <Button
            variant="danger"
            onClick={() => handleRemoveSelectedMenu(dataModalDelete.menuId)}
          >
            ลบเมนู
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cashier;
