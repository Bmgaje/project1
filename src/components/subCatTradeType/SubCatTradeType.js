/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Pagination, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';

function SubCatTradeType() {
  const [SubCatTradeTypeData, setSubCatTradeTypeData] = useState([]);
  const [show, setShow] = useState(false);

  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [deleteId, setDeleteId] = useState(null);

  const fetchSubCatTradeType = () => {
    axios
      .get(Urls.get.subcattradetype + `?page=${activePage}&limit=${limit}&is_delete=no`)
      .then((res) => {
        console.log('sub-cattrade-type data', res);

        setTotalPages(res.data?.data.totalPages);
        setActivePage(res.data?.data.page);
        setSubCatTradeTypeData(res.data?.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = () => {
    axios.delete(Urls.delete.deleteSubCatTradeType + '/' + deleteId).then((res) => {
      fetchSubCatTradeType();
    });
  };

  useEffect(() => {
    fetchSubCatTradeType();
  }, [activePage, limit]);

  const handleLimit = (e) => {
    setLimit(e.target.value);
    setActivePage(1);
  };

  //  const handleSearch = (e) => {
  //    setSearch(e.target.value);
  //    setActivePage(1);
  //  };

  const handleClose = () => {
    setShow(false);
  };
  const deleteBTN = () => {
    handleClose();
    deleteItem();
  };
  return (
    <Row>
      <Col>
        <Card.Header>
          <Row>
            <div className="col-9 pt-1">
              <Card.Title as="h4">
                <b>SubCatTradeType Table</b>
              </Card.Title>
            </div>

            <div className="col-3 d-flex">
              <div>
                <Link to={'/masters/AddSubCatTradeType'}>
                  <Button variant="success" as="btn" size="md">
                    <FontAwesomeIcon icon={faAdd} />
                  </Button>
                </Link>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">Limit :</div>
                <div>
                  <select className="btn btn-light p-1" onChange={handleLimit} value={limit}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
            </div>
          </Row>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Trade Type</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {SubCatTradeTypeData.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.tradeCategory.title}</td>
                    <td>{item.tradeTypeCat.title}</td>
                    <td>{item.title}</td>
                    <td>
                      <b>{item.status === true ? 'Active' : 'In-Active'}</b>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        as="btn"
                        size="sm"
                        onClick={() => {
                          setShow(true);
                          setDeleteId(item._id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>

                      <Button variant="success" as="btn" size="sm">
                        <Link to={'/masters/EditSubCatTradeType/' + item._id} className="text-white">
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <Card title="Pagination" className="d-flex justify-content-center align-items-center">
            <Pagination>
              {Array(totalPages)
                .fill('')
                .map((item, index) => (
                  <Pagination.Item key={index} onClick={() => setActivePage(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
            </Pagination>
          </Card>
        </Card.Body>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete the user</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteBTN}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

export default SubCatTradeType;
