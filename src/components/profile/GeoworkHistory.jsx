import { useState, useRef, useEffect } from "react";
import GeoworkItem from "@/components/profile/GeoworkItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CollapsibleContainer from "@/components/common/CollapsibleContainer";
import { v4 as uuid } from "uuid";

const jobs = [
  {
    title: "Residential Wiring Upgrade",
    startDate:
      "Wed Apr 09 2024 07:07:43 GMT+0100 (Central European Standard Time)",
    endDate:
      "Tue Apr 19 2024 00:00:00 GMT+0100 (Central European Standard Time)",
    category: "education_and_tutoring",
    subCategory: "math_tutor",
    wilaya: "algiers",
    city: "sidi_moussa",
    budget: "DZD  5, 500",
    description:
      "Upgraded the electrical wiring in a three-bedroom apartment in Algiers. Replaced old wiring with new, safe, and efficient wiring, installed new circuit breakers, and ensured all outlets and switches were up to code.",
    images: ["https://placebear.com/g/200/200"],
    rate: 2.5,
    canceled: false,
    feedback:
      "The electrician did an excellent job upgrading our home's wiring. He was professional, punctual, and made sure everything was done safely and efficiently. We feel much safer now with the new wiring. Highly recommended!",
  },
  {
    title: "na7ihom memba3d ",
    startDate:
      "Wed Apr 09 2024 07:07:43 GMT+0100 (Central European Standard Time)",
    endDate:
      "Tue Apr 19 2024 00:00:00 GMT+0100 (Central European Standard Time)",
    category: "education_and_tutoring",
    subCategory: "math_tutor",
    wilaya: "algiers",
    city: "sidi_moussa",
    budget: "DZD  5, 500",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
    images: ["https://placebear.com/g/200/200"],
    rate: 3.5,
    feedback:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
  },
  {
    title: "na7ihom memba3d ",
    startDate:
      "Wed Apr 09 2024 07:07:43 GMT+0100 (Central European Standard Time)",
    endDate:
      "Tue Apr 19 2024 00:00:00 GMT+0100 (Central European Standard Time)",
    category: "education_and_tutoring",
    subCategory: "math_tutor",
    wilaya: "algiers",
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
    wilaya: "algiers",
    city: "sidi_moussa",
    budget: "DZD  5, 500",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
    images: ["https://placebear.com/g/200/200"],
    rate: 4.5,
    feedback:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
  },
];

export default function GeoworkHistory({ profileInfo }) {
  return (
    <>
      <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-header font-semibold mb-1">
            Geowork History
          </h3>
          <CollapsibleContainer>
            {jobs.length == 0 ? (
              <div className=" text-lg w-full p-3 h-fit text-primary flex justify-center items-center">
                there is no items here
              </div>
            ) : (
              jobs.map((job, index) => (
                <div key={uuid()} className="mb-4">
                  <GeoworkItem job={job} index={index} />
                  <Separator />
                </div>
              ))
            )}
          </CollapsibleContainer>
        </div>
      </div>
    </>
  );
}
