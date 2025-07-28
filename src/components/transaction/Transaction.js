import React, { useState } from 'react';
import { Table, Form, InputGroup, Row, Col, Button, Card } from 'react-bootstrap';
import { saveAs } from 'file-saver'; // Install with `npm install file-saver xlsx`
import * as XLSX from 'xlsx';
import { FaRupeeSign } from 'react-icons/fa';
import '../transaction/css/transaction.css';
import 'animate.css';
const transationRecord = [
  {
    sr_no: '1',
    project_name: 'Construction of Bridge',
    transtionID: 'T1343543454',
    amount: 3500,
    username: 'Amelia',
    DateTime: '20-08-2024',
    accountno: '4584857489589',
    accounttype: 'International',
    owner_name: 'john',
    contractor_name: 'ABC Pvt Ltd',
    milestone: 'milestone 1'
  },
  {
    sr_no: '2',
    project_name: 'Construction of Bridge',
    transtionID: 'T1380445459',
    amount: 2000,
    username: 'Emma',
    DateTime: '17-09-2024',
    accountno: '4584857489589',
    accounttype: 'International',
    owner_name: 'john',
    contractor_name: 'ABC Pvt Ltd',
    milestone: 'milestone 2'
  },
  {
    sr_no: '3',
    project_name: 'Construction of Bridge',
    transtionID: 'T1989847883',
    amount: 1000,
    username: 'Theodore',
    DateTime: '17-09-2024',
    accountno: '4584857489589',
    accounttype: 'International',
    owner_name: 'john',
    contractor_name: 'ABC Pvt Ltd',
    milestone: 'milestone 3'
  },
  {
    sr_no: '4',
    project_name: 'Construction of Bridge',
    transtionID: 'T1954972355',
    amount: 8500,
    username: 'john',
    DateTime: '25-02-2024',
    accountno: '4584857489589',
    accounttype: 'International',
    owner_name: 'john',
    contractor_name: 'ABC Pvt Ltd',
    milestone: 'milestone 4'
  },
  {
    sr_no: '5',
    project_name: 'Construction of Bridge',
    transtionID: 'T3243434324',
    amount: 7640,
    username: 'Liam',
    DateTime: '03-12-2024',
    accountno: '4584857489589',
    accounttype: 'International',
    owner_name: 'john',
    contractor_name: 'ABC Pvt Ltd',
    milestone: 'milestone 5'
  }
];

