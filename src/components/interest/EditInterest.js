/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import { useParams } from 'react-router-dom';

function EditInterest() {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location?.state?.activePage;
  const limit = location?.state?.limit;
  // const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  let [statusUpdate, setStatusUpdate] = useState(false);

  const params = useParams();

  const fetch = () => {
    axios.get(Urls.get.interest + '/' + params.id).then((response) => {
      setNewTitle(response.data?.getInterest.title);
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  const update = (e) => {
    e.preventDefault();
    const payload = {
      title: newTitle
    };
    axios.put(Urls.put.updateInterest + params.id, payload).then((res) => {
      if (res.data.status === 'success') {
        setStatusUpdate(true);

        setTimeout(() => {
          setStatusUpdate(false);
          navigate('/masters/Interest', { state: { activePage: page, limit: limit } });
        }, 2000);
      } else {
        alert('something went wrong plese try again');
      }
    });
  };

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
              <Card.Title as="h5">Update Interest</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={update}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Interest Name</Form.Label>
                    <Form.Control
                      defaultValue={newTitle}
                      required
                      onChange={(e) => {
                        setNewTitle(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Interest Name"
                    />
                  </Form.Group>
                </Row>

                <Col xs="auto" className="my-1">
                  <Button type="submit" variant="primary" size="sm">
                    Update
                  </Button>
                  <Link to={'/masters/Interest'} state={{ activePage: page, limit: limit }}>
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

export default EditInterest;
