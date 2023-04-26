import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import { Alert, MenuItem, Select } from '@mui/material';
import { useContext, useState } from 'react';
import { GlobalContext } from '@/globalContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect } from 'react';
import Image from 'next/image';

export default function RestaurantProfile({ restaurantData }) {
  const { cartIsOpen, setCartIsOpen, cart, openBranches, setSelectedBranch, selectedBranch } =
    useContext(GlobalContext);
  const [cartCount, setCartCount] = useState(0);
  const [selectedBranchId, setSelectedBranchId] = useState('-1');
  const { restaurant, error: restaurantError } = restaurantData;
  const { branches, error: branchesError } = openBranches;

  useEffect(() => {
    const count = cart
      ?.filter((item) => item.restaurantId === restaurant.id)
      .reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
    setCartCount(count || 0);
  }, [cart, restaurant.id]);

  useEffect(() => {
    if (selectedBranchId !== '-1') {
      setSelectedBranch(branches?.find((branch) => branch.id === selectedBranchId));
    } else {
      setSelectedBranch(null);
    }
  }, [selectedBranchId, setSelectedBranch, branches]);

  if (restaurantError) {
    return <Alert severity="error">Something went wrong while getting restaurant info!</Alert>;
  }

  if (branchesError) {
    return <Alert severity="error">Something went wrong while getting branches info!</Alert>;
  }

  const { name, description, img } = restaurant;

  const toggleCart = () => {
    setCartIsOpen(!cartIsOpen);
  };

  const handleBranchChange = (e) => {
    setSelectedBranchId(e.target.value);
  };

  return (
    <div className="restaurant-info">
      <div className="restaurant-info__img-container">
        <Image src={img} alt={name} className="restaurant-info__img" height={230} width={230} />
        <button onClick={toggleCart} className="restaurant-info__cart-btn">
          <ShoppingCartIcon />
          {cartCount > 0 && <div>{cartCount}</div>}
        </button>
      </div>
      <div className="restaurant-info__details">
        <h2 className="restaurant-info__title">{name}</h2>
        <Select
          className="restaurant-info__branches-list"
          id="branches-list"
          value={selectedBranchId}
          onChange={handleBranchChange}
          displayEmpty
        >
          <MenuItem value="-1" selected>
            <em>Select branch</em>
          </MenuItem>
          {branches?.map((branch) => (
            <MenuItem key={branch.id} value={branch.id}>
              {branch.address}, {branch.city}
            </MenuItem>
          ))}
        </Select>
        {selectedBranch && (
          <>
            <a
              target="_blank"
              href={`https://www.google.com/maps/search/${selectedBranch.city}, ${selectedBranch.address}`}
              rel="noopener noreferrer"
              className="restaurant-info__address"
            >
              <PlaceIcon />
              {`${selectedBranch.city} - ${selectedBranch.address}`}
            </a>

            {selectedBranch.phone && (
              <a href={`tel:+${selectedBranch.phone}`} className="restaurant-info__phone">
                <PhoneIcon />+{selectedBranch.phone}
              </a>
            )}
          </>
        )}

        {description && <p className="restaurant-info__desc">{description}</p>}
      </div>
    </div>
  );
}
