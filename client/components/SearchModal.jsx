import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useContext, useRef, useState } from 'react';
import { GlobalContext } from '@/globalContext';
import SearchIcon from '@mui/icons-material/Search';
import axios from '../config/axios';
import { Alert } from '@mui/material';
import defaultImage from '@/images/default-img.png';
import { img_endpoint } from '@/config/variables';
import { Inter } from '@next/font/google';
import Link from 'next/link';

const inter = Inter({
  subsets: ['latin'],
});

export default function SearchModal() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const inputRef = useRef();
  const { searchModalOpen, setSearchModalOpen } = useContext(GlobalContext);

  const focusInput = () => {
    if (searchModalOpen) inputRef.current.focus();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== '') {
      axios
        .get(`/api/restaurant?search=${search.trim()}`)
        .then((res) => {
          // set default image
          if (res.data.length === 0) setNoResults(true);
          else setNoResults(false);

          setRestaurants(
            res.data.map((r) => ({ ...r, img: r.img ? img_endpoint + r.img : defaultImage.src }))
          );
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  const handleLinkClick = () => {
    setSearchModalOpen(false);
    setSearch('');
    setRestaurants([]);
    setError('');
  };

  const overlayClick = (e) => {
    if (e.target.classList.contains('search-modal__box')) {
      setSearchModalOpen(false);
      setError('');
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={searchModalOpen}
      onClose={() => {
        setSearchModalOpen(false);
        setError('');
      }}
      closeAfterTransition
      className={`search-modal ${inter.className}`}
    >
      <Fade in={searchModalOpen} onTransitionEnd={focusInput}>
        <div className="search-modal__box" onClick={overlayClick}>
          <div className="search-modal__container">
            <form className="search-modal__input-container" onSubmit={handleSearch}>
              <input
                className="search-modal__input"
                type="text"
                placeholder="Search"
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="search-modal__button">
                <SearchIcon className="search-modal__icon" />
              </button>
            </form>
            {restaurants.length > 0 && (
              <div className="search-modal__results">
                {restaurants.map((restaurant) => (
                  <Link
                    href={`/r/${restaurant.id}`}
                    key={restaurant.id}
                    className="search-modal__card"
                    onClick={handleLinkClick}
                  >
                    <img
                      className="search-modal__card-img"
                      src={restaurant.img}
                      alt={restaurant.name}
                    />
                    <div className="search-modal__card-info">
                      <h3 className="search-modal__card-title">
                        {restaurant.name}
                        <span className="search-modal__card-badge mini-badge">
                          {restaurant.running ? 'Open' : 'Closed'}
                        </span>
                      </h3>
                      {restaurant.city ? (
                        <p className="search-modal__card-city">
                          <b>City: </b>
                          <span>{restaurant.city}</span>
                        </p>
                      ) : restaurant.phone ? (
                        <p className="search-modal__card-phone">
                          <b>Phone: </b>
                          <span>+{restaurant.phone}</span>
                        </p>
                      ) : restaurant.address ? (
                        <p className="search-modal__card-address">
                          <b>Address: </b>
                          <span>{restaurant.address}</span>
                        </p>
                      ) : null}
                      {restaurant.description && (
                        <p className="search-modal__card-description">{restaurant.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {noResults && !error && (
              <div className="search-modal__no-results">
                <p className="search-modal__no-results-text">No results found</p>
              </div>
            )}

            {error && (
              <div className="search-modal__error">
                <Alert severity="error">{error}</Alert>
              </div>
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
