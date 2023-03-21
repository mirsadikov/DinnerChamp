import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { EMPLOYEE_FORM_RESET } from '../constants';
import { createEmployee, updateEmployee } from '../Actions/employeeActions';

export default function EmployeeForm() {
  const [editId, setEditId] = useState('');
  const [name, setName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { loading, error, success } = useSelector((state) => state.employeeForm);

  useEffect(() => {
    // get state from history
    if (location.state) {
      const { employee } = location.state;
      setEditId(employee.id);
      setName(employee.name);
      setStaffId(employee.staffId);
    }

    return () => {
      dispatch({ type: EMPLOYEE_FORM_RESET });
      setValidationError(false);
    };
  }, [location.state, dispatch]);

  useEffect(() => {
    if (success) {
      dispatch({ type: EMPLOYEE_FORM_RESET });
      navigate('/dashboard/employees');
    }
  }, [success, navigate, dispatch]);

  function submitHandler(e) {
    e.preventDefault();

    // validate form with trim
    if (!name.trim() || !staffId.trim()) {
      setValidationError(true);
      return;
    }

    const passwordTrimmed = password.trim();

    if (editId) {
      dispatch(updateEmployee(editId, name, staffId, passwordTrimmed));
    } else {
      dispatch(createEmployee(name, staffId, passwordTrimmed));
    }
  }

  return (
    <div className="dashboard__card employeeform">
      <div className="dashboard__card-header employeeform__header">
        <Link
          to="/dashboard/employees"
          className="employeeform__back button button--small button--primary"
        >
          <ArrowBackIosNewIcon />
        </Link>
        <h2 className="dashboard__card-title">
          {editId ? 'Edit Employee' : 'Create new employee'}
        </h2>
      </div>

      {error && (
        <Alert className="employeeform__alert" severity="error">
          {error}
        </Alert>
      )}
      {validationError && (
        <Alert className="employeeform__alert" severity="error">
          Please fill in all fields
        </Alert>
      )}

      <form className="employeeform__form form form--small" onSubmit={submitHandler}>
        <div className="employeeform__form-group">
          <div className="form__group">
            <label htmlFor="name" className="employeeform__label form__label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="employeeform__input form__control"
              placeholder="Enter employee name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="employeeform__form-group form__group-2">
          <div className="form__group">
            <label htmlFor="staffid" className="employeeform__label form__label">
              Staff ID
            </label>
            <input
              type="number"
              name="staffid"
              id="staffid"
              className="employeeform__input form__control"
              placeholder="Enter id for staff"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="employeeform__label form__label">
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              className="employeeform__input form__control"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="employeeform__buttons">
          <LoadingButton
            loading={loading}
            type="submit"
            className="employeeform__submit button button--primary button--small"
          >
            {editId ? 'Update' : 'Create'}
          </LoadingButton>
          <Link
            to="/dashboard/employees"
            className="employeeform__cancel button button--small button--secondary"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
