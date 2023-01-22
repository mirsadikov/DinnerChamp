import { Alert, Chip } from '@mui/material';
import DishCard from '@/components/DishCard';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/globalContext';

export default function Dishes({ dishesData }) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const { dishes, error: dishesError } = dishesData;
  const { cart } = useContext(GlobalContext);

  if (dishesError) {
    return <Alert severity="error">Something went wrong while getting items!</Alert>;
  }

  useEffect(() => {
    const categories = [];
    dishes.forEach((dish) => {
      if (dish.category) {
        const category = categories.find((category) => category.id === dish.category.id);
        if (!category) {
          categories.push(dish.category);
        }
      }

      setCategories(categories);
    }, []);

    setCategories(categories);
  }, [dishes]);

  useEffect(() => {
    if (selectedCategory === 0) setFilteredDishes(dishes);
    else {
      const filteredDishes = dishes.filter((dish) => dish.category?.id === selectedCategory);
      setFilteredDishes(filteredDishes);
    }
  }, [selectedCategory]);

  return (
    <div className="dishes-list__container">
      <div className="dishes-list__categories">
        <Chip
          label="All"
          key={0}
          variant={selectedCategory === 0 ? 'filled' : 'outlined'}
          color={selectedCategory === 0 ? 'primary' : 'default'}
          className="dishes-list__category"
          onClick={() => setSelectedCategory(0)}
        />
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            className="dishes-list__category"
            variant={selectedCategory === category.id ? 'filled' : 'outlined'}
            color={selectedCategory === category.id ? 'primary' : 'default'}
            onClick={() => setSelectedCategory(category.id)}
          />
        ))}
      </div>
      <div className="dishes-list__items">
        {filteredDishes.map((dish) => {
          const dishInCart = cart.find((item) => item.id === dish.id);
          return <DishCard dish={dish} key={dish.id} initialQuantity={dishInCart?.quantity} />;
        })}
      </div>
    </div>
  );
}
