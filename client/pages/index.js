import { img_endpoint } from '@/config/variables';
import axios from '../config/axios';
import defaultImage from '@/images/default-img.png';
import RestaurantSlider from '@/components/RestaurantSlider';
import { GlobalContext } from '@/globalContext';
import { useContext } from 'react';

export default function Home({ restaurants, error }) {
  const { setSearchModalOpen } = useContext(GlobalContext);

  return (
    <>
      <div className="home">
        <div className="hero">
          <div className="container hero__container">
            <h2 className="hero__title">
              Order now.
              <br />
              Pick up when <span className="hero__title--highlight">ready.</span>
            </h2>
            <p className="hero__description">
              Order from your favorite restaurants and don&apos;t worry about the wait.
            </p>
            <div className="hero__buttons">
              <button
                className="hero__button button button--primary"
                onClick={() => setSearchModalOpen(true)}
              >
                Search
              </button>
              <a href="#explore" className="hero__button button button--secondary">
                Explore
              </a>
            </div>
          </div>
        </div>

        <div id="explore" className="explore">
          <h2 className="explore__title home__subtitle">Popular</h2>
          {error && <p>{error}</p>}
          {restaurants && <RestaurantSlider restaurants={restaurants} />}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get('/api/restaurant');

    return {
      props: {
        restaurants: data.map((restaurant) => ({
          ...restaurant,
          img: restaurant.img ? `${img_endpoint}/${restaurant.img}` : defaultImage.src,
        })),
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
}
