import { React, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from "./MessageItem"; // Import the updated MessageItem component

// Updated sample data with message types
const messages = [
    {
        id: -2,
        senderName: "Alice",
        message: {
            type: "jobLocation",
            location: { lat: 36.752255, lng: 3.042327 },
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: -1,
        senderName: "Alice",
        message: {
            type: "jobLocation",
            location: { lat: 36.752255, lng: 3.042327 },
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 0,
        senderName: "Alice",
        message: {
            type: "proposal",
            budget: "DZD  5, 500",
            coverLetter:
                "Hello! \n\n \t I am writing to express my interest in the Residential Wiring Upgrade project for your three-bedroom apartment in Algiers. With over a decade of experience in the electrical field, I am confident in my ability to deliver high-quality and safe electrical services tailored to your needs. I hold a Bachelor's Degree in Electrical Engineering from USTHB and have completed various certifications in residential electrical systems and electrical safety. I am excited about the possibility of working with you to enhance the safety and functionality of your home’s electrical system. Best regards.",
            state: "waiting",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 0,
        senderName: "Alice",
        message: {
            type: "proposal",
            budget: "DZD  5, 500",
            coverLetter:
                "Hello! \n\n \t I am writing to express my interest in the Residential Wiring Upgrade project for your three-bedroom apartment in Algiers. With over a decade of experience in the electrical field, I am confident in my ability to deliver high-quality and safe electrical services tailored to your needs. I hold a Bachelor's Degree in Electrical Engineering from USTHB and have completed various certifications in residential electrical systems and electrical safety. I am excited about the possibility of working with you to enhance the safety and functionality of your home’s electrical system. Best regards.",
            state: "waiting",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 1,
        senderName: "Alice",
        message: {
            type: "proposal",
            budget: "DZD  5, 500",
            coverLetter:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            state: "waiting",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 2,
        senderName: "Alice",
        message: {
            type: "proposal",
            budget: "DZD  5, 500",
            coverLetter:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            state: "accepted",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 3,
        senderName: "Alice",
        message: {
            type: "proposal",
            budget: "DZD  5, 500",
            coverLetter:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            state: "accepted",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 3,
        senderName: "Alice",
        message: {
            type: "proposal",
            budget: "DZD  5, 500",
            coverLetter:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            state: "closed",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 3,
        senderName: "Alice",
        message: {
            type: "proposal",
            budget: "DZD  5, 500",
            coverLetter:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            state: "closed",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 3,
        senderName: "Alice",
        message: {
            type: "proposal",
            budget: "DZD  5, 500",
            coverLetter:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            state: "canceled",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 3,
        senderName: "Alice",
        message: {
            type: "proposal",
            budget: "DZD  5, 500",
            coverLetter:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            state: "reported",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 3,
        senderName: "Aliced",
        message: {
            type: "proposal",
            budget: "DZD  5, 500",
            coverLetter:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            state: "canceled",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 4,
        senderName: "Alice",
        message: {
            type: "budgetEdit",
            from: "DZD  5, 500",
            to: "DZD  6, 500",
            state: "waiting",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 5,
        senderName: "Alice",
        message: {
            type: "budgetEdit",
            from: "DZD  5, 500",
            to: "DZD  6, 500",
            state: "waiting",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 6,
        senderName: "Alice",
        message: {
            type: "budgetEdit",
            from: "DZD  5, 500",
            to: "DZD  6, 500",
            state: "accepted",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 7,
        senderName: "Alice",
        message: {
            type: "budgetEdit",
            from: "DZD  5, 500",
            to: "DZD  6, 500",
            state: "accepted",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 8,
        senderName: "Alice",
        message: {
            type: "budgetEdit",
            from: "DZD  5, 500",
            to: "DZD  6, 500",
            state: "denied",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 9,
        senderName: "Alice",
        message: {
            type: "budgetEdit",
            from: "DZD  5, 500",
            to: "DZD  6, 500",
            state: "denied",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 10,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "sidi_moussa",
            state: "waiting",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 10,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "sidi_moussa",
            state: "waiting",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 12,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "waiting",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 13,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "accepted",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 14,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "accepted",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 15,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "denied",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 16,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "denied",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 16,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "closed",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 16,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "closed",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 16,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "canceled",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 16,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "canceled",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 16,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "reported",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 16,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "withrawed",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 16,
        senderName: "Alice",
        message: {
            type: "invitation",
            images: [
                "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
            ],
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            title: `Residential Wiring Upgrade`,
            budget: "DZD  5, 500",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
            wilaya: "algiers",
            city: "Central",
            state: "withrawed",
        },
        timestamp: "10:00 AM",
        isOwnMessage: true,
    },
    {
        id: 17,
        senderName: "Alice",
        message: {
            type: "text",
            content:
                "Hey, how are you? asDasg g dfgjdf gkd kgjhdfg hdsfgjkh sdfkjg kjdhfgkjhd kjdsf gkjhdf gkj sdfasd asdfa ssdf sdsdf sad sdfasd fsad s adafasdf asdf as dsfg sdf dfgf d sdfg sdf  sdfgsdf  sdfgsdf dfgsdf gsdf sd dfgsdfg  dsfg sdffg  dfg dsf g dfg dfg  dsfg dsf ",
        },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 19,
        senderName: "User",
        message: { type: "text", content: "I'm good, thanks! And you?" },
        timestamp: "10:01 AM",
        isOwnMessage: true,
    },
    {
        id: 20,
        senderName: "Alice",
        message: {
            type: "image",
            url: "https://picsum.photos/536/354",
            content: "Sent an image",
        },
        timestamp: "10:05 AM",
        isOwnMessage: false,
    },
    {
        id: 21,
        senderName: "User",
        message: {
            type: "file",
            url: "https://example.com/file.pdf",
            content: "Sent a file",
        },
        timestamp: "10:07 AM",
        isOwnMessage: true,
    },
    {
        id: 22,
        senderName: "Alice",
        message: { type: "text", content: "Hey, how are you?" },
        timestamp: "10:00 AM",
        isOwnMessage: false,
    },
    {
        id: 23,
        senderName: "User",
        message: { type: "text", content: "I'm good, thanks! And you?" },
        timestamp: "10:01 AM",
        isOwnMessage: true,
    },
    {
        id: 24,
        senderName: "Alice",
        message: {
            type: "image",
            url: "https://picsum.photos/536/354",
            content: "Sent an image",
        },
        timestamp: "10:05 AM",
        isOwnMessage: false,
    },
    {
        id: 25,
        senderName: "User",
        message: {
            type: "file",
            url: "https://example.com/file.pdf",
            content: "Sent a file",
        },
        timestamp: "10:07 AM",
        isOwnMessage: true,
    },
    // Add more messages as needed
].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

function MessageList({ messages=[] ,updateMessage }) {
//   function MessageList({messages=[], updateMessage}) {
  console.log("messageList", messages);
  const messagesEndRef = useRef(null);
  // Scroll to the bottom of the messages list every time the messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({});
    }
  }, [messages]);

    return (
        <ScrollArea className=" h-full w-full rounded-lg bg-bg overflow-y-auto">
            <div className=" flex flex-col">
                {messages.map((msg) => (
                    <MessageItem
                        key={msg.id}
                        id={msg.id}
                        senderName={msg.senderName}
                        message={msg.message}
                        timestamp={msg.timestamp}
                        isOwnMessage={msg.isOwnMessage}
                        updateMessage={updateMessage}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            {/* Empty div to act as a scroll target */}
        </ScrollArea>
    );
}

export default MessageList;
