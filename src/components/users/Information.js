import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Row, Form, Col, Button, Image } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Urls, imgUrl } from '../../helpers/Urls';

export default function Information() {
  const params = useParams();

  let location = useLocation();
  let page = location?.state?.page;
  let limit = location?.state?.limit;

  const [userInfo, setUserInfo] = useState([]);

  function getUserInfo() {
    axios.get(Urls.get.getSingleUser + params.id).then((res) => {
      const data = res.data._getUser;
      console.log('single user...', data);
      setUserInfo(data);
    });
  }

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      <Row>
        <div>
          <Card>
            <Card.Header style={{ backgroundColor: '#3f4d67' }}>
              <div className="container d-flex align-items-center">
                <div>
                  <Image src={imgUrl + userInfo?.profilePic} style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                </div>
                <h6 className="p-1 text-light" style={{ letterSpacing: '7px', fontWeight: '300' }}>
                  {userInfo?.username}
                </h6>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Name</Form.Label>
                    <p>{userInfo?.name ? userInfo?.name : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Email</Form.Label>
                    <p>{userInfo?.email ? userInfo?.email : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>User Name</Form.Label>
                    <p>{userInfo?.username ? userInfo?.username : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Gender</Form.Label>
                    <p>{userInfo?.gender ? userInfo?.gender : 'NA'}</p>
                  </Form.Group>
                </div>
              </Row>
              <Row>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Email Verify</Form.Label>
                    <p>{userInfo?.email_verify ? userInfo?.email_verify : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Mobile Number</Form.Label>
                    <p>{userInfo?.mob_no ? userInfo?.mob_no : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Rating</Form.Label>
                    <p>{userInfo?.rating}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Status</Form.Label>
                    <p style={{ color: userInfo?.status === 'active' ? 'green' : 'red' }}>
                      {userInfo?.status === 'active' ? 'Active' : 'Inactive'}
                    </p>
                  </Form.Group>
                </div>
              </Row>
            </Card.Body>
          </Card>

          <Col xs="auto" className="my-1">
            <Link to={'/masters/users'} state={{page:page, limit:limit}}>
              <Button variant="info" as="btn" size="sm" className="float-end">
                Back
              </Button>
            </Link>
          </Col>
        </div>
      </Row>
    </>
  );
}




