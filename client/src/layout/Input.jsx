export const Input = ({ type, placeholder, onChange }) => {
  return (
    <input
      className="layout-input"
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};
