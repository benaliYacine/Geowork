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
    role: "electrician",
    rating: Math.random() * 5,
    avatarUrl:
      "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
    wilaya: "algiers",
    city: "Central",
    budget: "DZD  5, 500",
    coverLetter:
      "Hello! \n\n \t I am writing to express my interest in the Residential Wiring Upgrade project for your three-bedroom apartment in Algiers. With over a decade of experience in the electrical field, I am confident in my ability to deliver high-quality and safe electrical services tailored to your needs. I hold a Bachelor's Degree in Electrical Engineering from USTHB and have completed various certifications in residential electrical systems and electrical safety. My extensive experience includes upgrading wiring, installing circuit breakers, and ensuring all electrical components meet local codes and safety standards. In previous projects, I have successfully improved electrical efficiency and safety for numerous clients. I take pride in my attention to detail and commitment to providing reliable and efficient solutions. I understand the importance of safety and will ensure that your home’s electrical system is upgraded to the highest standards. I am available to start the project at your earliest convenience and will work diligently to complete it within the agreed timeframe. I look forward to the opportunity to discuss your project further and answer any questions you may have. Thank you for considering my proposal. I am excited about the possibility of working with you to enhance the safety and functionality of your home’s electrical system. Best regards",
  });
  const [profileInfo, setProfileInfo] = useState({
    roleTitle: "Residential Electrician", // Initialize with empty string or a default value
    category: "home_improvement_and_maintenance",
    subCategory: "electrician",
    employments: [
      {
        title: "Residential Electrician",
        company: "El Djazair Electric",
        Location: " Algiers, Algeria",
        currentlyIn: true,
        date: {
          start: {
            month: 9,
            year: 2023,
          },
          end: {
            month: 2,
            year: 2021,
          },
        },
        description:
          " Installed and maintained electrical systems in residential buildings. Ensured compliance with safety standards and local codes.",
      },
      {
        title: "Commercial Electrician",
        company: "Sahara Power Solutions",
        Location: "Oran, Algeria",
        currentlyIn: true,
        date: {
          start: {
            month: 5,
            year: 2017,
          },
          end: {
            month: 1,
            year: 2022,
          },
        },
        description:
          "Handled electrical wiring and systems for commercial properties. Performed regular maintenance and troubleshooting.",
      },
      {
        title: " Industrial Electrician",
        company: "Sonatrach Energy",
        Location: "Hassi Messaoud, Algeria",
        currentlyIn: true,
        date: {
          start: {
            month: 5,
            year: 2007,
          },
          end: {
            month: 1,
            year: 2015,
          },
        },
        description:
          " Maintained and repaired electrical equipment in an industrial setting. Worked on high-voltage systems and ensured operational efficiency.",
      },
    ],
    experiences: [
      {
        title: "Residential Installations",
        description:
          " Installed wiring and electrical systems for new homes. Worked independently and collaborated with local builders.",
      },
      {
        title: "Commercial Lighting Upgrades",
        description:
          "Upgraded lighting systems for small businesses. Improved energy efficiency and reduced operational costs.",
      },
      {
        title: "Home Electrical Repairs",
        description:
          "Performed electrical repairs for friends and neighbors. Fixed wiring issues, replaced outlets, and installed new fixtures.",
      },
    ],
    educations: [
      {
        school:
          "University of Science and Technology Houari Boumediene (USTHB)",
        degree: " Bachelor's Degree",
        fieldOfStudy: " Electrical Engineering",
        datesAttended: {
          start: 2010,
          end: 2014,
        },
        description:
          "Completed comprehensive coursework in electrical systems, circuits, and power distribution. Participated in hands-on lab projects.",
      },
      {
        school: "Algerian Vocational Training Center",
        degree: "Certification",
        fieldOfStudy: "Residential Electrical Systems",
        datesAttended: {
          start: 2015,
          end: 2016,
        },
        description:
          "Specialized in residential electrical wiring and safety practices. Certified to work as a residential electrician.",
      },
      {
        school: "National Institute of Renewable Energy (INE)",
        degree: "Certification",
        fieldOfStudy: "Solar Energy Systems",
        datesAttended: {
          start: 2017,
          end: 2018,
        },
        description:
          "Studied the design and installation of solar power systems. Emphasized sustainable energy solutions and practical applications.",
      },
    ],
    jobs: [
      {
        title: "Residential Wiring Upgrade",
        startDate:
          "Wed Apr 09 2024 07:07:43 GMT+0100 (Central European Standard Time)",
        endDate:
          "Tue Apr 19 2024 00:00:00 GMT+0100 (Central European Standard Time)",
        category: "home_improvement_and_maintenance",
        subCategory: "electrician",
        wilaya: "algiers",
        city: "sidi_moussa",
        budget: "DZD  5, 500",
        description:
          "Upgraded the electrical wiring in a three-bedroom apartment in Algiers. Replaced old wiring with new, safe, and efficient wiring, installed new circuit breakers, and ensured all outlets and switches were up to code.",
        images: [
          "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
        ],
        rate: 4.5,
        canceled: false,
        feedback:
          "The electrician did an excellent job upgrading our home's wiring. He was professional, punctual, and made sure everything was done safely and efficiently. We feel much safer now with the new wiring. Highly recommended!",
      },
    ],
    Bio: "I am an experienced electrician with over a decade of expertise in residential, commercial, and industrial electrical systems. With a Bachelor's Degree in Electrical Engineering from USTHB and certifications in various specialized fields, I have a strong foundation in both theoretical knowledge and practical skills. I have worked on a wide range of projects, from installing solar panels in rural communities to upgrading commercial lighting systems. My passion for sustainable energy solutions and commitment to electrical safety have driven my career. Whether it's troubleshooting complex issues or providing emergency services, I am dedicated to delivering reliable and efficient electrical solutions to my clients in Algeria.",
    // dateBirthday:"Thu Mar 07 2024 00:00:00 GMT+0100 (Central European Standard Time)",
    dateBirthday: undefined,
    streetAdress: "123 Rue Didouche Mourad, Algiers, Algeria",
    phone: "05 62 17 02 86",
    photoProfile:
      "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
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
