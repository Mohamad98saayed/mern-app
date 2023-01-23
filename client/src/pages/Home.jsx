import Card from "../layout/Card";
import Footer from "../layout/Footer";
import { Button } from "../layout/Button";
import { Icon } from "../layout/Icon";
import { Input } from "../layout/Input";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getProductsAsync } from "../state/reducers/products";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, data, error, errorMessage } = useSelector(
    (state) => state.products
  );
  const { products } = useSelector((state) => state.products.data);

  if (data.length) {
  }

  useEffect(() => {
    if (isLoading) {
      console.log("loading");
    }

    if (error) {
      console.log(errorMessage);
    }

    dispatch(getProductsAsync());
  }, [dispatch, error, errorMessage, isLoading]);

  return (
    <>
      <section className="home">
        <div className="overlay"></div>
        <div className="home-details">
          <h1>Here Where You Will Get Lost !!!</h1>
          <Button content="Explore More" />
        </div>
      </section>

      <section className="products">
        <div className="search">
          <Icon icon={faSearch} />
          <Input type="search" />
        </div>

        <div className="products-card">
          {products ? (
            products?.map((product) => (
              <Card
                key={product._id}
                photo={product.images[0].url}
                name={product.name}
                price={product.price}
                rating={product.rating}
                onClick={() => navigate(`/products/${product._id}`)}
              />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Home;
