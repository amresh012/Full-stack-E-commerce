import { GrBarChart } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBlog } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa";
import {CgWebsite} from "react-icons/cg"



// our solutions
export const gymEcommerceSolutions = [
  {
    category: "Gym Equipment and Accessories",
    solutions: [
      { feature: "Product Variety", description: "Sell a wide variety of gym equipment like treadmills, dumbbells, resistance bands, and yoga mats." },
      { feature: "Custom Bundles", description: "Offer equipment bundles based on fitness goals (e.g., weight loss, muscle building)." },
      { feature: "Product Guides", description: "Provide detailed guides or blog posts on how to use various equipment." }
    ]
  },
  {
    category: "Home Gym Setup",
    solutions: [
      { feature: "Custom Packages", description: "Provide tailored home gym setup services based on available space, budget, and fitness goals." },
      { feature: "Consultation Services", description: "Offer virtual consultations to help customers design their home gyms." },
      { feature: "Installation Services", description: "Include installation and assembly services as part of the purchase." }
    ]
  },
  {
    category: "Commercial Gym Setup",
    solutions: [
      { feature: "Bulk Equipment Deals", description: "Offer discounted packages for gyms setting up or upgrading their facilities." },
      { feature: "Gym Design", description: "Provide 3D design and layout services to help commercial gyms optimize their space." },
      { feature: "Maintenance and Support", description: "Include ongoing support and maintenance plans for equipment." }
    ]
  },
  {
    category: "Fitness Apparel and Accessories",
    solutions: [
      { feature: "Clothing Line", description: "Sell gym wear like compression clothing, training shoes, and other fitness-related apparel." },
      { feature: "Fitness Accessories", description: "Include items such as gym bags, water bottles, and sweatbands." }
    ]
  },
  {
    category: "Subscription-Based Services",
    solutions: [
      { feature: "Personalized Workout Plans", description: "Provide tailored workout programs based on user fitness levels and goals." },
      { feature: "Nutrition Plans", description: "Offer meal plans or dietary advice to complement workout routines." },
      { feature: "Virtual Training", description: "Enable access to virtual personal trainers or fitness classes through subscription plans." }
    ]
  },
  {
    category: "Membership Discounts and Loyalty Programs",
    solutions: [
      { feature: "Loyalty Points", description: "Offer points on every purchase that can be redeemed for discounts or free products." },
      { feature: "Membership Tiers", description: "Create tiers (Bronze, Silver, Gold) that offer increasing discounts and exclusive access to products or services." }
    ]
  },
  // {
  //   category: "Fitness Gadgets",
  //   solutions: [
  //     { feature: "Wearables", description: "Sell fitness trackers, smartwatches, and heart rate monitors to track workouts and health metrics." },
  //     { feature: "Smart Equipment", description: "Offer smart gym equipment that can sync with mobile apps or track progress automatically." }
  //   ]
  // },
  // {
  //   category: "Supplement Sales",
  //   solutions: [
  //     { feature: "Protein Powders & Bars", description: "Offer a range of supplements like protein shakes, meal replacements, and pre-workout powders." },
  //     { feature: "Nutrition Guides", description: "Include detailed information about supplements and when to use them." }
  //   ]
  // },
  // {
  //   category: "Community Building",
  //   solutions: [
  //     { feature: "Fitness Forums", description: "Provide a space where customers can share their fitness journeys, ask questions, and seek motivation." },
  //     { feature: "Workshops and Webinars", description: "Host virtual fitness workshops or webinars featuring trainers, nutritionists, or athletes." }
  //   ]
  // },
];



