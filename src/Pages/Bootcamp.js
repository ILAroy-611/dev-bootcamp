import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootcampCard from "../Components/BootcampCard";
import Spinner from "../Components/Spinner";
import { getAllBootcamps } from "../Redux/Thunks/BootCampThunk";
import "../Styles/bootcamp.css";


function Bootcamp() {

  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(getAllBootcamps());
  }, []);

  const { bootcampDataArray, isBootcampLoading } = useSelector(
    (state) => state.bootcamp
  );
  return (
    <>
      {isBootcampLoading ? (
        <Spinner />
      ) : (
        <section className="bootcamp-section">
          <div className="bootcamp-sec-container container flex">
            {bootcampDataArray && bootcampDataArray.map((b) => {
              return <BootcampCard bootcamp={b} key={b.id} />;
            })}
          </div>
        </section>
      )}
    </>
  );
}

export default Bootcamp;
