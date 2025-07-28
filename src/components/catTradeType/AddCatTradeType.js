/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Urls, imgUrl } from '../../helpers/Urls';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Widgets/Statistic/Notification';
import Select from 'react-select';

function AddCatTradeType() {
  const navigate = useNavigate();
  const [__CatTradeType, setCatTradeType] = useState('');

  const [TradeTypeId, setTradeTypeId] = useState('');
  const [TradeTypeData, setTradeTypeData] = useState([]);

  let [searchTradeType, setSearchTradeType] = useState('');
  let tradeTypeLimit = 50;

  let [error, setError] = useState(false);
  let [addStatus, setAddStatus] = useState(false);

  let [iconAdd, setAddIcon] = useState(null);
  let [preview, setPreview] = useState('');

  let [errorMsgRepeated, setErrorMsgRepeated] = useState(false);

  useEffect(() => {
    const fetchCatTradeType = () => {
      axios
        .get(Urls.get.tradetype + `?limit=${tradeTypeLimit}&q=${searchTradeType}`)
        .then((res) => {
          setTradeTypeData(res.data?.data?.docs || []);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchCatTradeType();
  }, [searchTradeType, tradeTypeLimit]);

  function handleChangeIcon(e) {
    const file = e.target.files[0];
    if (file) {
      setAddIcon(file);
      const preview = URL.createObjectURL(file);
      setPreview(preview);
    }
  }

  const handleTradeTypeChange = (TradeTypeId) => {
    setTradeTypeId(TradeTypeId.value);
  };

  const handleSearchInput = (inputS) => {
    setSearchTradeType(inputS);
  };

  function add(e) {
    e.preventDefault();
    if (!__CatTradeType || !TradeTypeId) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else if (!iconAdd) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      // const payload = {
      //   tradeCategory: TradeTypeId,
      //   title: __CatTradeType,
      //   icon: iconAdd
      // };

      let formData = new FormData();
      formData.append('tradeCategory', TradeTypeId);
      formData.append('title', __CatTradeType);
      formData.append('icon', iconAdd);

      axios
        .post(Urls.post.addCatTradeType, formData)
        .then(() => {
          setAddStatus(true);
          setTimeout(() => {
            setAddStatus(false);
            navigate('/masters/CatTradeType');
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setErrorMsgRepeated(true);
          setTimeout(() => {
            setErrorMsgRepeated(false);
          }, 2000);
        });
    }
  }

  // const add = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     tradeCategory: TradeTypeId,
  //     title: __CatTradeType
  //   };
  //   axios.post(Urls.post.addCatTradeType, payload).then((res) => {
  //     if (res.data.status === 'success') {
  //       navigate('/masters/CatTradeType');
  //     }
  //   });
  // };

  // const handleChange = (e) => {
  //   setTradeTypeId(e.target.value);
  // };

  return (
    <>
      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {error ? (
            <b>
              <Notification message="Please this * field is required !" />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {addStatus ? (
            <b>
              <Notification message="CatTradeType added successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {errorMsgRepeated ? (
            <b>
              <Notification message="This Trade Type Category name is already exist!" />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Trade type Category</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={add}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Select Trade Type <span className="text-danger">*</span>
                    </Form.Label>
                    <Select
                      value={TradeTypeId.title}
                      onChange={handleTradeTypeChange}
                      options={TradeTypeData?.map((item) => {
                        return {
                          label: item?.title,
                          value: item?._id
                        };
                      })}
                      onInputChange={handleSearchInput}
                      placeholder="Search..."
                      isSearchable
                    />
                  </Form.Group>

                  {/* <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Select Trade Type <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select required={true} as="select" onChange={handleChange} placeholder="Select Trade type">
                      <option value={''}>Select Trade Type</option>
                      {TradeTypeData.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group> */}

                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Trade Type Category Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setCatTradeType(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Trade Type Category Name"
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <div className="col-4 ">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Icon <span className="text-danger">*</span>
                    </Form.Label>
                    <div>
                      <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Control type="file" size="sm" onChange={handleChangeIcon} />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="col-4 ">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Icon Preview</Form.Label>
                    <div>
                      <img src={preview || imgUrl + iconAdd} alt="" className="img-fluid " style={{ width: '70px', height: '60px' }} />
                    </div>
                  </div>
                </Row>

                <Col xs="auto" className="my-1">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    //  disabled={__CatTradeType.length !== 0 ? false : true}
                  >
                    Add
                  </Button>
                  <Link to={'/masters/CatTradeType'}>
                    <Button variant="danger" size="sm">
                      Cancel
                    </Button>
                  </Link>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AddCatTradeType;
