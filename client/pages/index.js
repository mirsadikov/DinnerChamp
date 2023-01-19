import { img_endpoint } from '@/config/variables';
import axios from '../config/axios';
import defaultImage from '@/images/default-img.png';
import RestaurantCard from '@/components/RestaurantCard';

export default function Home({ restaurants, error }) {
  return (
    <div className="home">
      <div className="container">
        {error && <p>{error}</p>}
        {restaurants && (
          <div className="home__restaurants">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
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
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    };
  }
}
