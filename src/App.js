import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import routes, { RenderRoutes } from './routes';

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
        <RenderRoutes routes={routes} />
      </BrowserRouter>
      <ToastContainer />
    </React.Fragment>
  );
};

export default App;
