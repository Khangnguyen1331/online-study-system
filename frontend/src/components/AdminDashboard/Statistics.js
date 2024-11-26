// src/components/AdminDashboard/Statistics.js - CẬP NHẬT NỘI DUNG
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatistics } from '../../redux/actions/adminActions';

const Statistics = () => {
  const dispatch = useDispatch();
  const { statistics, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row">
      <div className="col-md-4 mb-4">
        <div className="card bg-primary text-white h-100">
          <div className="card-body">
            <h5 className="card-title">Tổng số sinh viên</h5>
            <h2 className="card-text">{statistics?.totalStudents || 10}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card bg-success text-white h-100">
          <div className="card-body">
            <h5 className="card-title">Sinh viên Premium</h5>
            <h2 className="card-text">{statistics?.premiumStudents || 2}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card bg-info text-white h-100">
          <div className="card-body">
            <h5 className="card-title">Tổng doanh thu</h5>
            <h2 className="card-text">
              {(statistics?.totalRevenue || 1200000).toLocaleString('vi-VN')} VNĐ
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;