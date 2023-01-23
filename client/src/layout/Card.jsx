const Card = ({ name, price, photo, rating, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <img height="300px" width="300px" alt="" src={photo} />
      <div className="product-details">
        <h3>{name}</h3>
        <p>{price} $</p>
      </div>
    </div>
  );
};

export default Card;
