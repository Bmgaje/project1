import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center bg-light">
      <div className="text-center mt-5">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="fs-3">
          {' '}
          <span className="text-danger">Oops!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
