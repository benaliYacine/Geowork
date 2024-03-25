import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="bg-bg">
      <h1>Page not found 404 :(</h1>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NoPage;
