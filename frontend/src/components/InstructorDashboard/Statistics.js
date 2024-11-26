// src/components/InstructorDashboard/Statistics.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstructorStats } from '../../redux/actions/instructorActions';

const Statistics = () => {
  const dispatch = useDispatch();
  const { statistics, loading } = useSelector(state => state.instructor);

  useEffect(() => {
    dispatch(getInstructorStats());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="row">
      <div className="col-md-3 mb-4">
        <div className="card bg-primary text-white h-100">
          <div className="card-body">
            <h5 className="card-title">Tổng số khóa học</h5>
            <h2 className="card-text">{statistics?.totalCourses || 0}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="card bg-success text-white h-100">
          <div className="card-body">
            <h5 className="card-title">Tổng số sinh viên</h5>
            <h2 className="card-text">{statistics?.totalStudents || 0}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="card bg-info text-white h-100">
          <div className="card-body">
            <h5 className="card-title"> Tổng Bài giảng lý thuyết</h5>
            <h2 className="card-text">{statistics?.totalLessons || 0}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="card bg-warning text-white h-100">
          <div className="card-body">
            <h5 className="card-title">Tổng Video bài giảng</h5>
            <h2 className="card-text">{statistics?.totalVideos || 0}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;