import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Card, Row, Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';
import moment from 'moment';
export default function IssueDetails() {
  let [reportData, setReportData] = useState('');
  const params = useParams();

  const location = useLocation();
  console.log("single location",location);

  const page = location?.state?.activePage;
  const limit = location?.state?.limit;

  

  function getDetails() {
    axios.get(Urls.get.getSingleIssueReport + params.id).then((res) => {
      console.log('Issue single report', res?.data?.data);
      setReportData(res?.data?.data);
    });
  }
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div>
      <Row>
        <Col xs="auto" className="my-3">
          <Link to={'/issuereport'} state={{activePage:page, limit:limit}}>
            <Button variant="primary" as="btn" size="sm">
              Back
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <div className="col-12">
          <Card>
            <Card.Header style={{ backgroundColor: '#3f4d67' }}>
              <div className="container d-flex align-items-center">
                <h4 className=" text-light" style={{ letterSpacing: '3px', fontWeight: '300' }}>
                  Report Infomation
                </h4>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Form.Label style={{ fontWeight: 'bold', color: 'green' }}>Reported by </Form.Label>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Name</Form.Label>
                    <p>{reportData?.reported_by?.name}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Email</Form.Label>
                    <p>{reportData?.reported_by?.email}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Status</Form.Label>
                    <p>{reportData?.status}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Reason</Form.Label>
                    <p>{reportData?.report?.reason}</p>
                  </Form.Group>
                </div>
              </Row>

              <Row>
                {/* <Form.Label style={{ fontWeight: 'bold', color: 'green' }}>Report</Form.Label> */}
                <div className="col-12">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: 'green' }}>Report Info</Form.Label>
                    {reportData.group && (
                      <div className="row">
                        {/* <img src={imgUrl + reportData?.group?.icon} alt="No image" style={{ width: '40px', height: '40px' }} /> */}
                        <div className="col-3">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Group Name</Form.Label>
                          <p>{reportData?.group?.group_name}</p>
                        </div>

                        <div className="col-3">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Status</Form.Label>
                          <p>{reportData?.group?.status}</p>
                        </div>

                        <div className="col-3">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Create At</Form.Label>
                          {/* <p>{reportData?.group?.createdAt}</p> */}
                          <p>{moment(reportData?.group?.createdAt).format('DD-MM-YYYY HH:mm:ss')}</p>
                        </div>

                        <div className="col-12">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Description</Form.Label>
                          <p>{reportData?.group?.description}</p>
                        </div>
                      </div>
                    )}
                    {reportData.project && (
                      <div className="row">
                        <div className="col-3">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Project Name </Form.Label>
                          <p>{reportData?.project?.project_title}</p>
                        </div>

                        <div className="col-3">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Current Status </Form.Label>
                          <p>{reportData?.project?.current_status}</p>
                        </div>

                        <div className="col-3">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Status </Form.Label>
                          <p>{reportData?.project?.status}</p>
                        </div>

                        <div className="col-3">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Create At </Form.Label>
                          {/* <p>{reportData?.project?.createdAt}</p> */}
                          <p>{moment(reportData.project?.createdAt).format('DD-MM-YYYY HH:mm:ss')}</p>
                        </div>
                        <div className="col-12">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Description </Form.Label>
                          <p>{reportData?.project?.description}</p>
                        </div>
                      </div>
                    )}
                    {reportData.post && (
                      <div className="row">
                        <div className="col-3">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Post Name </Form.Label>
                          <p>{reportData?.post?.content}</p>
                        </div>
                        <div className="col-3">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Status </Form.Label>
                          <p>{reportData?.post?.status}</p>
                        </div>

                        <div className="col-3">
                          <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Create At </Form.Label>
                          <p>{moment(reportData?.post?.createdAt).format('DD-MM-YYYY HH:mm:ss')}</p>
                        </div>
                      </div>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
}
