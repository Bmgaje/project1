/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';

function AddInterest() {
  const [interest, setInterest] = useState('');
  let [error, setError] = useState(false);
  let [addStatus, setAddStatus] = useState(false);
  const navigate = useNavigate();
  let [errorMsgRepeated, setErrorMsgRepeated] = useState(false);

  function add(e) {
    e.preventDefault();
    if (interest.length == 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else if (interest.length > 0) {
      const payload = {
        title: interest
      };
      axios
        .post(Urls.post.addinterest, payload)
        .then(() => {
          setAddStatus(true);
          setTimeout(() => {
            setAddStatus(false);
            navigate('/masters/Interest');
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
  //     title: interest
  //   };
  //   axios.post(Urls.post.addinterest, payload).then((response) => {});
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
              <Notification message="Interest added successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {errorMsgRepeated ? (
            <b>
              <Notification message="This Interest name is already exist!" />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Interest</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Interest Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setInterest(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Interest Name"
                    />
                  </Form.Group>
                </Row>

                <Col xs="auto" className="my-1">
                  <Button type="submit" variant="primary" onClick={add} size="sm">
                    <Link className="text-white">Add</Link>
                  </Button>
                  <Link to={'/masters/Interest'}>
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

export default AddInterest;
