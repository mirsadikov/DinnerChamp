import { Alert, Modal } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantDetails, updateRestaurantImage } from '../Actions/restaurantActions';
import { LoadingButton } from '@mui/lab';
import defaultImg from '../Images/default-img.png';
import { UPDATE_IMAGE_RESET, UPDATE_RESTAURANT_RESET } from '../constants';

export function ProfileImageUpdateModal({ open, setOpen, img }) {
  const [newImg, setNewImg] = useState(null);
  const [deleteImg, setDeleteImg] = useState(false);
  const [file, setFile] = useState();

  const dispatch = useDispatch();
  const imageStatus = useSelector((state) => state.updateImage);
  const { loading, error, success } = imageStatus;

  useEffect(() => {
    if (success) {
      setOpen(false);
    }
  }, [success, setOpen]);

  const fileInputRef = useRef();

  const reader = new FileReader();
  reader.onload = (e) => {
    setNewImg(e.target.result);
  };

  const closeModal = () => {
    setOpen(false);
    setNewImg(null);
    setDeleteImg(false);
    error && dispatch({ type: UPDATE_IMAGE_RESET });
  };

  const newImageHandler = (e) => {
    setFile(e.target.files[0]);
    setDeleteImg(false);
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!deleteImg && !newImg) {
      setOpen(false);
      return;
    }

    if (deleteImg) {
      await dispatch(updateRestaurantImage());
    } else if (newImg) {
      await dispatch(updateRestaurantImage(file));
    }
  };

  const handleDeleteImg = (e) => {
    e.preventDefault();
    setDeleteImg(true);
    setFile(null);
    setNewImg(null);

    fileInputRef.current.value = null;
  };

  return (
    <Modal open={open} onClose={closeModal} className="modal">
      <div className="modal__layer">
        <div className="modal__container dashboard__profile-modal">
          <h2 className="modal__title">Edit Profile Image</h2>
          {error && (
            <Alert className="modal__alert" severity="error">
              {error}
            </Alert>
          )}
          <img
            src={deleteImg ? defaultImg : newImg || (img ? img : defaultImg)}
            alt="profile"
            className="modal__profile-image"
          />
          <form className="modal__form" onSubmit={handleSave}>
            <input
              ref={fileInputRef}
              type="file"
              onChange={newImageHandler}
              className="modal__form-input"
            />

            <div className="modal__form-btns">
              <LoadingButton
                loading={loading}
                type="submit"
                className="modal__form-btn button button--primary button--small"
              >
                Save
              </LoadingButton>

              <button
                disabled={!(img || newImg) || deleteImg || loading}
                className="modal__form-btn modal__form-btn--delete button button--small"
                onClick={handleDeleteImg}
              >
                Delete
              </button>

              <button
                className="modal__form-btn modal__form-btn--cancel button button--small"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export function ProfileDetailsUpdateModal({ open, setOpen, details }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const dispatch = useDispatch();
  const updateStatus = useSelector((state) => state.updateDetails);
  const { loading, error, success } = updateStatus;

  useEffect(() => {
    if (success) {
      setOpen(false);
    }
  }, [success, setOpen]);

  useEffect(() => {
    setName(details.name);
    setEmail(details.email);
    setPhone(details.phone || '');
    setDescription(details.description || '');
    setAddress(details.address || '');
    setCity(details.city || '');

    return () => {};
  }, [details, dispatch, open]);

  const closeModal = (e) => {
    e.preventDefault();
    setOpen(false);
    setName('');
    setEmail('');
    setPhone('');
    setDescription('');
    error && dispatch({ type: UPDATE_RESTAURANT_RESET });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let detailsToUpdate = {
      name,
      email,
      phone,
      description,
      address,
      city,
    };

    dispatch(updateRestaurantDetails(detailsToUpdate));
  };

  return (
    <Modal open={open} onClose={closeModal} className="modal">
      <div className="modal__layer">
        <div className="modal__container dashboard__profile-modal">
          <h2 className="modal__title">Edit Profile Details</h2>
          {error && (
            <Alert className="modal__alert" severity="error">
              {error}
            </Alert>
          )}
          <form className="modal__form form form--small" onSubmit={handleSubmit}>
            <div className="modal__form-group form__group">
              <label htmlFor="name" className="modal__form-label form__label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="modal__form-input form__control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>

            <div className="modal__form-group form__group">
              <label htmlFor="email" className="modal__form-label form__label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="modal__form-input form__control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>

            <div className="modal__form-group form__group">
              <label htmlFor="phone" className="modal__form-label form__label">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="modal__form-input form__control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="12356789"
              />
            </div>

            <div className="modal__form-group form__group">
              <label htmlFor="phone" className="modal__form-label form__label">
                City
              </label>
              <input
                type="text"
                id="city"
                className="modal__form-input form__control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Street City"
              />
            </div>

            <div className="modal__form-group form__group">
              <label htmlFor="phone" className="modal__form-label form__label">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="modal__form-input form__control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street Address"
              />
            </div>

            <div className="modal__form-group form__group">
              <label htmlFor="description" className="modal__form-label form__label">
                Description
              </label>
              <textarea
                id="description"
                className="modal__form-input form__control modal__form-input--textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Information about company"
              />
            </div>

            <div className="modal__form-btns">
              <LoadingButton
                loading={loading}
                type="submit"
                className="modal__form-btn button button--primary button--small"
              >
                Save
              </LoadingButton>

              <button
                className="modal__form-btn modal__form-btn--cancel button button--small"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
