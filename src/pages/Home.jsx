// tari9a li ra7 nekhedmou biha fel pfe
import { Link } from "react-router-dom";
import Header from "@/components/common/Header";
import HeroSection from "@/components/home/HeroSection";
import Footer from "@/components/common/Footer";
function Home() {
  return (
    <div className="bg-bg">
      <Header />
      <HeroSection />
      <Footer />
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
      <br />
      <br />
      <hr />
      <br />
      <Link to="/jobSlides">Go to jobSlides Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/sendEmailPage">Go to SendEmail Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/jobPost">Go to JobPost Page</Link>
      <br />
      <br />
      <hr />
      <br />
    </div>
  );
}

export default Home;
