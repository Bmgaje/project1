/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Urls } from '../../helpers/Urls';
import { useNavigate, useParams } from 'react-router-dom';

function EditSubCatTradeType() {
  const navigate = useNavigate();
  const params = useParams();
  const [__Cat, setCat] = useState('');
  const [tradeData, setTradeData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [subCatId, setSubCatId] = useState([]);
  const [_data, setData] = useState([]);
  const [tradeId, setTradeId] = useState();

  const fetchTrade = () => {
    axios.get(Urls.get.tradetype).then((res) => {
      setTradeData(res.data?.data?.docs);
    });
  };

  const fetchSubCategory = () => {
    axios.get(Urls.get.subcattradetype + '/' + params.id).then((res) => {
      setData(res.data?.data?.docs);

      let data = res.data?.getTradeTypeSubCat;
      setSubCatId(data?.tradeTypeCat?._id);
      setTradeId(data?.tradeCategory?._id);
      console.log(data?.tradeCategory?._id);
    });
  };

  const add = (e) => {
    e.preventDefault();
    const payload = {
      tradeCategory: tradeId,
      tradeTypeCat: subCatId,
      title: __Cat
    };
    axios.put(Urls.put.updateSubCatTradeType + params.id, payload).then((res) => {
      if (res.data.status === 'success') {
        navigate('/masters/SubCatTradeType');
      }
    });
  };

  const handleChange = (e) => {
    setTradeId(e.target.value);
  };

  useEffect(() => {
    fetchTrade();
    fetchSubCategory();
  }, []);

  useEffect(() => {
    axios.get(Urls.get.cattradetype + '/' + tradeId + `?is_delete=no`).then((res) => {
      setCatData(res.data?.data?.docs);
    });
  }, [tradeId]);

  const handleSubCatChange = (e) => {
    setSubCatId(e.target.value);
  };

  return (
    <>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Edit Sub Category</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={add}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Trade Type</Form.Label>
                    <Form.Select required={true} as="select" value={tradeId} onChange={handleChange} placeholder="Select Trade Type">
                      <option value={''}>Select Trade Type</option>
                      {tradeData?.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item?.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Select required={true} as="select" value={subCatId} onChange={handleSubCatChange} placeholder="Select Category">
                      <option value={''}>Select Category</option>
                      {catData?.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item?.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label>Cat Name</Form.Label>
                    <Form.Control
                      defaultValue={_data?.title}
                      required
                      onChange={(e) => {
                        setCat(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter SubCat Name"
                    />
                  </Form.Group>
                </Row>

                <Col xs="auto" className="my-1">
                  <Button type="submit" variant="primary" disabled={__Cat.length !== 0 ? false : true}>
                    Update
                  </Button>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default EditSubCatTradeType;
