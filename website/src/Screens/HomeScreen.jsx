import { Link } from 'react-router-dom';
import AboutImg from '../Images/about.jpg';

export default function HomeScreen() {
  return (
    <>
      <div className="hero">
        <div className="container hero__container">
          <h2 className="hero__title">
            Make your business <span className="hero__title--highlight">online.</span>
          </h2>
          <p className="hero__description">
            DinnerChamp is a platform that helps you to grow your business online. <br className='hero__divider' />
            Restaurants, cafes, and others are happy with us.
          </p>
          <div className="hero__buttons">
            <Link to="/register" className="hero__button button button--primary">
              Start Journey
            </Link>
            <a href="#about" className="hero__button button button--secondary">
              Learn more
            </a>
          </div>
        </div>
      </div>
      <div className="about" id="about">
        <h2 className="about__subtitle">About us</h2>
        <div className="container about__container">
          <div className="about__column about__desc">
            <p>
              Welcome to our online ordering POS system for restaurants! We are dedicated to
              providing the best possible technology solutions to help streamline your business
              operations and make your customers' experience as smooth and seamless as possible. Our
              platform offers a range of features designed specifically for the restaurant industry,
              including online ordering, menu customization, and real-time reporting.
            </p>
          </div>
          <div className="about__column">
            <img src={AboutImg} className="about__image" alt="POS of restaurant" />
          </div>
        </div>
      </div>
    </>
  );
}
