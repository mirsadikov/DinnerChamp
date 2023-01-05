import { Alert, Modal } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantImage } from '../Actions/restaurantActions';
import { LoadingButton } from '@mui/lab';
import defaultImg from '../Images/default-img.png';
import { UPDATE_IMAGE_RESET } from '../constants';

export default function ProfileImageUpdateModal({ open, setOpen, img }) {
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
    <Modal open={open} onClose={closeModal}>
      <div className="modal dashboard__profile-modal">
        <div className="modal__container">
          <h2 className="modal__title">Edit Profile Image</h2>
          {error && (
            <Alert className="modal__alert" severity="error">
              {error}
            </Alert>
          )}
          <img src={deleteImg ? defaultImg : newImg || (img ? img : defaultImg)} alt="profile" className="modal__profile-image" />
          <form className="modal__form" onSubmit={handleSave}>
            <input ref={fileInputRef} type="file" onChange={newImageHandler} className="modal__form-input" />

            <div className="modal__form-btns">
              <LoadingButton loading={loading} type="submit" className="modal__form-btn button button--primary">
                Save
              </LoadingButton>

              <button disabled={!(img || newImg) || deleteImg} className="modal__form-btn modal__form-btn--delete button" onClick={handleDeleteImg}>
                Delete
              </button>

              <button className="modal__form-btn modal__form-btn--cancel button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
