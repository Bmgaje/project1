import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import axios from 'axios';
import Notification from '../Widgets/Statistic/Notification';

export default function AddReport() {
  let [addReason, setAddReason] = useState('');
  let [error, setError] = useState(false);
  let [addStatus, setAddStatus] = useState(false);
  const navigate = useNavigate();
  let [errorMsgRepeated, setErrorMsgRepeated] = useState(false);

  function add(e) {
    e.preventDefault();
    if (addReason.length == 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else if (addReason.length > 0) {
      const payload = {
        reason: addReason
      };
      axios
        .post(Urls.post.addReport, payload)
        .then(() => {
          setAddStatus(true);
          setTimeout(() => {
            setAddStatus(false);
            navigate('/report');
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

  // function add() {
  //   const payload = {
  //     reason: addReason
  //   };
  //   axios.post(Urls.post.addReport, payload).then(() => {
  //     alert('Reason added successfully.');
  //     navigate('/report');
  //   });
  // }

  return (
    <div>
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
              <Notification message="Reason added successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {errorMsgRepeated ? (
            <b>
              <Notification message="This Report name is already exist!" />
            </b>
          ) : null}
        </div>
      </div>

      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Reason</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Reason Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setAddReason(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Reason Name"
                    />
                  </Form.Group>
                </Row>

                <Col xs="auto" className="pt-3">
                  <Button type="submit" variant="primary" size="sm" onClick={add}>
                    <Link className="text-white">Add Reason</Link>
                  </Button>
                  <Link to={'/report'} className="text-white">
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
    </div>
  );
}
