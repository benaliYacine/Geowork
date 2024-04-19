import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Location from "@/components/common/Location";
import EmploymentHistory from "@/components/profile/EmploymentHistory";
import ExperienceHistory from "@/components/profile/ExperienceHistory";
import EducationHistory from "@/components/profile/EducationHistory";
import GeoworkHistory from "@/components/profile/GeoworkHistory";
import EditAvatarCard from "@/components/profile/EditAvatarCard";
import { Button } from "@/components/ui/button";

export default function profile({
  name = "test test",
  wilaya = "wilaya",
  city = "city",
}) {
  const [profileInfo, setProfileInfo] = useState({
    roleTitle: "na7ihom memba3d ", // Initialize with empty string or a default value
    category: "education_and_tutoring",
    subCategory: "math_tutor",
    employments: [
      {
        title: "memba3d na7iha",
        company: "test",
        Location: "test",
        currentlyIn: true,
        date: {
          start: {
            month: 2,
            year: 2020,
          },
          end: {
            month: 2,
            year: 2021,
          },
        },
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
      {
        title: "memba3d na7iha",
        company: "test",
        Location: "test",
        currentlyIn: false,
        date: {
          start: {
            month: 1,
            year: 2020,
          },
          end: {
            month: 1,
            year: 2021,
          },
        },
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
    ],
    experiences: [
      {
        title: "memba3d na7iha",
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
      {
        title: "memba3d na7iha",
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
      {
        title: "memba3d na7iha",
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
    ],
    educations: [
      {
        school: "memba3d na7iha",
        degree: "test",
        fieldOfStudy: "test",
        datesAttended: {
          start: 2021,
          end: 2025,
        },
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
      {
        school: "memba3d na7iha",
        degree: "test",
        fieldOfStudy: "test",
        datesAttended: {
          start: 2021,
          end: 2025,
        },
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
      {
        school: "memba3d na7iha",
        degree: "test",
        fieldOfStudy: "test",
        datesAttended: {
          start: 2021,
          end: 2025,
        },
        description:
          " Lorem ipsum dolor e possimus, neque itaque, nisi nihil saepe, dicta unde.",
      },
    ],
    jobs: [
      {
        title: "na7ihom memba3d ",
        startDate:
          "Wed Oct 19 2022 07:07:43 GMT+0100 (Central European Standard Time)",
        endDate:
          "Tue Apr 09 2024 00:00:00 GMT+0100 (Central European Standard Time)",
        category: "education_and_tutoring",
        subCategory: "math_tutor",
        wilaya: "alger",
        city: "sidi_moussa",
        budget: "DZD  5, 500",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
        images: ["https://placebear.com/g/200/200"],
        rate: 2.5,
        feedback:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      },
      
    ],
    Bio: "na7i memba3d Lorem m tempore possimus, neque itaque, nisi nihil saepe, dicta unde. na7i memba3d Lorem m tempore possimus, neque itaque, nisi nihil saepe, dicta unde. na7i memba3d Lorem m tempore possimus, neque itaque, nisi nihil saepe, dicta unde. na7i memba3d Lorem m tempore possimus, neque itaque, nisi nihil saepe, dicta unde.",
    // dateBirthday:"Thu Mar 07 2024 00:00:00 GMT+0100 (Central European Standard Time)",
    dateBirthday: undefined,
    streetAdress: " tiaret tiaret asdf asd f",
    phone: "05 55 55 55 55",
    // photoProfileSrc:
    //   "https://third-party-test.glitch.me/check.svg?cors=anonymous", // ani dayer hada l url lakhatercch .toDataURL(); ma7abetch temchi m3a l url ta3 doub hadak ygoulek makch m7aded l cors w hadi l image url l9itha hna https://stackblitz.com/edit/cors-corp-image-example?file=src%2Findex.html haka l .toDataURL(); yemchi mais mech3aref ida ilyes ki ydir fetch ida temchi wela la
    // teksar eras fel batel cors w mech3aref w lazem photoProfileSrc yzidha ilyes fel bdd .. khlas na7itha w f edit avatar card radit image tebda null (la bgha l user el src ta3 nafs l image li darha awal mara beh ghi hiya w ymodifi fiha y3awed ytala3ha w khlas)

    photoProfile: "https://placebear.com/g/200/200",
  });

  const updateProfileInfo = (newInfo) => {
    setProfileInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  };

  const addImage = (newImage) => {
    updateProfileInfo({
      photoProfile: newImage, // Directly assign the newImage Src
    });
    // setIsPhotoAdded(true);
    // setShowPhotoError(false);
  };
  const addImageSrc = (newImage) => {
    updateProfileInfo({
      photoProfileSrc: newImage, // Directly assign the newImage Src
    });
  };

  return (
    <>
      {/* <p class="text-black dark:text-neutral-400">
        Preline UI is an open-source set of prebuilt UI components based on the
        utility-first Tailwind CSS framework.
      </p>
      <div
        id="hs-show-hide-collapse-heading"
        class="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
        aria-labelledby="hs-show-hide-collapse"
      >
        <p class="text-black dark:text-neutral-400">
          This is a collapse body. It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.
        </p>
      </div>

      <Button
        type="button"
        variant="link"
        className="hs-collapse-toggle p-0 m-0 h-fit w-fit"
        id="hs-show-hide-collapse"
        data-hs-collapse="#hs-show-hide-collapse-heading"
      >
        <span class="hs-collapse-open:hidden">more</span>
        <span class="hs-collapse-open:block hidden">less</span>
        <svg
          class="hs-collapse-open:rotate-180 flex-shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </Button> */}

      <div className="w-full flex flex-col items-center">
        <div className="w-full">
          <div className="flex flex-col m-6 sm:mx-12 md:mx-18 lg:mx-40 xl:mx-52 max-w-[1440px] ">
            <div className="flex flex-col gap-4">
              <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
                <div className="flex flex-row p-0 w-full mr-auto items-center">
                  <div className=" relative">
                    <Avatar className="mr-4" size={24}>
                      <AvatarImage src={profileInfo.photoProfile} alt={name} />
                      <AvatarFallback>jl</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-[-6px] right-4 ">
                      <EditAvatarCard
                        addImage={addImage}
                        addImageSrc={addImageSrc}
                        existingPhoto={profileInfo.photoProfile}
                        existingPhotoSrc={profileInfo.photoProfileSrc}
                        variant="outlined"
                        className="flex-2"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-6xl font-header font-semibold mb-1">
                      {name}
                    </h2>
                    <Location wilaya={wilaya} city={city} size="lg" />
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl font-header font-semibold mb-1">
                    {name}
                  </h3>
                  {/* TODO: khdem mecanizme el more w el less */}
                  <p className=" line-clamp-3">{profileInfo.Bio} </p>
                  more
                </div>
              </div>
              <GeoworkHistory
                profileInfo={profileInfo}
                updateProfileInfo={updateProfileInfo}
              />
              <EmploymentHistory
                profileInfo={profileInfo}
                updateProfileInfo={updateProfileInfo}
              />
              <ExperienceHistory
                profileInfo={profileInfo}
                updateProfileInfo={updateProfileInfo}
              />
              <EducationHistory
                profileInfo={profileInfo}
                updateProfileInfo={updateProfileInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
