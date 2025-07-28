import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import moment from 'moment';

function BankDetailsView() {
  const params = useParams();

  const location = useLocation();
  const page = location?.state?.activePage;
  const limit = location?.state?.limit;

  let [singleData, setSingleData] = useState([]);

  function singleDetails() {
    axios.get(Urls.get.userSingleBankDetails + params.id).then((res) => {
      console.log('Single bank details', res);
      setSingleData(res?.data);
    });
  }

  // const formattedDate = moment(singleData?.createdAt).format('DD-MM-YYYY'); // Format: 2024-12-17
  // const formattedTime = moment(singleData?.createdAt).format('hh:mm A');   // Format: 11:10 AM/PM

  useEffect(() => {
    singleDetails();
  }, []);
  return (
    <div>
      <Row>
        <Col className="my-3 text-end">
          <Link to={'/bankdetails'} state={{ activePage: page, limit: limit }}>
            <Button variant="danger" size="sm">
              Back
            </Button>
          </Link>
        </Col>
      </Row>
      <Card>
        <Card.Header style={{ backgroundColor: '#10446c' }}>
          <div className="container d-flex align-items-center">
            <h4 className=" text-light" style={{ letterSpacing: '3px', fontWeight: '300' }}>
              Banking Details
            </h4>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <div className="col-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Account Holder Name</Form.Label>
                <p>{singleData?.accountHolderName ? singleData?.accountHolderName : 'N/A'}</p>
              </Form.Group>
            </div>
            <div className="col-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Bank Name</Form.Label>
                <p>{singleData?.bankName ? singleData?.bankName : 'N/A'}</p>
              </Form.Group>
            </div>
            <div className="col-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Account Number</Form.Label>
                <p>{singleData?.accountNumber ? singleData?.accountNumber : 'N/A'}</p>
              </Form.Group>
            </div>
            <div className="col-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Account Type</Form.Label>
                <p>{singleData?.accountType ? singleData?.accountType : 'N/A'}</p>
              </Form.Group>
            </div>
            <div className="col-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Transit Number</Form.Label>
                <p>{singleData?.transitNumber ? singleData?.transitNumber : 'N/A'}</p>
              </Form.Group>
            </div>
            <div className="col-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Institution Number</Form.Label>
                <p>{singleData?.institutionNumber ? singleData?.institutionNumber : 'N/A'}</p>
              </Form.Group>
            </div>
            <div className="col-4">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Created At</Form.Label>
                <p>{moment(singleData?.createdAt ? singleData?.createdAt : 'N/A').format('DD-MM-YYYY')}</p>
                {/* <p>{formattedDate}, {formattedTime}</p> */}
              </Form.Group>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BankDetailsView;
