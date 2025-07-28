/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Urls, imgUrl } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';

function AddTradeType() {
  const [TradeType, setTradeType] = useState('');
  let [iconAdd, setAddIcon] = useState(null);
  let [preview, setPreview] = useState('');

  let [error, setError] = useState(false);
  let [addStatus, setAddStatus] = useState(false);
  const navigate = useNavigate();
  let [errorMsgRepeated, setErrorMsgRepeated] = useState(false);

  function handleChangeIcon(e) {
    const file = e.target.files[0];
    if (file) {
      setAddIcon(file);
      const preview = URL.createObjectURL(file);
      setPreview(preview);
    }
  }

  function add(e) {
    e.preventDefault();
    if (TradeType.length === 0) {
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
      //   title: TradeType,
      //   icon: iconAdd
      // };

      let formData = new FormData();
      formData.append('title', TradeType);
      formData.append('icon', iconAdd);

      axios
        .post(Urls.post.addTradeType, formData)
        .then(() => {
          setAddStatus(true);
          setTimeout(() => {
            setAddStatus(false);
            navigate('/masters/TradeType');
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

  // const add = () => {
  //   const payload = {
  //     title: TradeType
  //   };
  //   axios.post(Urls.post.addTradeType, payload).then((response) => {});
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
              <Notification message="TradeType added successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {errorMsgRepeated ? (
            <b>
              <Notification message="This Trade Type name is already exist!" />
            </b>
          ) : null}
        </div>
      </div>
      
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add TradeType</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      TradeType Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setTradeType(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter TradeType Name"
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
                  <Button type="submit" variant="primary" size="sm" onClick={add}>
                    <Link className="text-white">Add TradeType</Link>
                  </Button>
                  <Link to={'/masters/TradeType'}>
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

export default AddTradeType;
