import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Urls, imgUrl } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import axios from 'axios';

export default function EditBadge() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const page = location?.state?.page;
  const limit = location?.state?.limit;

  console.log('edit location', location);

  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [icon, setIcon] = useState(null);
  let [preview, setPreview] = useState('');
  let [statusUpdate, setStatusUpdate] = useState(false);
  let [error, setError] = useState(false);
  let [badgeType, setBadgeType] = useState('');

  function getSingleBadge() {
    axios.get(Urls.get.singleBadge + params.id).then((res) => {
      console.log('single badge', res);
      setTitle(res?.data?.getBadge?.title);
      setDescription(res?.data?.getBadge?.description);
      setIcon(res?.data?.getBadge?.icon);
      setBadgeType(res?.data?.getBadge?.badgeType)
    });
  }

  useEffect(() => {
    getSingleBadge();
  }, []);

  function handleChangeIcon(e) {
    const file = e.target.files[0];
    if (file) {
      setIcon(file);
      const preview = URL.createObjectURL(file);
      setPreview(preview);
    }
  }

  function update(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('badgeType', badgeType);
    formData.append('icon', icon);

    axios
      .put(Urls.put.updateBadge + '/' + params.id, formData)
      .then((res) => {
        if (res?.data?.status === 'success') {
          setStatusUpdate(true);
          setTimeout(() => {
            setStatusUpdate(false);
            navigate('/badge', { state: { page: page, limit: limit } });
          }, 2000);
        }
      })
      .catch((error) => {
        console.log('Image selected', error);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
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
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {error ? (
            <b>
              <Notification message="Please  at least any one update!" />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Update Badge</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="4">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Badge Title</Form.Label>
                    <Form.Control
                      defaultValue={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      type="text"
                      placeholder="Update Title"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="4">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Description</Form.Label>
                    <Form.Control
                      defaultValue={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      type="text"
                      placeholder="Update Description"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" as={Col} md="4">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Badge Type 
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
                </Row>

                <Row>
                  <div className="col-4 ">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Icon 
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
                      <img src={preview || imgUrl + icon} alt="" className="img-fluid " style={{ width: '70px', height: '70px' }} />
                    </div>
                  </div>
                </Row>

                <Col xs="auto" className="pt-3">
                  <Button type="submit" variant="primary" size="sm" onClick={update}>
                    <Link className="text-white">Update Badge</Link>
                  </Button>

                  <Link to={'/badge'} state={{ page: page, limit: limit }} className="text-white">
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
