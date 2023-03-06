import { img_endpoint } from '@/config/variables';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import defaultImage from '@/images/default-img.png';
import { Alert, Skeleton } from '@mui/material';
import { useContext, useState } from 'react';
import { GlobalContext } from '@/globalContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect } from 'react';

export default function RestaurantProfile({ restaurantData }) {
  const [cartCount, setCartCount] = useState(0);
  const { restaurant, error } = restaurantData;
  const { cartIsOpen, setCartIsOpen, cart } = useContext(GlobalContext);

  useEffect(() => {
    const count = cart
      ?.filter((item) => item.restaurantId === restaurant.id)
      .reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
    setCartCount(count || 0);
  }, [cart, restaurant.id]);

  if (error) {
    return <Alert severity="error">Something went wrong while getting restaurant info!</Alert>;
  }

  const { name, address, city, phone, description, img } = restaurant;

  const toggleCart = () => {
    setCartIsOpen(!cartIsOpen);
  };

  return (
    <div className="restaurant-info">
      <div className="restaurant-info__img-container">
        <img src={img} alt={name} className="restaurant-info__img" />
        <button onClick={toggleCart} className="restaurant-info__cart-btn">
          <ShoppingCartIcon />
          {cartCount > 0 && <div>{cartCount}</div>}
        </button>
      </div>
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
