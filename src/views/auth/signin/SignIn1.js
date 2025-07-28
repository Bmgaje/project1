/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import { ClientJS } from 'clientjs';
import instance from '../../../helpers/axiosInstance';
import { toast } from 'react-toastify';

const Signin1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    const client = new ClientJS();
    setDeviceInfo({
      fingerprint: client.getFingerprint(),
      browser: client.getBrowser(),
      browserVersion: client.getBrowserVersion(),
      os: client.getOS()
    });
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post('api/user/login', { email, password, device: deviceInfo });
      const res = response.data;
      setData(res);
      setShow(!res?.token);
      if (res?.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('deviceId', deviceInfo?.fingerprint);
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('usersPermission', JSON.stringify({ menus: res.permissions }));
        window.location.href = '/';
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || 'Something went wrong!');
    }
  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <form>
                <div className="form-group mb-3">
                  <input
                    required={true}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control"
                    label="Email Address / Username"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    required={true}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control"
                    placeholder="password"
                    name="password"
                    type="password"
                    disabled={email.length !== 0 ? false : true}
                  />
                </div>

                <Row>
                  <Col mt={2}>
                    <Button
                      onClick={login}
                      className="btn-block"
                      color="primary"
                      size="large"
                      type="submit"
                      variant="primary"
                      disabled={password.length !== 0 ? false : true}
                    >
                      Signin
                    </Button>
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                      <span>Don&apos;t have an account? </span>
                      <Link to="/signup" style={{ color: '#007bff', textDecoration: 'underline' }}>
                        Sign Up
                      </Link>
                    </div>
                  </Col>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </div>
        <Modal size="sm" show={show} onHide={() => setShow(false)} aria-labelledby="example-modal-sizes-title-sm">
          <Modal.Header closeButton>
            <b>{data?.message}</b>
          </Modal.Header>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
