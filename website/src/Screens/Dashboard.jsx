import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Categories from '../Components/Categories';
import DashboardCard from '../Components/DashboardCard';
import Dishes from '../Components/Dishes';
import DishForm from '../Components/DishForm';
import EmployeeForm from '../Components/EmployeeForm';
import Employees from '../Components/Employees';
import ProfileCard from '../Components/ProfileCard';
import ProfileForm from '../Components/ProfileForm';
import Branches from '../Components/Branches';
import BranchForm from '../Components/BranchForm';

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
          <NavLink to="/dashboard/" className="dashboard__card">
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/dishes" className="dashboard__card">
            View Dishes
          </NavLink>
          <NavLink to="/dashboard/categories" className="dashboard__card">
            View Categories
          </NavLink>
          <NavLink to="/dashboard/employees" className="dashboard__card">
            View Employees
          </NavLink>
          <NavLink to="/dashboard/branches" className="dashboard__card">
            View Branches
          </NavLink>
        </div>
        <div className="dashboard__block dashboard__column">
          <Routes>
            <Route path="/" element={<DashboardCard />} />
            <Route path="/profileform" element={<ProfileForm />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/dishes/form" element={<DishForm />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/form" element={<EmployeeForm />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/branches/form" element={<BranchForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
