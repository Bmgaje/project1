import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';

export default function EditReason() {
  let [updateReason, setUpdateReason] = useState('');
  let [statusUpdate, setStatusUpdate] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

    const location = useLocation();
    const page = location?.state?.page;
    const limit = location?.state?.limit;

  const getSingleReason = () => {
    axios.get(Urls.get.reports + '/' + params.id).then((response) => {
      console.log('single reason: ', response);
      setUpdateReason(response.data.data.reason);
    });
  };

  useEffect(() => {
    getSingleReason();
  }, []);

  function updateData(event) {
    event.preventDefault();
    const payload = {
      reason: updateReason
    };

    axios.put(Urls.put.updateReasons + params.id, payload).then((response) => {
      if (response.data.status === 'success') {
        setStatusUpdate(true);

        setTimeout(() => {
          setStatusUpdate(false);
          navigate('/report', { state: { page: page, limit: limit } });
        }, 2000);
      } else {
        alert('something went wrong please try again');
      }
    });
  }

  return (
    <div>
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
              <Card.Title as="h5">Update Reason</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Reason Name</Form.Label>
                    <Form.Control
                      defaultValue={updateReason}
                      required
                      onChange={(e) => {
                        setUpdateReason(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Reason Name"
                    />
                  </Form.Group>
                </Row>

                <Col xs="auto" className="pt-3">
                  <Button type="submit" variant="primary" size="sm" onClick={updateData}>
                    <Link className="text-white">Update Reason</Link>
                  </Button>
                  <Link to={'/report'} state={{ page: page, limit: limit }} className="text-white">
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
