import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Widgets/Statistic/Notification';

import axios from 'axios';
import { Urls, imgUrl } from '../../helpers/Urls';

export default function AddBadge() {
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [badgeType, setBadgeType] = useState('');
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
    if (!title || !badgeType || !iconAdd) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      let formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('badgeType', badgeType);
      formData.append('icon', iconAdd);

      axios
        .post(Urls.post.addBadge, formData)
        .then(() => {
          setAddStatus(true);
          setTimeout(() => {
            setAddStatus(false);
            navigate('/badge');
          }, 2000);
        })
        .catch(() => {
          setErrorMsgRepeated(true);
          setTimeout(() => {
            setErrorMsgRepeated(false);
          }, 2000);
        });
    }
  }

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
              <Notification message="Badge added successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {errorMsgRepeated ? (
            <b>
              <Notification message="This Badge name is already exist!" />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Badge</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="4">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Badge Title <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Title"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="4">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Description</Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Description"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" as={Col} md="4">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Badge Type <span className="text-danger">*</span>
                    </Form.Label>{' '}
                    <br />
                    <select
                      className="btn btn-light p-1 dropdown-toggle text-left"
                      style={{ border: '1px solid #10446c' }}
                      value={badgeType}
                      onChange={(e) => setBadgeType(e.target.value)}
                    >
                      <option value="">Select Option</option>
                      <option value="insurance">Insurance</option>
                      <option value="identity">Identity</option>
                      <option value="journeyperson">Journeyperson</option>
                    </select>
                  </Form.Group>

                  {/* <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Badge Type 
                    </Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setBadgeType(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter badge type"
                    />
                  </Form.Group> */}
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
                      <img src={preview || imgUrl + iconAdd} alt="" className="img-fluid " style={{ width: '70px', height: '70px' }} />
                    </div>
                  </div>
                </Row>

                <Col xs="auto" className="pt-3">
                  <Button type="submit" variant="primary" size="sm" onClick={add}>
                    <Link className="text-white">Add Badge</Link>
                  </Button>
                  <Link to={'/badge'} className="text-white">
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
