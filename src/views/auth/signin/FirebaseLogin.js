import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';

const FirebaseLogin = ({ className, ...rest }) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: 'info@codedthemes.com',
          password: '123456',
          submit: null
        }}
      >
        <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              label="Email Address / Username"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>

          <div className="form-group mb-4">
            <input className="form-control" label="Password" name="password" type="password" value={values.password} />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert variant="danger">{errors.submit}</Alert>
            </Col>
          )}

          <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          <Row>
            <Col mt={2}>
              <Button className="btn-block" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                Signin
              </Button>
            </Col>
          </Row>
        </form>
      </Formik>
    </React.Fragment>
  );
};

FirebaseLogin.propTypes = {
  className: PropTypes.string
};

export default FirebaseLogin;