export const links = [
  {
    name: "Accessories",
    route: "/category?=accessories",
    submenu: false,
  },
  {
    name: "Benches and Racks",
    route: "/category?=benches-and-racks",
    submenu: true,
    sublink: [
      {
        label: "Benches",
        route: "/category?=benches-and-racks&subcategory?=benches",
      },
      {
        label: "Functional Trainers",
        route: "/category?=benches-and-racks&subcategory?=functional-trainer",
      },
      {
        label: "Smith Machine",
        route: "/category?=benches-and-racks&subcategory?=smith-machine",
      },
    ],
  },
  {
    name: "Cardio",
    route: "/category?=cardio",
    submenu: true,
    sublink: [
      {
        label: "TreadMill",
        route: "/category?=cardio&subcategory?=treadmill",
      },
      {
        label: "Cross Trainers",
        route: "/category?=cardio&subcategory?=cross-trainer",
      },
      {
        label: "Excrise Bikes",
        route: "/category?=cardio&subcategory?=exercise-bike",
      },
      {
        label: "HIIT",
        route: "/category?=cardio&subcategory?=hiit",
      },
    ],
  },
  {
    name: "Strength",
    route: "/category?=strength",
    submenu: true,
    sublink: [
      {
        label: "GL SERIES",
        route: "GL SERIES",
      },
      {
        label: "M5 SERIES",
        route: "M5 SERIES",
      },
      {
        label: "M5S SERIES",
        route: "M5S SERIES",
      },
      {
        label: "MG LUXUORY SERIES",
        route: "MG LUXUORY SERIES",
      },
      {
        label: "T8 PREMIUM SERIES",
        route: "T8 PREMIUM SERIES",
      },
      {
        label: "M8F",
        route: "M8F",
      },
      {
        label: "PLATE LOAD",
        route: "/",
        submenu: true,
        sublink: [
          {
            label: "V SERIES",
            route: "/",
          },
        ],
      },
    ],
  },
  {
    name: "Shop All",
    route: "/product",
    submenu: false,
  },
];

export const range_of_products = [
  {
    id: 0,
    label: "HOME RANGE",
  },
  {
    id: 0,
    label: "CARDIO",
  },
  {
    id: 0,
    label: "STRENGTH",
  },
  {
    id: 0,
    label: "BENCHES AND RACKS",
  },
  {
    id: 0,
    label: "COMMERCIAL SETUP",
  },
];

export const LikeItem = [
  {
    name: "45 Degree Leg Press",
    price: "168,174",
    desc: "Gym Leg Press Machine",
    ImgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHB6wEJdE8p-PLJZaOPImO_FEyjxxkHwfQ6dhke2th5JEl4G_7LIX9sWpHNA&s",
  },
  {
    name: "45 Degree Leg Press",
    price: "168,174",
    desc: "Gym Leg Press Machine",
    ImgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHB6wEJdE8p-PLJZaOPImO_FEyjxxkHwfQ6dhke2th5JEl4G_7LIX9sWpHNA&s",
  },
  {
    name: "45 Degree Leg Press",
    price: "168,174",
    desc: "Gym Leg Press Machine",
    ImgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHB6wEJdE8p-PLJZaOPImO_FEyjxxkHwfQ6dhke2th5JEl4G_7LIX9sWpHNA&s",
  },
  {
    name: "45 Degree Leg Press",
    price: "168,174",
    desc: "Gym Leg Press Machine",
    ImgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHB6wEJdE8p-PLJZaOPImO_FEyjxxkHwfQ6dhke2th5JEl4G_7LIX9sWpHNA&s",
  },
  {
    name: "45 Degree Leg Press",
    price: "168,174",
    desc: "Gym Leg Press Machine",
    ImgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHB6wEJdE8p-PLJZaOPImO_FEyjxxkHwfQ6dhke2th5JEl4G_7LIX9sWpHNA&s",
  },
  {
    name: "45 Degree Leg Press",
    price: "168,174",
    desc: "Gym Leg Press Machine",
    ImgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHB6wEJdE8p-PLJZaOPImO_FEyjxxkHwfQ6dhke2th5JEl4G_7LIX9sWpHNA&s",
  },
];

