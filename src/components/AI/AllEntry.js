import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Pagination, Button, InputGroup, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';

function AllEntry() {

  const [proposals, setProposals] = useState([])
  let [totalPages, setTotalpages] = useState(0);
  let [page, setPage] = useState(1);
  let [itemLimit, setItemLimit] = useState(1)
  const [searchText, setSearchText] = useState('');
  let [watch, setWatch] = useState(false);
  let [delProposal, setDelProposal] = useState(null);

  useEffect(() => {
    fetchProposals();
  }, [])

  const fetchProposals = async () => {
    const { data } = await axios.get(Urls.get.getAllProposals + `?page=${page}&q=${searchText}&limit=${itemLimit}`);
    setProposals(data.data.docs);
    setTotalpages(data.data?.totalPages);
    setPage(data.data?.page);
  }

  function deleteRecord() {
    axios.delete(Urls.delete.deleteProposal + "/" + delProposal).then(() => {
      fetchProposals();
    });

  }

  useEffect(() => {
    fetchProposals();
  }, [page, searchText, itemLimit]);

  useEffect(() => {
    fetchProposals();
  }, []);

  function ModelClose() {
    setWatch(false);
  }

  function deleteItem() {
    ModelClose();
    deleteRecord();
  }

  function changeLimit(e) {
    setItemLimit(e.target.value)
    setPage(1)
  }
  return (
    <Row>
      <Col>
        <Card.Header>
          <Row>
            <div className="col-6 pt-1">
              <Card.Title as="h4">
                <b>All Entry</b>
              </Card.Title>
            </div>
            <div className="col-3 d-flex">
              <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                <InputGroup>
                  <Form.Control className="bg-white py-2 "
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text" placeholder=" Search" />
                </InputGroup>
              </Form.Group>
            </div>

            <div className="col-3 d-flex">
              <div>
                <Link to={'/AI/AddEntry'}>
                  <Button variant="success" as="btn" size="md">
                    <FontAwesomeIcon icon={faAdd} />
                  </Button>
                </Link>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">Limit :</div>
                <div>
                  <select className="btn btn-light p-1" onChange={changeLimit} value={itemLimit}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
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
                <th>Sr.</th>
                <th>Title</th>
                <th>Overview</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {proposals.length > 0 && proposals.map((proposal, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{proposal.title}</td>
                  <td><div dangerouslySetInnerHTML={{ __html: proposal.overview.substring(0, 30) + "..." }} /></td>
                  <td>
                    <Button onClick={() => {
                      setWatch(true);
                      setDelProposal(proposal._id);
                    }} variant="danger" as="btn" size="sm">
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button variant="success" as="btn" size="sm">
                      <Link to={'/AI/EditEntry/' + proposal._id} className="text-white">
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Card title="Pagination" className="d-flex justify-content-center align-items-center">
            <Pagination className="mt-3">
              {Array(totalPages)
                .fill('')
                .map((item, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setPage(index + 1)}
                      className={`btn btn-sm btn-${page === index + 1 ? 'warning' : 'primary'} m-1`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
            </Pagination>
          </Card>
        </Card.Body>
      </Col>
      <Modal show={watch} onHide={ModelClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete the proposal</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ModelClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteItem}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

export default AllEntry;
