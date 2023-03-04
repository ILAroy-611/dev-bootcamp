import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CareerTabs from "../Components/CareerTabs";
import Hero from "../Components/Hero";
import ReviewCard from "../Components/ReviewCard";
import ServiceCard from "../Components/ServiceCard";
import { careerOptions } from "../data/careerOptions";
import { serviceData } from "../data/serviceData";
import { getALlReviews } from "../Redux/Thunks/ReviewThunk";
import { NavLink } from "react-router-dom";
import "../Styles/home.css";
// import { getAllBootcamps } from "../Redux/Thunks/BootCampThunk";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getALlReviews());
  }, []);

  const { reviewsDataArray } = useSelector((state) => state.review);
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <main className="home">
      <Hero />
      <section className="service-section">
        <div className="container">
          <h2 className="service-title">Services</h2>
          <div className="services flex">
            {serviceData.map((s) => {
              return <ServiceCard {...s} key={s.service_title} />;
            })}
          </div>
        </div>
      </section>

      <section className="careers-section">
        <div className="container">
          <h2 className="careers-title">Careers</h2>
          <p className="careers-intoduction">
            All the these careers are highly needed in the tech world right now.
          </p>
          <div className="careers flex">
            {careerOptions.map((c) => {
              return <CareerTabs {...c} key={c.tab_title} />;
            })}
          </div>
          <p className="careers-footer">And many more.....</p>
        </div>
      </section>

      <section className="reviews-section">
        <div className="container">
          <h2 className="reviews-title">Reviews</h2>
          <p className="reviews-intoduction">
            People that are already using our service
          </p>
          <div className="reviews flex">
            {reviewsDataArray.map((r) => {
              return <ReviewCard {...r} key={r._id} />;
            })}
          </div>
          <div className="confirmation">
            {isLoggedIn ? (
              <></>
            ) : (
              <div className="ready">
                <h4>Are you Ready?</h4>
                <NavLink to="/register" className="confirmation-btn btn link">
                  Register
                </NavLink>
              </div>
            )}
            <div className="sure">
              <h4>Not Sure?</h4>
              <NavLink to="/bootcamps" className="confirmation-btn btn link">
                Find a bootcamp
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
