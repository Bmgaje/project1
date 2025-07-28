import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import NavIcon from '../NavIcon';
import NavBadge from '../NavBadge';

import { ConfigContext } from '../../../../../contexts/ConfigContext';
import * as actionType from '../../../../../store/actions';
import useWindowSize from '../../../../../hooks/useWindowSize';

import menuItems from '../../../../../menu-items';

const getUserPermissions = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const usersPermission = JSON.parse(localStorage.getItem('usersPermission'));

  let allowedRoutes = [];

  if (!user) {
    return [];
  }
  if (user?.role === 'superadmin') {
    allowedRoutes =
      menuItems?.items?.[0]?.children?.flatMap((item) => (item.type === 'collapse' ? item.children.map((child) => child.id) : [item.id])) ||
      [];
  } else if (user?.role === 'subadmin') {
    allowedRoutes = usersPermission?.menus || [];
  }

  return allowedRoutes;
};

const userPermissions = getUserPermissions();

const NavItem = ({ item }) => {
  const windowSize = useWindowSize();
  const configContext = useContext(ConfigContext);
  const { dispatch } = configContext;

  // Get user role
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role;

  // Check if menu should be visible
  const hasPermission = userRole === 'superadmin' || userPermissions.includes(item.id);

  if (!hasPermission) return null; // Hide menu if not permitted

  let itemTitle = item.icon ? <span className="pcoded-mtext">{item.title}</span> : item.title;
  let itemTarget = item.target ? '_blank' : '';

  let subContent = item.external ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer">
      <NavIcon items={item} />
      {itemTitle}
      <NavBadge items={item} />
    </a>
  ) : (
    <NavLink to={item.url} className="nav-link" target={itemTarget}>
      <NavIcon items={item} />
      {itemTitle}
      <NavBadge items={item} />
    </NavLink>
  );

  let mainContent =
    windowSize.width < 992 ? (
      <ListGroup.Item as="li" bsPrefix=" " className={item.classes} onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
        {subContent}
      </ListGroup.Item>
    ) : (
      <ListGroup.Item as="li" bsPrefix=" " className={item.classes}>
        {subContent}
      </ListGroup.Item>
    );

  return <>{mainContent}</>;
};

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
  // item: PropTypes.object,
  title: PropTypes.string,
  icon: PropTypes.string,
  target: PropTypes.string,
  external: PropTypes.bool,
  url: PropTypes.string,
  classes: PropTypes.string
};

export default NavItem;
