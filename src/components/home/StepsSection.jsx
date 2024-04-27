import React from "react";
import post from "@/assets/illustrations/post.svg";
import discover from "@/assets/illustrations/discover.svg";
import done from "@/assets/illustrations/done.svg";
import PageContainer from "@/components/common/PageContainer";

const Step = ({ img, title, description }) => {
  return (
    <div className="xl:p-12 p-2 lg:w-1/3 flex flex-col text-center items-center">
      <div className="w-20 h-20 inline-flex items-center justify-center rounded-3xl bg-greyCold p-2 mb-5 flex-shrink-0">
        <img src={img} alt="img" />
      </div>
      <div className="flex-grow">
        <h3 className="text-black text-2xl font-semibold mb-3">{title}</h3>
        <p className="leading-relaxed text-lg text-pretty">{description}</p>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="text-greyDark body-font bg-white">
      <PageContainer>
        <div className="container py-16">
          <div className="text-center mb-8 p-4">
            <h2 className="sm:text-5xl text-3xl font-semibold text-black">
              Looking for a Professional to Solve Your Needs On-Site?
            </h2>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 lg:space-y-0 space-y-8">
            <Step
              img={post}
              description="Begin by simply posting your service need. Whether it's a
                  leaky faucet or a need for a home tutor, describe what you
                  need, and get offers from experts in minutes."
              title="1: Post Your Request"
            />
            <Step
              img={discover}
              description="Compare experts offers, browse their profiles, reviews, and
                  work, negotiate with them via messages, and choose the best
                  one to do the job."
              title="2: Discover Local Professionals"
            />
            <Step
              img={done}
              description="Connect with your chosen professional, agree on the details,
                  send him the exact job location, and get your service
                  completed with ease. It’s hassle-free, efficient, and
                  reliable."
              title="3: Get It Done"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default HeroSection;
