import { Link } from 'react-router-dom';

export default function HomeScreen() {
  return (
    <>
      <div className="hero">
        <div className="container hero__container">
          <h2 className="hero__title">
            Make your business <span className="hero__title--highlight">online.</span>
          </h2>
          <p className="hero__description">
            DinnerChamp is a platform that helps you to grow your business online. <br /> Restaurants, cafes, and others are happy with us.
          </p>
          <div className="hero__buttons">
            <Link to="/register" className="hero__button hero__button--register">
              Start Journey
            </Link>
            <a href="#about" className="hero__button hero__button--login">
              Learn more
            </a>
          </div>
        </div>
      </div>
      <div className="about" id="about">
        <div className="container about__container">
          <h2 className="about__title">About us</h2>
          <p className="about__description"></p>
        </div>
      </div>
    </>
  );
}
