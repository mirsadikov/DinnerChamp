import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function DishCard({ dish }) {
  return (
    <div className="dish-card" key={dish.id}>
      <img src={dish.img} alt={dish.name} className="dish-card__img" />
      <div className="dish-card__details">
        <h3 className="dish-card__title">{dish.name}</h3>
        <p className="dish-card__price">
          {dish.price} <span>so'm</span>
        </p>
        <p className="dish-card__category">{dish.category ? dish.category.name : 'Other'}</p>
        <div className="dish-card__buttons">
          <button className="dish-card__button">
            <RemoveIcon />
          </button>
          <span className="dish-card__quantity">0</span>
          <button className="dish-card__button">
            <AddIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
