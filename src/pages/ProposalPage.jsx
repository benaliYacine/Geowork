import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "@/components/profile/Profile";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PageContainer from "@/components/common/PageContainer";
import SearchBar from "@/components/searchBar/SearchBar";
import Proposal from "@/components/proposalList/Proposal";
export default function ProfilePage() {
  const [info, setInfo] = useState({
    name: "John Doe",
    role: "Web Developer",
    rating: Math.random() * 5,
    avatarUrl: "https://github.com/johndoe.png",
    wilaya: "Algiers",
    city: "Central",
    budget: "DZD  5, 500",
    coverLetter:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
  });
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
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde. Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
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
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
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
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde. Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde. Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
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
        wilaya: "Algiers",
        city: "sidi_moussa",
        budget: "DZD  5, 500",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
        images: ["https://placebear.com/g/200/200"],
        rate: 2.5,
        feedback:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      },
      {
        title: "na7ihom memba3d ",
        startDate:
          "Wed Oct 19 2022 07:07:43 GMT+0100 (Central European Standard Time)",
        endDate:
          "Tue Apr 09 2024 00:00:00 GMT+0100 (Central European Standard Time)",
        category: "education_and_tutoring",
        subCategory: "math_tutor",
        wilaya: "Algiers",
        city: "sidi_moussa",
        budget: "DZD  5, 500",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
        images: ["https://placebear.com/g/200/200"],
        rate: 2.5,
        feedback:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      },
      {
        title: "na7ihom memba3d ",
        startDate:
          "Wed Oct 19 2022 07:07:43 GMT+0100 (Central European Standard Time)",
        endDate:
          "Tue Apr 09 2024 00:00:00 GMT+0100 (Central European Standard Time)",
        category: "education_and_tutoring",
        subCategory: "math_tutor",
        wilaya: "Algiers",
        city: "sidi_moussa",
        budget: "DZD  5, 500",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
        images: ["https://placebear.com/g/200/200"],
        rate: 2.5,
        feedback:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      },
      {
        title: "na7ihom memba3d ",
        startDate:
          "Wed Oct 19 2022 07:07:43 GMT+0100 (Central European Standard Time)",
        endDate:
          "Tue Apr 09 2024 00:00:00 GMT+0100 (Central European Standard Time)",
        category: "education_and_tutoring",
        subCategory: "math_tutor",
        wilaya: "Algiers",
        city: "sidi_moussa",
        budget: "DZD  5, 500",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
        images: ["https://placebear.com/g/200/200"],
        rate: 4.5,
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
    // teksar eras fel batel cors w mech3aref w lazem photoProfileSrc yzidha ilyes fel bdd .. khlas na7itha w f edit avatar card radit image tebda null (la bgha l user el src ta3 nafs l image li darha awal mara beh ghi hiya w ymodifi fiha y3awed ytala3ha w khlas) tema ay haja 3andha 3ala9a bel imagesrc na7itha hna ma3andna mandirou biha / mais fel slide seven khatitha kima rahi bah ida dert back moraha next w tefta7 el edit tel9a l image src fel edit mais hna ma3adnach back w next w fel state goulna ga3 la dernaha ra7 tkoun null tema makan hata fayda ki dirha w koun tebghi tdirha fel bdd lazem yzidha ilyes fel bdd w lazem tkoun cors w mech3aref .. tema makalah

    photoProfile: "https://placebear.com/g/200/200",
  });

  if (profileInfo)
    return (
      <>
        <Header />
        <PageContainer>
          <SearchBar />
          <Proposal
            proposal={info}
            profileInfo={profileInfo}
            coverLetter={info.coverLetter}
            budget={info.budget}
            action={true}
          />
        </PageContainer>
        <Footer />
      </>
    );
}
