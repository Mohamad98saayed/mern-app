import { getOneProductsAsync } from "../state/reducers/products";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../layout/Button";

import {
  faTag,
  faSignature,
  faPrescriptionBottle,
} from "@fortawesome/free-solid-svg-icons";

import { Icon } from "../layout/Icon";

const Product = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { error, data, isLoading, errorMessage } = useSelector(
    (state) => state.products
  );
  const { product } = useSelector((state) => state.products.data);
  console.log(product);

  useEffect(() => {
    if (isLoading) {
      console.log("loading ...");
    }

    if (error) {
      console.log(errorMessage);
    }

    dispatch(getOneProductsAsync(params.id));
  }, [error, isLoading, dispatch, params]);

  return (
    <section className="product">
      {product ? (
        <div className="product-container">
          <div className="left">
            <img src={product.images[0].url} />
          </div>
          <div className="right">
            <div>
              <Icon icon={faSignature} />
              <h2>{product.name}</h2>
            </div>
            <div>
              <Icon icon={faPrescriptionBottle} />
              <p>
                is a {product.category}, {product.description}, for{" "}
                {product.gender} and made by {product.brand}
              </p>
            </div>

            <div>
              <Icon icon={faTag} />
              <p>{product.price} $</p>
            </div>

            <Button content="Add to Cart" />
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </section>
  );
};

export default Product;
