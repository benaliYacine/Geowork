// tari9a li ra7 nekhedmou biha fel pfe
import { Link } from "react-router-dom";
import Header from "@/components/common/Header";
import SearchBar from "@/components/searchBar/SearchBar";
import HeroSection from "@/components/home/HeroSection";
import StepsSection from "@/components/home/StepsSection";
import Footer from "@/components/common/Footer";
import FeaturesSection from "@/components/home/FeaturesSection";
import ReadySection from "@/components/home/ReadySection";
function Home() {
  return (
    <div className="bg-bg  relative isolate">
      <div
        className="absolute inset-x-0 left-[-400px] -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-0"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr to-[#ff5400] from-[#ff6060] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[50rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <Header />
      <SearchBar />
      <HeroSection />
      <StepsSection />
      <FeaturesSection />
      <ReadySection />

      {/* 
      <div className=" opacity-25 absolute bg-bg top-[58px] right-[-100px] rounded-full border-2 border-primary w-40 h-40"></div>
      <div className="opacity-50 absolute bg-bg top-[82px] right-[-100px] rounded-full border-2 border-primary w-40 h-40"></div>
      <div className="opacity-75 absolute bg-bg top-[106px] right-[-100px] rounded-full border-2 border-primary w-40 h-40"></div>
      <div className="opacity-100 absolute bg-bg top-[130px] right-[-100px] rounded-full border-2 border-primary w-40 h-40"></div> */}

      <Footer />
      <br />
      <Link to="/expertProposalPage">Go to Expert Proposal Page Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/login">Go to login Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/savedJobs">Go to SavedJobs Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/savedExperts">Go to SavedExperts Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/job">Go to Job Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/proposal">Go to Proposal Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/findWork">Go to FindWork Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/submitProposal">Go to SubmitProposal Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/dashboard">Go to profile Page</Link>
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
      <Link to="/verifyEmail">Go to SendEmail Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/jobPost">Go to JobPost Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/allJobPosts">Go to AllJobPosts Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/jobsSearch">Go to JobsSearch Page</Link>
      <br />
      <br />
      <hr />
      <br />
      <Link to="/expertsSearch">Go to ExpertsSearch Page</Link>
      <br />
      <br />
      <hr />
      <br />
    </div>
  );
}

export default Home;
