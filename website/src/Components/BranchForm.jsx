import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Alert, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { BRANCH_FORM_RESET } from '../constants';
import { createBranch, updateBranch } from '../Actions/branchActions';

export default function BranchForm() {
  const [editId, setEditId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [running, setRunning] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { loading, error, success } = useSelector((state) => state.branchForm);

  useEffect(() => {
    return () => {
      dispatch({ type: BRANCH_FORM_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    // get state from history
    if (location.state) {
      const { branch } = location.state;
      setEditId(branch.id);
      setName(branch.name);
      setEmail(branch.email);
      setPhone(branch.phone || '');
      setCity(branch.city);
      setAddress(branch.address);
      setRunning(branch.running);
    }
  }, [location.state]);

  useEffect(() => {
    if (success) {
      dispatch({ type: BRANCH_FORM_RESET });
      navigate('/dashboard/branches');
    }
  }, [success, navigate, dispatch]);

  function submitHandler(e) {
    e.preventDefault();

    if (password !== password2) {
      alert('Passwords do not match');
      return;
    }

    if (editId) {
      const updateData = {
        name,
        email,
        phone,
        address,
        city,
        running,
        password: password.trim() === '' ? undefined : password,
      };
      dispatch(updateBranch(editId, updateData));
    } else {
      if (password.trim() === '') {
        alert('Password is required');
        return;
      }

      dispatch(
        createBranch({
          name,
          email,
          phone,
          address,
          city,
          running,
          password,
        })
      );
    }
  }

  return (
    <div className="dashboard__card branchform">
      <div className="dashboard__card-header branchform__header">
        <Link
          to="/dashboard/branches "
          className="branchform__back button button--small button--primary"
        >
          <ArrowBackIosNewIcon />
        </Link>
        <h2 className="dashboard__card-title">{editId ? 'Edit Branch' : 'Create new branch'}</h2>
      </div>

      {error && (
        <Alert className="branchform__alert" severity="error">
          {error}
        </Alert>
      )}

      <form className="branchform__form form form--small" onSubmit={submitHandler}>
        <div className="branchform__form-group">
          <div className="form__group">
            <label htmlFor="name" className="branchform__label form__label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="branchform__input form__control"
              placeholder="Enter branch name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="form__group-2 branchform__form-group">
          <div className="form__group">
            <label htmlFor="email" className="branchform__label form__label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="branchform__input form__control"
              placeholder="Enter branch email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="phone" className="branchform__label form__label">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="branchform__input form__control"
              placeholder="Enter branch phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="form__group-2 branchform__form-group">
          <div className="form__group">
            <label htmlFor="address" className="branchform__label form__label">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="branchform__input form__control"
              placeholder="Enter branch address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="city" className="branchform__label form__label">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="branchform__input form__control"
              placeholder="Enter branch city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>

        <div className="form__group-2 branchform__form-group">
          <div className="form__group">
            <label htmlFor="password" className="branchform__label form__label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="branchform__input form__control"
              placeholder="Enter branch password"
              value={password}
              required={!editId}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="password2" className="branchform__label form__label">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              className="branchform__input form__control"
              placeholder="Confirm branch password"
              value={password2}
              required={!editId}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
        </div>

        <div className="form__group-2 branchform__form-group">
          <div className="form__group form__group--row">
            <label htmlFor="onSale" className="branchform__label form__label">
              Running
            </label>
            <div className="branchform__input form__control branchform__input--switch">
              <Switch
                name="running"
                id="running"
                inputProps={{ 'aria-label': 'controlled' }}
                checked={running}
                onChange={(e) => setRunning(e.target.checked)}
              />
            </div>
          </div>
        </div>

        <div className="branchform__buttons">
          <LoadingButton
            loading={loading}
            type="submit"
            className="branchform__submit button button--primary button--small"
          >
            {editId ? 'Update' : 'Create'}
          </LoadingButton>
          <Link
            to="/dashboard/branches"
            className="branchform__cancel button button--small button--secondary"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
