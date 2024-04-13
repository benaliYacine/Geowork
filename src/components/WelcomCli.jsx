import { Button } from "@/components/ui/button";
import Welcome from "@/assets/illustrations/welcome-cli.svg";
import { useNavigate } from "react-router-dom";
export default function WelcomCli({ firstName = "Name" }) {
  const navigate = useNavigate();
  const hundleCreateClient = () => {
    navigate("/jobSlides");
  };
  return (
    <section className="text-black body-font flex justify-center items-center w-full">
      <div className="container flex flex-col lg:flex-row items-center justify-between mx-6 lg:mx-24 xl:mx-52 w-full max-w-[1440px]">
        <div className="flex-grow lg:w-1/2 xl:pr-24 lg:pr-16 flex flex-col lg:items-start lg:text-left mb-16 lg:mb-0 items-center text-center lg:my-0 my-12">
          <h1 className="font-header sm:text-5xl text-3xl font-bold mb-4 text-black">
          Welcome, {firstName}! Let’s start with your first job post.
          </h1>
          <div className="flex justify-center">
            <Button onClick={hundleCreateClient} variant="default" size="lg">
            creat job post
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 xl:max-w-lg  w-5/6 hidden lg:block">
          <img
            className="max-w-xs md:max-w-sm lg:max-w-lg"
            alt="Welcome"
            src={Welcome}
          />
        </div>
      </div>
    </section>
  );
}
