/* eslint-disable no-unused-vars */
import React, { Fragment, lazy, useState, useEffect, useMemo, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import Signin1 from './views/auth/signin/SignIn1';
import Signup1 from './views/auth/signup/Signup1';
import { mainDomain } from './helpers/Urls';
import NotFoundPage from './views/NotFound/NotFound';

export const RenderRoutes = ({ routes = [] }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const auth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return setIsAuth(false);

        const response = await axios.get(`${mainDomain}api/user/current-user`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        });

        if (response?.data?.user?._id) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Auth Error:', error.message);
          setIsAuth(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    auth();
    return () => controller.abort();
  }, []);

  const renderRoutes = useMemo(
    () =>
      routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? <RenderRoutes routes={route.routes} /> : <Element />}</Layout>
              </Guard>
            }
          />
        );
      }),
    [routes]
  );

  if (isLoading) return <Loader />;

  return (
    <Suspense>
      {!isAuth ? (
        <Routes>
          <Route path="/signin" element={<Signin1 />} />
          <Route path="/signup" element={<Signup1 />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      ) : (
        <Routes>{renderRoutes}</Routes>
      )}
    </Suspense>
  );
};

const routes = [
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      { path: '/', element: lazy(() => import('./views/dashboard')) },
      { path: '/signup', element: lazy(() => import('./views/auth/signup/Signup1')) },
      { path: '/signin', element: lazy(() => import('./views/auth/signin/SignIn1')) },
      { path: '/basic/button', element: lazy(() => import('./views/ui-elements/basic/BasicButton')) },
      { path: '/basic/badges', element: lazy(() => import('./views/ui-elements/basic/BasicBadges')) },
      { path: '/basic/breadcrumb', element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb')) },
      { path: '/basic/pagination', element: lazy(() => import('./views/ui-elements/basic/BasicPagination')) },
      { path: '/basic/collapse', element: lazy(() => import('./views/ui-elements/basic/BasicCollapse')) },
      { path: '/basic/tabs-pills', element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills')) },
      { path: '/basic/typography', element: lazy(() => import('./views/ui-elements/basic/BasicTypography')) },
      { path: '/forms/form-basic', element: lazy(() => import('./views/forms/FormsElements')) },
      { path: '/forms/AddUserForm', element: lazy(() => import('./views/tables/Functions/AddUserForm')) },
      { path: '/forms/UpdateForm', element: lazy(() => import('./views/tables/Functions/UpdateUserForm')) },
      { path: '/tables/bootstrap', element: lazy(() => import('./views/tables/BootstrapTable')) },
      { path: '/hoverTables/bootstrap', element: lazy(() => import('./views/tables/HoverTable')) },
      { path: '/charts/nvd3', element: lazy(() => import('./views/charts/nvd3-chart')) },
      { path: '/sample-page', element: lazy(() => import('./views/extra/SamplePage')) },
      { path: '/report', element: lazy(() => import('./components/report/Report')) },
      { path: '/report/addReport', element: lazy(() => import('./components/report/AddReport')) },
      { path: '/report/editReport/:id', element: lazy(() => import('./components/report/EditReason')) },
      { path: '/badge', element: lazy(() => import('./components/Badge/Badge')) },
      { path: '/addbadge', element: lazy(() => import('./components/Badge/AddBadge')) },
      { path: '/editbadge/:id', element: lazy(() => import('./components/Badge/EditBadge')) },
      { path: '/issuereport', element: lazy(() => import('./components/IssueReport/IssueReport')) },
      { path: '/issueDetails/:id', element: lazy(() => import('./components/IssueReport/IssueDetails')) },
      { path: '/project', element: lazy(() => import('./components/project/ProjectList')) },
      { path: '/projectDetails/:id', element: lazy(() => import('./components/project/ProjectDetails')) },
      { path: '/badgerequest', element: lazy(() => import('./components/userBadgeRequest/BadgeRequest')) },
      { path: '/test', element: lazy(() => import('./components/test/Test')) },
      { path: '/setting', element: lazy(() => import('./components/settings/Settings')) },
      { path: '/masters/leaderBoard', element: lazy(() => import('./components/leaderBoard/LeaderBoard')) },
      { path: '/AI/all-entry', element: lazy(() => import('./components/AI/AllEntry')) },
      { path: '/AI/AddEntry', element: lazy(() => import('./components/AI/AddEntry')) },
      { path: '/AI/EditEntry/:id', element: lazy(() => import('./components/AI/EditEntry')) },
      { path: '/tansaction', element: lazy(() => import('./components/transaction/Transaction')) },
      { path: '/bankdetails', element: lazy(() => import('./components/transaction/BankDetails')) },
      { path: '/bankdetailsview/:id', element: lazy(() => import('./components/transaction/BankDetailsView')) },
      { path: '/projectwisepayment', element: lazy(() => import('./components/projectTransaction/ProjectWisePayment')) },
      { path: '/projectwisepaymentDetails/:id', element: lazy(() => import('./components/projectTransaction/PaymentDetails')) },
      { path: '*', element: lazy(() => import('./views/NotFound/NotFound')) }
    ]
  }
];

RenderRoutes.propTypes = {
  routes: PropTypes.array
};

export default routes;
