/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Urls, imgUrl } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';

import { useParams } from 'react-router-dom';
function EditTradeType() {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location?.state?.activePage;
  const limit = location?.state?.limit;
  // const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  let [statusUpdate, setStatusUpdate] = useState(false);

  let [iconAdd, setAddIcon] = useState(null);
  let [preview, setPreview] = useState('');

  const params = useParams();

  const fetch = () => {
    axios.get(Urls.get.tradetype + '/' + params.id).then((response) => {
      console.log('check trade single data', response);
      setNewTitle(response.data?.getTradeCategory.title);
      setAddIcon(response.data?.getTradeCategory.icon);
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  function handleChangeIcon(e) {
    const file = e.target.files[0];
    if (file) {
      setAddIcon(file);
      const preview = URL.createObjectURL(file);
      setPreview(preview);
    }
  }

  const update = (e) => {
    e.preventDefault();
    // const payload = {
    //   title: newTitle
    // };

    let formData = new FormData();
    formData.append('title', newTitle);
    formData.append('icon', iconAdd);

    axios.put(Urls.put.updateTradeType + '/' + params.id, formData).then((res) => {
      if (res.data.status === 'success') {
        setStatusUpdate(true);

        setTimeout(() => {
          setStatusUpdate(false);
          navigate('/masters/TradeType', { state: { activePage: page, limit: limit } });
        }, 2000);
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
              <Card.Title as="h5">Update TradeType</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={update}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>TradeType Name</Form.Label>
                    <Form.Control
                      defaultValue={newTitle}
                      required
                      onChange={(e) => {
                        setNewTitle(e.target.value);
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
                  <Button type="submit" variant="primary" size="sm">
                    TradeType Update
                  </Button>
                  <Link to={'/masters/TradeType'} state={{ activePage: page, limit: limit }}>
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

export default EditTradeType;
