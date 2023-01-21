import { Alert, Chip } from '@mui/material';
import DishCard from '@/components/DishCard';
import { useEffect, useState } from 'react';

export default function Dishes({ dishesData }) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const { dishes, error: dishesError } = dishesData;

  if (dishesError) {
    return <Alert severity="error">Something went wrong while getting items!</Alert>;
  }

  useEffect(() => {
    const categories = dishes.reduce((acc, dish) => {
      if (!dish.category) return acc;
      if (acc.includes(dish.category)) return acc;
      return [...acc, dish.category];
    }, []);

    setCategories(categories);
  }, [dishes]);

  useEffect(() => {
    if (selectedCategory === 0) return;
    const filteredDishes = dishes.filter((dish) => dish.category?.id === selectedCategory);

    setFilteredDishes(filteredDishes);
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
        {selectedCategory === 0
          ? dishes.map((dish) => <DishCard dish={dish} key={dish.id} />)
          : filteredDishes.map((dish) => <DishCard dish={dish} key={dish.id} />)}
      </div>
    </div>
  );
}