export const Clients = [
  {
    id: 0,
    location: "Banglore",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/WTF.jpg",
  },
  {
    id: 1,
    location: "Haansi, Haryana",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/warrier.jpg",
  },
  {
    id: 2,
    location: "Raipur, Chattisgardh",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/The-Queen.jpg",
  },
  {
    id: 3,
    location: "Panagarh, WB",
    imgurl:
      "https://kfsfitness.com/wp-content/uploads/2023/05/Royal-Fitness.jpg",
  },
  {
    id: 4,
    location: "Modinagar, UP",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/RK-Fitness.jpg",
  },
  {
    id: 5,
    location: "West Bangal",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/RFC.jpg",
  },
  {
    id: 6,
    location: "Jalalabad, Punjab",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/MG.jpg",
  },
  {
    id: 7,
    location: "Siwan, Bihar",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/House-Gym.jpg",
  },
  {
    id: 8,
    location: "Ara, Bihar",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/Gym-Town.jpg",
  },
  {
    id: 9,
    location: "Dwarka, Delhi",
    imgurl:
      "https://kfsfitness.com/wp-content/uploads/2023/05/Fitness-club.jpg",
  },
  {
    id: 10,
    location: "Faridabad",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/Fit-India.jpg",
  },
  {
    id: 11,
    location: "Indore",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/Energy-Gym.jpg",
  },
  {
    id: 12,
    location: "Bhopal",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/E2-Fitness.jpg",
  },
  {
    id: 13,
    location: "Noida, UP",
    imgurl:
      "https://kfsfitness.com/wp-content/uploads/2023/05/Bull-Fitness.jpg",
  },
  {
    id: 14,
    location: "Singrauli, MP",
    imgurl: "https://kfsfitness.com/wp-content/uploads/2023/05/BMW.jpg",
  },
];

// blog



// product category
export const gym_equipment = [
  "Cardio",
  "strength"
  // "Elliptical Machine",
  // "Stationary Bike",
  // "Rowing Machine",
  // "Dumbbells",
  // "Barbells",
  // "Kettlebells",
  // "Resistance Bands",
  // "Pull-Up Bar",
  // "Cable Machine",
  // "Leg Press Machine",
  // "Smith Machine",
  // "Bench Press",
  // "Squat Rack",
  // "Medicine Ball",
  // "Exercise Mat",
  // "Foam Roller",
  // "Stability Ball",
  // "Battle Ropes",
  // "Plyo Box",
  // "Jump Rope",
  // "Lat Pulldown Machine",
  // "Leg Curl Machine",
  // "Chest Press Machine",
  // "Ab Wheel",
];

// price list
export const gym_product_pricing_inr = [
  "₹41,500 - ₹2,49,000",
  "₹24,900 - ₹2,07,500",
  "₹16,600 - ₹1,66,000",
  "₹16,600 - ₹1,24,500",
  "₹1,660 - ₹41,500",
  "₹8,300 - ₹66,400",
  "₹1,245 - ₹24,900",
  "₹830 - ₹8,300",
  "₹1,660 - ₹12,450",
  "₹83,000 - ₹3,32,000",
  "₹1,24,500 - ₹4,15,000",
  "₹83,000 - ₹2,90,500",
  "₹8,300 - ₹41,500",
  "₹16,600 - ₹1,24,500",
  "₹1,245 - ₹8,300",
  "₹830 - ₹8,300",
  "₹830 - ₹4,980",
  "₹1,245 - ₹6,225",
  "₹4,150 - ₹16,600",
  "₹4,150 - ₹16,600",
  "₹415 - ₹4,150",
  "₹41,500 - ₹2,07,500",
  "₹83,000 - ₹2,49,000",
  "₹83,000 - ₹3,32,000",
  "₹830 - ₹4,150",
];

