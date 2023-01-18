import axios from '../config/axios';

export default function Home({ restaurants, error }) {
  return (
    <>
      <h1>Restaurants</h1>
      {error && <p>{error}</p>}
      {restaurants && (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>{restaurant.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get('/api/restaurant');

    return {
      props: {
        restaurants: data,
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
