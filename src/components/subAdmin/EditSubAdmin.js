import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import menuItems from '../../menu-items';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import instance from '../../helpers/axiosInstance';

function EditSubAdmin() {
  const params = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const page = location?.state?.activePage;
  const limit = location?.state?.limit;

  let [id, setId] = useState([]);
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [isChecked, setIsChecked] = useState(false);
  let [updateMsg, setUpdateMsg] = useState(false);

  const [catchError, setCatchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    singleSubAdmin();
  }, []);

  function singleSubAdmin() {
    instance.get(Urls.get.getSingleSubAdmin + params.userId).then((res) => {
      setName(res?.data?.getAllMenus?.user?.name || '');
      setEmail(res?.data?.getAllMenus?.user?.email || '');
      setId(res?.data?.getAllMenus?.menus || []);
    });
  }

  // Single item selecte
  const checkbox_handler = (e) => {
    const menuId = e.target.value;
    const isSelected = e.target.checked;

    if (isSelected) {
      setId((prevIds) => [...prevIds, menuId]);
    } else {
      setId((prevIds) => prevIds.filter((filteredItem) => filteredItem !== menuId));
    }
  };

  // Select All
  const selectAll = () => {
    if (!isChecked) {
      const allIds = menuItems?.items?.[0]?.children?.flatMap((item) =>
        item.type === 'collapse' ? item.children?.map((child) => child.id) || [] : [item.id]
      );
      setId(allIds);
    } else {
      setId([]);
    }

    setIsChecked(!isChecked);
  };

  function update(e) {
    e.preventDefault();
    const payload = {
      name: name,
      email: email,
      menus: id
    };
    instance
      .put(Urls.put.updateSubAdmin + params.userId, payload)
      .then(() => {
        setUpdateMsg(true);
        setTimeout(() => {
          setUpdateMsg(false);
          navigate('/masters/subAdmin', { state: { activePage: page, limit: limit } });
        }, 2000);
      })
      .catch((error) => {
        console.error('Error updating sub-admin:', error);
        const msg = error?.response?.data?.message || 'Something went wrong!';
        setErrorMessage(msg);
        setCatchError(true);
        setTimeout(() => {
          setCatchError(false);
          setErrorMessage('');
        }, 2000);
      });
  }

  return (
    <div>
      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {updateMsg ? (
            <b>
              <Notification message="Data updated Successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-5 offset-7 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {catchError ? (
            <b>
              <Notification message={`Error: ${errorMessage} ❌`} />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5" style={{ color: '#10446c', fontSize: 'bold' }}>
                Update Sub Admin
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Name</Form.Label>
                      <Form.Control value={name} required onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>E-mail</Form.Label>
                      <Form.Control
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter Email"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Menu Selection */}
                <Row className="pt-4">
                  <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Select Fields for Give Access.</Form.Label>

                  {/* Select All Checkbox */}
                  <Col md={3} className="d-flex align-items-center">
                    <Form.Check
                      type="checkbox"
                      label={<span style={{ color: '#10446c' }}>Select All</span>}
                      checked={
                        id.length ===
                        menuItems?.items?.[0]?.children?.flatMap((item) =>
                          item.type === 'collapse' ? item.children?.map((child) => child.id) || [] : [item.id]
                        ).length
                      }
                      onChange={selectAll}
                    />
                  </Col>

                  {/* Individual Checkboxes */}
                  {menuItems?.items?.[0]?.children?.map((item, index) => {
                    if (item.type === 'collapse') {
                      return item.children?.map((child, childIndex) => (
                        <Col md={3} key={childIndex} className="d-flex align-items-center">
                          <Form.Check
                            type="checkbox"
                            value={child.id}
                            // label={child.title}
                            label={<span style={{ color: '#10446c' }}>{child.title}</span>}
                            checked={id.includes(child.id)}
                            onChange={checkbox_handler}
                          />
                        </Col>
                      ));
                    }
                    return (
                      <Col md={3} key={index} className="d-flex align-items-center">
                        <Form.Check
                          type="checkbox"
                          value={item.id}
                          // label={item.title}
                          label={<span style={{ color: '#10446c' }}>{item.title}</span>}
                          checked={id.includes(item.id)}
                          onChange={checkbox_handler}
                        />
                      </Col>
                    );
                  })}
                </Row>

                <Col xs="auto" className="pt-5">
                  <Button type="submit" variant="primary" size="sm" onClick={update}>
                    Update
                  </Button>
                  <Link to="/masters/subAdmin" state={{ activePage: page, limit: limit }}>
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

export default EditSubAdmin;

// import React, { useEffect, useState } from 'react';
// import { Button, Card, Col, Form, Row } from 'react-bootstrap';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import menuItems from '../../menu-items';
// import axios from 'axios';
// import { Urls } from '../../helpers/Urls';

// function EditSubAdmin() {
//   const params = useParams();
//   const navigate = useNavigate();

//   let [id, setId] = useState([]);
//   let [name, setName] = useState('');
//   let [email, setEmail] = useState('');
//   let [isChecked, setIsChecked] = useState(false);

//   let [updateMsg, setUpdateMsg] = useState(false);

//   function singleSubAdmin() {
//     axios.get(Urls.get.getSingleSubAdmin + params.userId).then((res) => {
//       setName(res?.data?.getAllMenus?.user?.name);
//       setEmail(res?.data?.getAllMenus?.user?.email);
//       setId(res?.data?.getAllMenus?.menus);
//     });
//   }

//   useEffect(() => {
//     singleSubAdmin();
//   }, []);

//   //Single item selected
//   const checkbox_handler = (e) => {
//     const isSelected = e.target.checked;

//     if (isSelected) {
//       setId([...id, e.target.value]);
//     } else {
//       setId(
//         id.filter((filteredItem) => {
//           return filteredItem !== e.target.value;
//         })
//       );
//     }
//   };

//   // All Item Selected

//   const selectAll = () => {
//     if (!isChecked) {
//       // Collect all IDs from menu items, including nested 'collapse' children
//       const id = menuItems?.items?.[0]?.children?.flatMap((item) =>
//         item.type === 'collapse' ? item.children?.map((child) => child.id) || [] : [item.id]
//       );

//       setId(id);
//     } else {
//       setId([]); // Deselect all
//     }

//     setIsChecked(!isChecked); // Toggle selection state
//   };

//   function update(e) {
//     e.preventDefault();
//     const payload = {
//       name: name,
//       email: email,
//       menus: id
//     };
//     axios
//       .put(Urls.put.updateSubAdmin + params.userId, payload)
//       .then(() => {
//         setUpdateMsg(true);
//         setTimeout(() => {
//           setUpdateMsg(false);
//           navigate('/masters/subAdmin');
//         }, 2000);
//       })
//       .catch((error) => {
//         console.error('Error updating sub-admin:', error);
//       });
//   }

//   return (
//     <div>
//       <div className="row position-relative">
//         <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
//           {updateMsg ? (
//             <b>
//               <Notification message="Data update successfully" />
//             </b>
//           ) : null}
//         </div>
//       </div>
//       <Row>
//         <Col sm={12}>
//           <Card>
//             <Card.Header>
//               <Card.Title as="h5" style={{ color: '#10446c', fontSize: 'bold' }}>
//                 Update Sub Admin
//               </Card.Title>
//             </Card.Header>
//             <Card.Body>
//               <Form>
//                 <Row>
//                   <div className="col-4">
//                     <Form.Group>
//                       <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Name</Form.Label>
//                       <Form.Control
//                         defaultValue={name}
//                         required
//                         onChange={(e) => {
//                           setName(e.target.value);
//                         }}
//                         type="text"
//                         placeholder="Enter Name"
//                       />
//                     </Form.Group>
//                   </div>

//                   <div className="col-4">
//                     <Form.Group>
//                       <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>E-mail</Form.Label>
//                       <Form.Control
//                         defaultValue={email}
//                         required
//                         onChange={(e) => {
//                           setEmail(e.target.value);
//                         }}
//                         type="text"
//                         placeholder="Enter Email Name"
//                       />
//                     </Form.Group>
//                   </div>
//                 </Row>
//                 <Row className="pt-4">
//                   <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Select Fields for Give Access.</Form.Label>
//                   <div className="col-3 d-flex align-items-center">
//                     <input type="checkbox" className="me-2" /> <span style={{ color: '#10446c' }}>Select All</span>
//                   </div>
//                   {menuItems?.items?.[0]?.children?.map((item, index) => {
//                     // Skip rendering the title for 'collapse' type but still map its children
//                     if (item.type === 'collapse') {
//                       return item.children?.map((child, childIndex) => (
//                         <div key={childIndex} className="col-3 d-flex align-items-center">
//                           <input type="checkbox" className="me-2" />
//                           <span style={{ color: '#10446c' }}>{child?.title}</span>
//                         </div>
//                       ));
//                     }

//                     // Render items that are NOT of type 'collapse'
//                     return (
//                       <div key={index} className="col-3 d-flex align-items-center">
//                         <input type="checkbox" className="me-2" />
//                         <span style={{ color: '#10446c' }}>{item?.title}</span>
//                       </div>
//                     );
//                   })}
//                 </Row>

//                 <Col xs="auto" className="pt-5">
//                   <Button
//                     type="submit"
//                     variant="primary"
//                     size="sm"
//                      onClick={update}
//                   >
//                     <Link className="text-white">Update</Link>
//                   </Button>
//                   <Link to={'/masters/subAdmin'} className="text-white">
//                     <Button variant="danger" size="sm">
//                       Cancel
//                     </Button>
//                   </Link>
//                 </Col>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default EditSubAdmin;
