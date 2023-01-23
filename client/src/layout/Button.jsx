export const Button = ({ onClick, content, type }) => {
  return (
    <button onClick={onClick} type={type} className="layout-btn">
      {content}
    </button>
  );
};
