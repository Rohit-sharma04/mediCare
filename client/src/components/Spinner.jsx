
const Spinner = () => {
  return (
    <div className="d-flex justify-content-center spinner z-50">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
