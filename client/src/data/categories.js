const categories = [
    {
        label: "Home Improvement and Maintenance",
        value: "home_improvement_and_maintenance",
        subcategories: [
            { label: "Electrician", value: "electrician" },
            { label: "Plumber", value: "plumber" },
            { label: "HVAC Technician", value: "hvac_technician" },
            { label: "General Contractor", value: "general_contractor" },
            { label: "Painter", value: "painter" },
            { label: "Carpenter", value: "carpenter" },
            { label: "Locksmith", value: "locksmith" }
        ]
    },
    {
        label: "Professional Services",
        value: "professional_services",
        subcategories: [
            { label: "Lawyer", value: "lawyer" },
            { label: "Accountant", value: "accountant" },
            { label: "Tax Consultant", value: "tax_consultant" },
            { label: "Architect", value: "architect" },
            { label: "Interior Designer", value: "interior_designer" },
            { label: "Real Estate Agent", value: "real_estate_agent" }
        ]
    },
    {
        label: "Health and Wellness",
        value: "health_and_wellness",
        subcategories: [
            { label: "General Practitioner", value: "general_practitioner" },
            { label: "Dentist", value: "dentist" },
            { label: "Physical Therapist", value: "physical_therapist" },
            { label: "Personal Trainer", value: "personal_trainer" },
            { label: "Nutritionist", value: "nutritionist" },
            { label: "Psychologist", value: "psychologist" }
        ]
    },
    {
        label: "Personal Care",
        value: "personal_care",
        subcategories: [
            { label: "Barber", value: "barber" },
            { label: "Hair Stylist", value: "hair_stylist" },
            { label: "Makeup Artist", value: "makeup_artist" },
            { label: "Manicurist/Pedicurist", value: "manicurist_pedicurist" },
            { label: "Massage Therapist", value: "massage_therapist" }
        ]
    },
    {
        label: "Tech and IT Services",
        value: "tech_and_it_services",
        subcategories: [
            { label: "IT Support Specialist", value: "it_support_specialist" },
            { label: "Web Developer", value: "web_developer" },
            { label: "Mobile App Developer", value: "mobile_app_developer" },
            { label: "Network Engineer", value: "network_engineer" },
            { label: "Cybersecurity Consultant", value: "cybersecurity_consultant" }
        ]
    },
    {
        label: "Creative and Design",
        value: "creative_and_design",
        subcategories: [
            { label: "Graphic Designer", value: "graphic_designer" },
            { label: "Photographer", value: "photographer" },
            { label: "Videographer", value: "videographer" },
            { label: "Copywriter", value: "copywriter" },
            { label: "SEO Specialist", value: "seo_specialist" }
        ]
    },
    {
        label: "Education and Tutoring",
        value: "education_and_tutoring",
        subcategories: [
            { label: "Language Tutor", value: "language_tutor" },
            { label: "Math Tutor", value: "math_tutor" },
            { label: "Science Tutor", value: "science_tutor" },
            { label: "Music Teacher", value: "music_teacher" },
            { label: "Art Teacher", value: "art_teacher" }
        ]
    },
    {
        label: "Cleaning and Domestic Help",
        value: "cleaning_and_domestic_help",
        subcategories: [
            { label: "House Cleaner", value: "house_cleaner" },
            { label: "Office Cleaner", value: "office_cleaner" },
            { label: "Gardener", value: "gardener" },
            { label: "Pool Cleaner", value: "pool_cleaner" },
            { label: "Pest Control Specialist", value: "pest_control_specialist" }
        ]
    },
    {
        label: "Event Services",
        value: "event_services",
        subcategories: [
            { label: "Event Planner", value: "event_planner" },
            { label: "Caterer", value: "caterer" },
            { label: "DJ", value: "dj" },
            { label: "Wedding Planner", value: "wedding_planner" },
            { label: "Photographer", value: "event_photographer" } // Note: Photographer also appears under Creative and Design
        ]
    },
    {
        label: "Automotive Services",
        value: "automotive_services",
        subcategories: [
            { label: "Auto Mechanic", value: "auto_mechanic" },
            { label: "Auto Electrician", value: "auto_electrician" },
            { label: "Car Wash and Detailing", value: "car_wash_and_detailing" },
            { label: "Tire Repair Specialist", value: "tire_repair_specialist" },
            { label: "Towing Service", value: "towing_service" }
        ]
    },
    {
        label: "Pet Services",
        value: "pet_services",
        subcategories: [
            { label: "Veterinarian", value: "veterinarian" },
            { label: "Pet Groomer", value: "pet_groomer" },
            { label: "Dog Walker", value: "dog_walker" },
            { label: "Pet Sitter", value: "pet_sitter" },
            { label: "Animal Trainer", value: "animal_trainer" }
        ]
    }
];

export { categories };

