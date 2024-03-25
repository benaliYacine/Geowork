import { Button } from "@/components/ui/button";
import Welcome from "../assets/illustrations/welcome-cli.svg";
export default function WelcomCli({ firstName="Name" }) {
  return (
    <div className="container mx-auto px-24 py-12 flex flex-wrap items-center">
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl font-bold mb-4">
        Welcome, {firstName}! Let’s start with your first job post.
        </h1>
        <Button variant="default" size="lg">
        creat my first job post
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
