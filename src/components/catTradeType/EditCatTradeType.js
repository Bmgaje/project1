/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Urls, imgUrl } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import Select from 'react-select';

import { useParams } from 'react-router-dom';

function EditCatTradeType() {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location?.state?.activePage;
  const limit = location?.state?.limit;

  const [title, setTitle] = useState('');

  const [__id, setID] = useState('');
  const [tradeTypeData, setTradeTypeData] = useState([]);
  let [searchTradeType, setSearchTradeType] = useState('');
  let tradeTypeLimit = 50;

  let [statusUpdate, setStatusUpdate] = useState(false);
  let [iconAdd, setAddIcon] = useState(null);
  let [preview, setPreview] = useState('');

  const params = useParams();

  const fetch = () => {
    axios.get(Urls.get.cattradetype + '/' + params.id).then((response) => {
      const data = response.data?.getTradeTypeCat;

      setAddIcon(data?.icon);
      setTitle(data?.title);
      // setID(response.data?.getTradeTypeCat?.tradeCategory._id);
      setID({ label: data?.tradeCategory?.title, value: data?.tradeCategory?._id });
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    function allTradeType() {
      axios
        .get(Urls.get.tradetype + `?limit=${tradeTypeLimit}&q=${searchTradeType}`)
        .then((res) => {
          setTradeTypeData(res.data?.data.docs || []);
        })
        .catch((err) => console.log(err));
    }

    allTradeType();
  }, [searchTradeType, tradeTypeLimit]);

  function handleChangeIcon(e) {
    const file = e.target.files[0];
    if (file) {
      setAddIcon(file);
      const preview = URL.createObjectURL(file);
      setPreview(preview);
    }
  }

  const handleTradeTypeChange = (__id) => {
    setID(__id);
  };

  const handleSearchInput = (inputS) => {
    setSearchTradeType(inputS);
  };

  const update = (e) => {
    e.preventDefault();

    // const payload = {
    //   tradeCategory: __id,
    //   title
    // };
    let formData = new FormData();

    formData.append('tradeCategory', __id.value);
    formData.append('title', title);
    formData.append('icon', iconAdd);

    axios.put(Urls.put.updateCatTradeType + '/' + params.id, formData).then((res) => {
      if (res.data.status === 'success') {
        setStatusUpdate(true);

        setTimeout(() => {
          setStatusUpdate(false);
          navigate('/masters/CatTradeType', { state: { activePage: page, limit: limit } });
        }, 2000);
      }
    });
  };

  // const handleChange = (e) => {
  //   setID(e.target.value);
  // };
  return (
    <>
      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {statusUpdate ? (
            <b>
              <Notification message="Data updated Successfully." />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Update Trade Type Category</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={update}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Select Trade Type</Form.Label>
                    <Select
                      value={__id}
                      onChange={handleTradeTypeChange}
                      options={tradeTypeData?.map((item) => {
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
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Select Trade Type</Form.Label>
                    <Form.Select required={true} as="select" value={__id} onChange={handleChange} placeholder="Select Trade Type">
                      <option value={''}>Select Trade Type</option>
                      {tradeTypeData.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group> */}

                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Trade Type Category Name</Form.Label>
                    <Form.Control
                      defaultValue={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Trade Type Category Name"
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <div className="col-4 ">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Icon</Form.Label>
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
                    // disabled={title.length !== 0 ? false : true}
                  >
                    Update
                  </Button>
                  <Link to={'/masters/CatTradeType'} state={{ activePage: page, limit: limit }}>
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

export default EditCatTradeType;
