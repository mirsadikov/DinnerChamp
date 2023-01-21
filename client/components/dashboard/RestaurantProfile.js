import { img_endpoint } from '@/config/variables';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import defaultImage from '@/images/default-img.png';
import { Alert } from '@mui/material';

export default function RestaurantProfile({ restaurantData }) {
  const { restaurant, error } = restaurantData;

  if (error) {
    return <Alert severity="error">Something went wrong while getting restaurant info!</Alert>;
  }

  const { name, address, city, phone, description, img } = restaurant;

  return (
    <div className="restaurant-info">
      <img src={img} alt={name} className="restaurant-info__img" />
      <div className="restaurant-info__details">
        <h2 className="restaurant-info__title">{name}</h2>
        {(address || city) && (
          <a
            target="_blank"
            href={`https://www.google.com/maps/search/${
              address && city ? `${city}, ${address}` : address ? address : city
            }`}
            rel="noopener noreferrer"
            className="restaurant-info__address"
          >
            <PlaceIcon />
            {address && city ? `${city} - ${address}` : address ? address : city}
          </a>
        )}
        {phone && (
          <a href={`tel:+${phone}`} className="restaurant-info__phone">
            <PhoneIcon />+{phone}
          </a>
        )}
        {description && <p className="restaurant-info__desc">{description}</p>}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { data: restaurant } = await axios.get('/api/restaurant/' + params.id);

    console.log(restaurant);

    return {
      props: {
        restaurant: {
          ...restaurant,
          img: restaurant.img ? `${img_endpoint}/${restaurant.img}` : defaultImage.src,
        },
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
