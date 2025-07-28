import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../../../assets/scss/logo.css';

import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';
import mainLogo from '../../../.././assets/images/bluecallerlogo.png';

const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <React.Fragment>
      <div className="navbar-brand header-logo">
        <Link to="#" className="b-brand">
          {/* <div className="logo-main"></div> */}
          <div>
            {/* In this image tag in navbar logo change */}
            <img src={mainLogo} alt="No Logo" style={{ width: '30px', height: '30px' }} />
          </div>
          <span className="b-title">Blue Caller</span>
        </Link>
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
          <span />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
