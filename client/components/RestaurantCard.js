export default function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <div className="restaurant-card__img">
        <img src={restaurant.img} alt={restaurant.name} />
      </div>
      <div className="restaurant-card__info">
        <h3 className="restaurant-card__name">{restaurant.name}</h3>
        <p className="restaurant-card__description">{restaurant.description}</p>
      </div>
    </div>
  );
}
