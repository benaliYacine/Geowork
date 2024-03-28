// tari9a li ra7 nekhedmou biha fel pfe
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

function Home() {
  return (
    <div className="bg-bg">
      <h1 className="font-header font-bold text-3xl">Home Page</h1>

      <p>This is the home page of our example application.</p>
      {/* Link to the About page */}
      <br />
      <Link to="/login">Go to login Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/signup">Go to sign up Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/messages">Go to Messages Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/inputWilayaCity">Go to InputWilayaCity Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/welcomePro">Go to welcomPro Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/profileSlides">Go to profileSlides Page</Link>
      {/* <Progress value={33} /> */}

    </div>
  );
}

export default Home;
