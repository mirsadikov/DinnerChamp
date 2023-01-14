import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Categories from '../Components/Categories';
import Dishes from '../Components/Dishes';
import ProfileCard from '../Components/ProfileCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!info) {
      navigate('/login');
    }
  }, [info, navigate]);

  return (
    <div className="dashboard">
      <div className="container dashboard__container">
        <div className="dashboard__main dashboard__column">
          <h2 className="dashboard__title">Profile</h2>
          <ProfileCard info={info} />
          <NavLink to="/dashboard/dishes" className="dashboard__card">
            View Dishes
          </NavLink>
          <NavLink to="/dashboard/categories" className="dashboard__card">
            View Categories
          </NavLink>
        </div>
        <div className="dashboard__block dashboard__column">
          <Routes>
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
