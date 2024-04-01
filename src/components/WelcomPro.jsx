import { Button } from "@/components/ui/button";
import Welcome from "../assets/illustrations/welcome-pro.svg";
import { useNavigate } from "react-router-dom";
export default function WelcomPro({ firstName = "Name" }) {
  const navigate=useNavigate();
  const hundleCreateProfile=()=>{
    navigate('/profileSlides');
  }
  return (
    <div className="container mx-auto px-24 py-12 flex flex-wrap items-center">
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl font-bold mb-4">
          Hey {firstName}. Ready for your next big opportunity?
        </h1>
        <p className="text-lg mb-4">Let's start by building your profile.</p>
        <Button onClick={hundleCreateProfile} variant="default" size="lg">
          Create Profile
        </Button>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <img
          src={Welcome}
          alt="Welcome"
          className="max-w-xs md:max-w-sm lg:max-w-lg"
        />
      </div>
    </div>
  );
}
