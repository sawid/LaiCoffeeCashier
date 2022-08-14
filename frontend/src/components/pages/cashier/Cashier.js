import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Card,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import InputSpinner from "react-bootstrap-input-spinner";
import { listMenu } from "../../functions/menu";

import { listMenuSection } from "../../functions/menusection";
import { listMenuOption, listMenuOptionChoice } from "../../functions/menuoption";

const Cashier = () => {
  // Initial Variable
  // Data Fetch Variable
  const [dataListMenuSection, setDataListMenuSection] = useState([]);
  const [dataListMenuOption, setDataListMenuOption] = useState([]);
  const [dataListMenuShow, setDataListMenuShow] = useState([]);
  const [dataListMenu, setDataListMenu] = useState([]);
  const [dataListMenuOptionChoice, setDataListMenuOptionChoice] = useState([]);
  // Data On Page
  const [dataSelectedMenu, setDataSelectedMenu] = useState([]);
  const [dataSelectedMenuOption, setDataSelectedMenuOption] = useState([]);
  const [dataTotalPrice, setDataTotalPrice] = useState([]);
  const [dataListMenuOptionPrice, setDataListMenuOptionPrice] = useState([]);
  // Gobal Variable
  var totalBillPrice = 0
  // Modal
  const [show, setShow] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({ menuName: "", menuId: "", menuOption: [] });
  const [dataModalDelete, setDataModalDelete] = useState({
    menuName: "",
    menuId: "",
  });
  const [numberMenu, setNumberMenu] = useState(1);

  // Temporary Data
  const [dataMenuMemo, setDataMenuMemo] = useState({ menuMemo: "" });

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

  const loadDataMenuOption = () => {
    listMenuOption()
      .then((res) => {
        setDataListMenuOption(res.data);
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

  const loadDataMenuOptionChoice = () => {
    listMenuOptionChoice()
      .then((res) => {
        setDataListMenuOptionChoice(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // useEffect Action
  useEffect(() => {
    loadDataMenuSection();
    loadDataMenuOption();
    loadDataMenu();
    loadDataMenuOptionChoice();
  }, []);

  // Modal Action
  const handleClose = (menuOption) => {
    setDataSelectedMenuOption(menuOption.map(item => {
      const queryMenuTypeAddSelect = dataListMenuOption.filter((element) => {
        if (element._id === item) {
          return element.menuType
        }
      })
      if (queryMenuTypeAddSelect[0].menuType === 1) {
        return { checkedId: item, checkedStatus: false, checkedText: "" }
      }
      else {
        return { checkedId: item, checkedStatus: false, checkedText: [] }
      }
    }))
    setShow(false);
  };

  const handleShow = (menuName, menuId, menuOption) => {
    setDataModal({ menuName: menuName, menuId: menuId, menuOption: menuOption });
    setDataSelectedMenuOption(menuOption.map(item => {
      const queryMenuType = dataListMenuOption.filter((element) => {
        if (element._id === item) {
          return element.menuType
        }
      })
      
      console.log(dataListMenuOptionChoice)
      if (queryMenuType[0].menuType === 1) {
        return { checkedId: item, checkedStatus: false, checkedText: "" }
      }
      else {
        return { checkedId: item, checkedStatus: false, checkedText: [] }
      }
    }))
    setShow(true);

    // console.log(dataModal);
  };

  // console.log(dataSelectedMenuOption)

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  const handleShowModalDelete = (menuName, menuId) => {
    setDataModalDelete({ menuName: menuName, menuId: menuId });
    setShowModalDelete(true);
  };

  // console.log(dataListMenuSection);

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

  const handleClickMenuAddSelect = (menuName, menuId, numberMenu, menuMemo, menuOption) => {
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
      const tempListMenuPrice = dataListMenu.filter((element) => {
        if (element._id === menuId) {
          return element.menuPrice
        }
      })
      var dataSelected = []
      dataSelectedMenuOption.map(item => {
        menuOption.map(itemOption => {
          if (item.checkedId === itemOption) {
            dataSelected = [...dataSelected, item.checkedText]
          }
        })
      })
      var tempDataPrice = []
      dataSelected.forEach((tempDataSelected) => {
        if (Array.isArray(tempDataSelected)) {
          tempDataSelected.map((tempOfTempDataSelected) => {
            tempDataPrice.push(tempOfTempDataSelected)
          })
        }
        else {
          tempDataPrice.push(tempDataSelected)
        }
        
      })
      let tempPrice = 0
      tempDataPrice.map((tempData) => {
        tempPrice += (dataListMenuOptionChoice.find(temp => temp.menuOptionChoiceName === tempData)).menuOptionChoicePrice
      })
      console.log(tempPrice)
      console.log(tempListMenuPrice[0].menuPrice)
      setDataSelectedMenu((prev) => [
        ...prev,
        {
          menuName: menuName,
          menuId: menuId,
          menuAmount: numberMenu,
          menuMemo: menuMemo,
          menuOption: dataSelected,
          menuPrice: tempListMenuPrice[0].menuPrice,
          menuTotalPrice: tempListMenuPrice[0].menuPrice + tempPrice,
        },
      ]);
    }
    setShow(false);
    setNumberMenu(1);
    setDataMenuMemo({ menuMemo: "" });

    setDataSelectedMenuOption(menuOption.map(item => {
      const queryMenuTypeAddSelect = dataListMenuOption.filter((element) => {
        if (element._id === item) {
          return element.menuType
        }
      })
      if (queryMenuTypeAddSelect[0].menuType === 1) {
        return { checkedId: item, checkedStatus: false, checkedText: "" }
      }
      else {
        return { checkedId: item, checkedStatus: false, checkedText: [] }
      }
    }))
  };

  // console.log(dataSelectedMenu)
  // console.log("meuo Option", dataSelectedMenuOption)

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

  const handleChangeUpdateSelectedOption = (menuOptionId, menuOptionType, menuOptionName) => {
    // console.log(menuOptionId, menuOptionType, menuOptionName);
    const setNewStateData = dataSelectedMenuOption.map(item => {
      if (item.checkedId === menuOptionId) {
        if (menuOptionType === 1) {
          if (menuOptionName === item.checkedText) {
            return { ...item, checkedText: "" }
          }
          else if (item.checkedText === "") {
            return { ...item, checkedText: menuOptionName }
          }
          else if (menuOptionName !== item.checkedText) {
            return { ...item, checkedText: menuOptionName }
          }
        }
        else if (menuOptionType === 2) {
          var tempArray = item.checkedText
          if (tempArray.length === 0) {
            var newTempArray = [...tempArray, menuOptionName]
            return { ...item, checkedText: newTempArray }
          }
          else if (tempArray.includes(menuOptionName)) {
            var newTempArray = tempArray.filter(item =>
              item !== menuOptionName
            )
            return { ...item, checkedText: newTempArray }
          }
          else {
            var newTempArray = [...tempArray, menuOptionName]
            return { ...item, checkedText: newTempArray }
          }
        }
      }
      return item
    })
    setDataSelectedMenuOption(setNewStateData)
    // setDataSelectedMenuOption(currentItem => {
    // currentItem.map(itemOption => {
    // if (itemOption.checkedId === querySearchUpdateSelectedOption.checkedId) {
    // return { ...itemOption, checkedId: menuOptionName }
    // }
    // return itemOption
    // })
    // })
  }

  const handleUncheckedRadioButton = (checkedId, menuOptionName) => {
    var datalog = false
    dataSelectedMenuOption.map(item => {
      if (item.checkedId === checkedId) {
        if (item.checkedText === menuOptionName) {
          datalog = true
        }
        else {
          datalog = false
        }
      }
    })
    return datalog
  }

  const handleCheckedCheckBox = (checkedId, menuOptionName) => {
    var datalog = false
    dataSelectedMenuOption.map(item => {
      if (item.checkedId === checkedId) {
        if (item.checkedText.includes(menuOptionName)) {
          datalog = true
        }
        else {
          datalog = false
        }
      }
    })
    return datalog
  }

  // console.log(dataSelectedMenuOption)
  // console.log(dataSelectedMenu)
  // console.log(dataMenuMemo);
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
                    onClick={() => handleShow(item.menuName, item._id, item.menuOption)}
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
                        <Col><Badge bg="info">{item.menuAmount}x</Badge> {item.menuName} - {item.menuPrice}</Col>
                        {item.menuOption.map((itemOption, index) => (<>{
                          Array.isArray(itemOption) ? <>{
                            itemOption.map(itemOptionChoice => {
                              return (<Col className="text-secondary">+ {itemOptionChoice} {
                                dataListMenuOptionChoice.map(item => (<>{item.menuOptionChoiceName === itemOptionChoice ? <> - {item.menuOptionChoicePrice}</> : ""}</>))
                              } </Col>)
                            })
                          }</>
                            : <Col className="text-secondary">{itemOption !== "" ? <React.Fragment>+ {itemOption}</React.Fragment> : <React.Fragment></React.Fragment>} {
                              dataListMenuOptionChoice.map(item => (<>{item.menuOptionChoiceName === itemOption ? <> - {item.menuOptionChoicePrice}</> : ""}</>))
                            }</Col>
                        }</>))}
                        {item.menuMemo.length === 0 ? (
                          <React.Fragment></React.Fragment>
                        ) : (
                          <Col className="text-warning"> * {item.menuMemo}</Col>
                        )}

                      </Col>
                      <Col className="align-items-end">
                        {" "}
                        ราคา {item.menuAmount}{" x "} { item.menuTotalPrice } รวม <Badge bg="primary"> { item.menuAmount * item.menuTotalPrice } </Badge> บาท
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
                <Card.Text> ราคาสุทธิ <Badge bg="success">{totalBillPrice}</Badge> บาท</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Modal */}

      <Modal className="font-sarabun" show={show} onHide={() => handleClose(dataModal.menuOption)}>
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
          {
            dataSelectedMenuOption.map(item => {
              const querydata = dataListMenuOption.find(element => {
                if (item.checkedId === element._id) {
                  return element
                }
              })
              return <Form className="mt-2">
                <Form.Group>
                  <Form.Label>เลือก {querydata.menuOptionName}</Form.Label>
                  {
                    querydata.menuOptionChoice.map((element, index) => (
                      <Form.Check
                        type={querydata.menuType === 2 ? "checkbox" : "radio"}
                        id={element._id}
                        name={querydata._id}
                        label={
                          dataListMenuOptionChoice.map(item => (<>
                            {item.menuOptionChoiceName === element.menuOptionChoiceName ? <>{item.menuOptionChoiceName} ราคา {item.menuOptionChoicePrice} บาท</> : ""}
                          </>))
                        }
                        checked={querydata.menuType === 1 ? handleUncheckedRadioButton(querydata._id, element.menuOptionChoiceName) : handleCheckedCheckBox(querydata._id, element.menuOptionChoiceName)}
                        onClick={() => handleChangeUpdateSelectedOption(querydata._id, querydata.menuType, element.menuOptionChoiceName)}
                      />
                    ))
                  }

                </Form.Group>
              </Form>
            })
          }


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
          <Button variant="secondary" onClick={() => handleClose(dataModal.menuOption)}>
            ปิด
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleClickMenuAddSelect(
                dataModal.menuName,
                dataModal.menuId,
                numberMenu,
                dataMenuMemo.menuMemo,
                dataModal.menuOption
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