function Transaction() {
  const [filteredTransactions, setFilteredTransactions] = useState(transationRecord);
  const [dateFilter, setDateFilter] = useState('');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Helper function to filter by date
  const filterTransactions = () => {
    const now = new Date();
    let filteredData = [...transationRecord];

    if (dateFilter === 'thisWeek') {
      const startOfWeek = new Date();
      startOfWeek.setDate(now.getDate() - now.getDay());
      filteredData = filteredData.filter((item) => new Date(item.DateTime) >= startOfWeek);
    } else if (dateFilter === 'lastWeek') {
      const startOfLastWeek = new Date();
      startOfLastWeek.setDate(now.getDate() - now.getDay() - 7);
      const endOfLastWeek = new Date();
      endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
      filteredData = filteredData.filter((item) => new Date(item.DateTime) >= startOfLastWeek && new Date(item.DateTime) <= endOfLastWeek);
    } else if (dateFilter === 'last30Days') {
      const startOfRange = new Date();
      startOfRange.setDate(now.getDate() - 30);
      filteredData = filteredData.filter((item) => new Date(item.DateTime) >= startOfRange);
    } else if (dateFilter === 'last60Days') {
      const startOfRange = new Date();
      startOfRange.setDate(now.getDate() - 60);
      filteredData = filteredData.filter((item) => new Date(item.DateTime) >= startOfRange);
    } else if (dateFilter === 'last90Days') {
      const startOfRange = new Date();
      startOfRange.setDate(now.getDate() - 90);
      filteredData = filteredData.filter((item) => new Date(item.DateTime) >= startOfRange);
    } else if (dateFilter === 'custom') {
      const startDate = new Date(customStartDate);
      const endDate = new Date(customEndDate);
      filteredData = filteredData.filter((item) => new Date(item.DateTime) >= startDate && new Date(item.DateTime) <= endDate);
    }

    setFilteredTransactions(filteredData);
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Filtered_Transactions.xlsx');
  };

  return (
    <div>
      <div className="row pb-3">
        <div className="col-2 offset-10">
          <div className="d-flex justify-content-evenly align-items-center">
            <div className="text-dark">Limit :</div>
            <div>
              <select
                className="btn btn-light p-1"
                //  onChange={handleLimit} value={limit}
                style={{ border: '1px solid #10446c' }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <Row className="mainTransaction animate__animated animate__fadeInRight">
        <Col>
          <Card style={{ borderRadius: 15, border: '1px solid #10446c' }}>
            <Card.Header
              style={{
                borderBottom: '1px dashed #10446c'
              }}
            >
              <Row className="mb-3">
                <div className="col-8">
                  <Card.Title as="h4">
                    <FaRupeeSign
                      style={{
                        color: '#10446c',
                        marginRight: '8px',
                        fontSize: '40px',
                        padding: '5px',
                        backgroundColor: '#f1faee',
                        borderRadius: '50%',
                        border: '2px dashed #10446c'
                      }}
                    />
                    <b style={{ color: '#10446c' }}>Transactions List</b>
                  </Card.Title>
                </div>
                <div className="col-3">
                  <InputGroup>
                    <Form.Control
                      className="bg-white py-2"
                      style={{ border: '1px solid #10446c' }}
                      size="sm"
                      type="text"
                      placeholder="Search"
                    />
                  </InputGroup>
                </div>
              </Row>

              <Row className="mb-3">
                <Col md={3}>
                  <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Select Filter</Form.Label>
                  <Form.Select size="sm" style={{ border: '1px solid #10446c' }} onChange={(e) => setDateFilter(e.target.value)}>
                    <option value="">Select Date Filter</option>
                    <option value="thisWeek">This Week</option>
                    <option value="lastWeek">Last Week</option>
                    <option value="last30Days">Last 30 Days</option>
                    <option value="last60Days">Last 60 Days</option>
                    <option value="last90Days">Last 90 Days</option>
                    <option value="custom">Custom Date Range</option>
                  </Form.Select>
                </Col>
                {dateFilter === 'custom' && (
                  <>
                    <Col md={3}>
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        size="sm"
                        style={{ border: '1px solid #10446c' }}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                      />
                    </Col>
                    <Col md={3}>
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        size="sm"
                        style={{ border: '1px solid #10446c' }}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                      />
                    </Col>
                  </>
                )}
                <Col md={2} style={{marginTop:"27px"}}>
                  <Button style={{ backgroundColor: '#327cb3', border: 'none' }} size="sm" onClick={filterTransactions}>
                    Apply Filter
                  </Button>
                </Col>
                <Col md={3}  style={{marginTop:"27px"}}>
                  <Button size="sm" variant="success" onClick={exportToExcel}>
                    Export to Excel
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive hover bordered>
                <thead className="tableHeader">
                  <tr className="text-center">
                    <th>Sr No.</th>
                    <th>Project Name</th>
                    <th>Owner Name</th>
                    <th>Contractor Name</th>
                    <th>User Name</th>
                    <th>Transaction ID</th>
                    <th>Account Number</th>
                    <th>Account Type</th>
                    <th>Milestone</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody className="tableBody">
                  {filteredTransactions.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td>{item.sr_no}</td>
                      <td>{item.project_name}</td>
                      <td>{item.owner_name}</td>
                      <td>{item.contractor_name}</td>
                      <td>{item.username}</td>
                      <td>{item.transtionID}</td>
                      <td>{item.accountno}</td>
                      <td>{item.accounttype}</td>
                      <td>{item.milestone}</td>
                      <td>
                        <b className="text-success">Rs.{item.amount}/-</b>
                      </td>
                      <td>{item.DateTime}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Transaction;
