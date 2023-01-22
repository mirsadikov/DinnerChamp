import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Alert, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { UPDATE_RESTAURANT_RESET } from '../constants';
import { updateRestaurantDetails } from '../Actions/restaurantActions';

export default function ProfileForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [running, setRunning] = useState(false);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const updateStatus = useSelector((state) => state.updateDetails);
  const { loading, error, success } = updateStatus;

  useEffect(() => {
    return () => {
      dispatch({ type: UPDATE_RESTAURANT_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    if (!location.state?.details) navigate('/dashboard/');

    // get state from history
    if (location.state?.details) {
      const { details } = location.state;
      setName(details.name);
      setEmail(details.email);
      setDescription(details.description || '');
      setRunning(details.running);
      setPhone(details.phone || '');
      setAddress(details.address || '');
      setCity(details.city || '');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (success) {
      dispatch({ type: UPDATE_RESTAURANT_RESET });
      navigate('/dashboard/');
    }
  }, [success, navigate, dispatch]);

  function submitHandler(e) {
    e.preventDefault();

    let detailsToUpdate = {
      name,
      email,
      phone,
      description,
      address,
      city,
      running,
    };

    dispatch(updateRestaurantDetails(detailsToUpdate));
  }

  return (
    <div className="dashboard__card profileform">
      <div className="dashboard__card-header profileform__header">
        <Link to="/dashboard/" className="profileform__back button button--small button--primary">
          <ArrowBackIosNewIcon />
        </Link>
        <h2 className="dashboard__card-title">Edit Profile</h2>
      </div>

      {error && (
        <Alert className="profileform__alert" severity="error">
          {error}
        </Alert>
      )}

      <form className="profileform__form form form--small" onSubmit={submitHandler}>
        <div className="form__group-2 profileform__form-group">
          <div className="form__group form__group--row">
            <label htmlFor="running" className="profileform__label form__label">
              Operating
            </label>
            <div className="profileform__input form__control profileform__input--switch">
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

        <div className="profileform__form-group">
          <div className="form__group">
            <label htmlFor="name" className="profileform__label form__label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="profileform__input form__control"
              placeholder="Enter name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="profileform__form-group">
          <div className="form__group">
            <label htmlFor="email" className="profileform__label form__label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="profileform__input form__control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form__group-2 profileform__form-group">
          <div className="form__group">
            <label htmlFor="city" className="profileform__label form__label">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="profileform__input form__control"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="phone" className="profileform__label form__label">
              Phone
            </label>
            <input
              name="phone"
              id="phone"
              type="text"
              placeholder="Enter phone number"
              className="profileform__input form__control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        
        <div className="profileform__form-group">
          <div className="form__group">
            <label htmlFor="address" className="profileform__label form__label">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="profileform__input form__control"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="profileform__form-group">
          <div className="form__group">
            <label htmlFor="description" className="profileform__label form__label">
              Description
            </label>
            <textarea
              className="profileform__input form__control profileform__input--textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Information about company"
            />
          </div>
        </div>

        <div className="profileform__buttons">
          <LoadingButton
            loading={loading}
            type="submit"
            className="profileform__submit button button--primary button--small"
          >
            Update
          </LoadingButton>
          <Link
            to="/dashboard/"
            className="profileform__cancel button button--small button--secondary"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
