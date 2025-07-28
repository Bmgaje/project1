import React, { useEffect, useState } from 'react';
import { ClientJS } from 'clientjs';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import errorHandler from '../../helpers/errorHandler';
import instance from '../../helpers/axiosInstance';

function Test() {
  const [sessions, setSessions] = useState([]);
  const [fingerprint, setFingerprint] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const client = new ClientJS();
    setFingerprint(client.getFingerprint());
  }, []);

  useEffect(() => {
    getSessions();
  }, []);

  const getSessions = async () => {
    try {
      setLoading(true);
      const res = await instance.get('api/user/sessions');
      if (res.data) {
        setSessions(res.data?.sessions || []);
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async (id) => {
    try {
      const res = await instance.delete(`api/user/session/${id}`);
      if (res.data.message) {
        getSessions();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  if (loading)
    return (
      <h4 className="d-flex align-items-center justify-content-center" style={{ minHeight: '40vh' }}>
        Loading ....
      </h4>
    );

  return (
    <div>
      {sessions?.length ? (
        sessions?.map((item) => (
          <div
            key={item?.deviceId}
            className="d-flex text-dark border border-dark/50 p-2 rounded justify-content-between align-items-center mb-3"
          >
            <div>
              {parseInt(item?.deviceId) === parseInt(fingerprint) && <p className="badge bg-success">Current</p>}
              <p>
                Google {item?.session?.browser} {item?.deviceId} &#40;{item?.session?.os}&#41; &nbsp;
              </p>
              <p>Last Active: {format(new Date(item?.createdAt), 'dd MMMM yyyy, h.mm a')}</p>
            </div>
            <button onClick={() => logoutUser(item?.deviceId)} className="btn btn-danger btn-sm" type="button">
              Logout
            </button>
          </div>
        ))
      ) : (
        <p>No active sessions</p>
      )}
    </div>
  );
}

export default Test;
