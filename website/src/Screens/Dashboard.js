import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Categories from '../Components/Categories';
import Dishes from '../Components/Dishes';
import ProfileCard from '../Components/ProfileCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant);
  const { info } = restaurant;

  useEffect(() => {
    if (!info) {
      navigate('/login');
    }
  }, [info, navigate, dispatch]);

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