// faqs
export const faqs = [
  {
    question: "What is this app used for?",
    answer:
      "This app helps users find and compare prices of various gym equipment. Whether you're setting up a home gym or outfitting a fitness center, you can browse through a wide range of equipment and see estimated price ranges.",
  },
  {
    question: "How are the prices determined?",
    answer:
      "The prices shown in the app are estimated ranges based on market research and typical retail prices. Prices may vary depending on factors like brand, quality, and where you purchase the equipment.",
  },
  {
    question: "Are the prices shown in real-time?",
    answer:
      "No, the prices in the app are general estimates and may not reflect real-time changes in the market. Always check with the seller or retailer for the most current pricing.",
  },
  {
    question: "Can I purchase gym equipment directly through the app?",
    answer:
      "This app is designed for price comparison and information purposes only. It does not facilitate direct purchases. You will need to visit a retailer's website or store to make a purchase.",
  },
  {
    question: "Is the pricing shown inclusive of taxes and shipping?",
    answer:
      "The pricing ranges provided do not include taxes or shipping costs. Be sure to check with the retailer for any additional charges that may apply.",
  },
  {
    question: "Can I search for specific brands or models?",
    answer:
      "Currently, the app provides general categories of gym equipment with pricing ranges. Brand-specific searches and model comparisons may be added in future updates.",
  },
  {
    question: "How do I convert the prices into my local currency?",
    answer:
      "The app currently displays prices in Indian Rupees (INR). If you need to convert prices to another currency, you can use an online currency converter.",
  },
  {
    question: "Can I save my favorite equipment or price searches?",
    answer:
      "Yes, the app allows you to bookmark your favorite gym equipment and save your searches for quick access later.",
  },
  {
    question: "How often is the pricing information updated?",
    answer:
      "The app is periodically updated to reflect changes in the market. However, prices can fluctuate, and we recommend checking with retailers for the latest information.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "For any questions or issues, you can reach out to our customer support team via the 'Contact Us' section in the app. We’re here to help!",
  },
];

// admin content
export const linksAdmin = [
  {
    id: 0,
    label: "Dashboard",
    route: "/admin",
    icon: GrBarChart,
  },
  {
    id: 1,
    label: "Users",
    route: "/admin/users",
    icon: FaUsers,
  },
  {
    id: 2,
    label: "Orders",
    route: "/admin/orders",
    icon: GoChecklist,
  },
  {
    id: 3,
    label: "Contact US",
    route: "/admin/contactus",
    icon: FaUsers,
  },
  {
    id: 4,
    label: "Products",
    icon: AiOutlineProduct,
    submenu: true,
    sublink: [
      {
        label: "List Products",
        route: "/admin/product-list",
        icon: AiOutlineProduct,
      },
      {
        label: "Add Products",
        route: "/admin/products",
        icon: AiOutlineProduct,
      },
      {
        label: "Bulk Add",
        route: "/admin/bulk-product",
        icon: AiOutlineProduct,
      },
      {
        label: "Add Image",
        route: "/admin/bulk-images",
        icon: AiOutlineProduct,
      },
    ],
  },
  {
    label: "Website",
    icon: CgWebsite,
    submenu: true,
    sublink: [
      {
        label: "Home Page",
        route: "/admin/website",
        icon: CgWebsite,
      },
    ],
  },
     {
      id:5,
    label: "Quotations",
    icon: FaFileContract,
    route: "/admin/quotation",
    submenu: false
     },
  {
    id:6,
    label: "Blogs",
    icon: FaBlog,
    submenu: true,
    sublink: [
      {
        label: "List Blogs",
        route: "/admin/blog-list",
        icon: FaBlog,
      },
      {
        label: "Add Blog",
        route: "/admin/blog",
        icon: FaBlog,
      }
    ],
  },
  {
    id:7,
    label: "Coupon",
    icon: BiSolidDiscount,
    submenu: true,
    sublink: [
      {
        label: "List Coupon",
        route: "/admin/coupon-list",
        icon: BiSolidDiscount,
      },
      {
        label: "Add Coupon",
        route: "/admin/coupon",
        icon: BiSolidDiscount,
      },
    ],
  },
];
