/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Urls } from '../../helpers/Urls';
import { useNavigate } from 'react-router-dom';

function AddSubCatTradeType() {
  const navigate = useNavigate();
  const [__SubCatTradeType, setSubCatTradeType] = useState('');
  const [TradeTypeId, setTradeTypeId] = useState('');
  const [TradeTypeData, setTradeTypeData] = useState([]);
  const [CatTradeTypeData, setCatTradeTypeData] = useState([]);
  const [CatTradeTypeId, setCatTradeTypeId] = useState([]);

  const fetchTradeType = () => {
    axios.get(Urls.get.tradetype).then((res) => {
      setTradeTypeData(res.data?.data.docs);
    });
    axios.get(Urls.get.cattradetype + `?is_delete=no`).then((res) => {
      setCatTradeTypeData(res.data?.data.docs);
    });
  };

  useEffect(() => {
    fetchTradeType();
  }, []);

  const add = (e) => {
    e.preventDefault();
    const payload = {
      tradeCategory: TradeTypeId,
      tradeTypeCat: CatTradeTypeId,
      title: __SubCatTradeType
    };
    axios.post(Urls.post.addSubCatTradeType, payload).then((res) => {
      if (res.data.status === 'success') {
        navigate('/masters/SubCatTradeType');
      }
    });
  };

  const handleChange = (e) => {
    console.log(e.target);
    setTradeTypeId(e.target.value);
  };
  const handleCatTradeTypeChange = (e) => {
    console.log(e.target);
    setCatTradeTypeId(e.target.value);
  };

  return (
    <>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add CatTradeType</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={add}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select TradeType</Form.Label>
                    <Form.Select required={true} as="select" onChange={handleChange} placeholder="Select TradeType">
                      <option value={''}>Select TradeType</option>
                      {TradeTypeData.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Select required={true} as="select" onChange={handleCatTradeTypeChange} placeholder="Select TradeType">
                      <option value={''}>Select Category</option>
                      {CatTradeTypeData.map((item, index) => {
                        if (item.tradeCategory._id === TradeTypeId) {
                          return (
                            <option key={index} value={item._id}>
                              {item.title}
                            </option>
                          );
                        }
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label>Sub-Category Name</Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setSubCatTradeType(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Sub-Category Name"
                    />
                  </Form.Group>
                </Row>

                <Col xs="auto" className="my-1">
                  <Button type="submit" variant="primary" disabled={__SubCatTradeType.length !== 0 ? false : true}>
                    Add
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

export default AddSubCatTradeType;
