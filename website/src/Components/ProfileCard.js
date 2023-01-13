import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { img_endpoint } from '../config';
import { ProfileDetailsUpdateModal, ProfileImageUpdateModal } from './ProfileUpdateModals';
import defaultImg from '../Images/default-img.png';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurant } from '../Actions/restaurantActions';

export default function ProfileCard({ info }) {
  const dispatch = useDispatch();

  const [openImgModal, setOpenImgModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const profile = useSelector((state) => state.details);
  const { info: details, loading: detailsLoading, error: detailsError } = profile;

  useEffect(() => {
    if (!details && info) dispatch(getRestaurant(info.id));
  }, [dispatch, info, details]);

  return (
    <>
      <div className="dashboard__card profile">
        {detailsLoading && <CircularProgress />}
        {detailsError && <h3>{detailsError}</h3>}
        {details && (
          <>
            <div className="profile__img-container" onClick={() => setOpenImgModal(true)}>
              <img
                src={details?.img ? img_endpoint + details?.img : defaultImg}
                className="profile__image"
                alt="profile"
              />
              <div className="profile__img-edit">
                <EditIcon />
              </div>
            </div>
            <div className="profile__details">
              <h3 className="profile__name">{details?.name}</h3>
              <p>
                <b>Email: </b>
                {details.email}
              </p>
              {details.phone && (
                <p>
                  <b>Phone: </b>+{details.phone}
                </p>
              )}
              {details.address && (
                <p>
                  <b>Address: </b>
                  {details.address}
                </p>
              )}
              {details.description && (
                <p>
                  <b>Info: </b>
                  {details.description}
                </p>
              )}
            </div>

            <button
              className="profile__edit-btn button button--small"
              onClick={() => setOpenDetailsModal(true)}
            >
              Edit
            </button>
          </>
        )}
      </div>
      {details && (
        <>
          <ProfileImageUpdateModal
            open={openImgModal}
            setOpen={setOpenImgModal}
            img={details?.img && img_endpoint + details?.img}
          />
          <ProfileDetailsUpdateModal
            open={openDetailsModal}
            setOpen={setOpenDetailsModal}
            details={details}
          />
        </>
      )}
    </>
  );
}
