import { GrBarChart } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { AiOutlineProduct } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { FaBlog } from "react-icons/fa";


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
    route: '/strenght-equipment/*',
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
];

export const range_of_products = 
[
  {
    id:0,
    label:"HOME RANGE"
  },
  {
    id:0,
    label:"CARDIO"
  },
  {
    id:0,
    label:"STRENGTH"
  },
  {
    id:0,
    label:"BENCHES AND RACKS"
  },
  {
    id:0,
    label:"COMMERCIAL SETUP"
  }
]

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





export const Clients = 
[
 {
  id:0,
  location :"Banglore",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/WTF.jpg"
 },
 {
  id:1,
  location :"Haansi, Haryana",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/warrier.jpg"
 },
 {
  id:2,
  location :"Raipur, Chattisgardh",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/The-Queen.jpg"
 },
 {
  id:3,
  location :"Panagarh, WB",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/Royal-Fitness.jpg"
 },
 {
  id:4,
  location :"Modinagar, UP",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/RK-Fitness.jpg"
 },
 {
  id:5,
  location :"West Bangal",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/RFC.jpg"
 },
 {
  id:6,
  location :"Jalalabad, Punjab",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/MG.jpg"
 },
 {
  id:7,
  location :"Siwan, Bihar",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/House-Gym.jpg"
 },
 {
  id:8,
  location :"Ara, Bihar",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/Gym-Town.jpg"
 },
 {
  id:9,
  location :"Dwarka, Delhi",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/Fitness-club.jpg"
 },
 {
  id:10,
  location :"Faridabad",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/Fit-India.jpg"
 },
 {
  id:11,
  location :"Indore",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/Energy-Gym.jpg"
 },
 {
  id:12,
  location :"Bhopal",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/E2-Fitness.jpg"
 },
 {
  id:13,
  location :"Noida, UP",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/Bull-Fitness.jpg"
 },
 {
  id:14,
  location :"Singrauli, MP",
  imgurl:"https://kfsfitness.com/wp-content/uploads/2023/05/BMW.jpg"
 }
]

// entries array
export const entries = [5,10 , 20 ,50 ,100]
// blog

  export const blog=[
    {
      "title": "10 Essential Exercises for a Full-Body Workout",
      "description": "Discover the top 10 exercises that target every major muscle group for a balanced and effective full-body workout.",
      "time": "08:00 AM",
      "date": "2024-08-02",
      "author_name": "John Doe",
      "device_name": "Desktop"
    },
    {
      "title": "How to Create a Personalized Fitness Plan",
      "description": "Learn how to design a fitness plan tailored to your specific goals, whether it's weight loss, muscle gain, or overall health improvement.",
      "time": "09:30 AM",
      "date": "2024-08-03",
      "author_name": "Jane Smith",
      "device_name": "Laptop"
    },
    {
      "title": "The Benefits of Strength Training for Women",
      "description": "Explore why strength training is crucial for women, debunk common myths, and learn how to get started safely.",
      "time": "11:00 AM",
      "date": "2024-08-04",
      "author_name": "Alex Johnson",
      "device_name": "Tablet"
    },
    {
      "title": "A Beginner’s Guide to HIIT Workouts",
      "description": "An introduction to High-Intensity Interval Training (HIIT), including benefits, tips, and sample workouts for beginners.",
      "time": "07:15 AM",
      "date": "2024-08-05",
      "author_name": "Chris Lee",
      "device_name": "Smartphone"
    },
    {
      "title": "Top 5 Cardio Workouts That Burn the Most Calories",
      "description": "Find out which cardio exercises are most effective for burning calories and improving cardiovascular health.",
      "time": "12:00 PM",
      "date": "2024-08-06",
      "author_name": "Morgan Brown",
      "device_name": "Desktop"
    },
    {
      "title": "The Importance of Flexibility and Mobility in Fitness",
      "description": "Understand why flexibility and mobility are key components of fitness and learn exercises to enhance both.",
      "time": "03:00 PM",
      "date": "2024-08-07",
      "author_name": "Taylor Davis",
      "device_name": "Laptop"
    },
    {
      "title": "How to Stay Motivated on Your Fitness Journey",
      "description": "Discover practical tips and strategies to keep your motivation high as you pursue your fitness goals.",
      "time": "08:45 AM",
      "date": "2024-08-08",
      "author_name": "Jordan Miller",
      "device_name": "Tablet"
    },
    {
      "title": "The Role of Nutrition in Achieving Fitness Goals",
      "description": "Learn how proper nutrition supports your workout routine and helps you reach your fitness objectives faster.",
      "time": "01:30 PM",
      "date": "2024-08-09",
      "author_name": "Casey Taylor",
      "device_name": "Smartphone"
    },
    {
      "title": "5 Common Mistakes to Avoid in the Gym",
      "description": "Identify and correct common gym mistakes that can hinder your progress and increase the risk of injury.",
      "time": "10:15 AM",
      "date": "2024-08-10",
      "author_name": "Alex Johnson",
      "device_name": "Desktop"
    },
    {
      "title": "How to Recover Faster After Intense Workouts",
      "description": "Tips and techniques for speeding up recovery after intense workouts, including stretching, hydration, and rest.",
      "time": "04:30 PM",
      "date": "2024-08-11",
      "author_name": "Morgan Brown",
      "device_name": "Laptop"
    },
    {
      "title": "The Best Home Gym Equipment for Small Spaces",
      "description": "Recommendations for compact and versatile home gym equipment perfect for small spaces.",
      "time": "06:00 AM",
      "date": "2024-08-12",
      "author_name": "Taylor Davis",
      "device_name": "Tablet"
    },
    {
      "title": "Mind-Body Connection: The Benefits of Yoga and Meditation",
      "description": "Explore how yoga and meditation can enhance your physical and mental well-being as part of your fitness routine.",
      "time": "02:15 PM",
      "date": "2024-08-13",
      "author_name": "Chris Lee",
      "device_name": "Smartphone"
    },
    {
      "title": "How to Track Your Fitness Progress Effectively",
      "description": "Learn the best methods for tracking your fitness progress, from apps to journals, and how to stay accountable.",
      "time": "09:45 AM",
      "date": "2024-08-14",
      "author_name": "Jordan Miller",
      "device_name": "Desktop"
    },
    {
      "title": "The Pros and Cons of Group Fitness Classes",
      "description": "An overview of the benefits and drawbacks of participating in group fitness classes versus working out alone.",
      "time": "07:30 AM",
      "date": "2024-08-15",
      "author_name": "Casey Taylor",
      "device_name": "Laptop"
    },
    {
      "title": "Understanding the Different Types of Protein Supplements",
      "description": "A guide to the various protein supplements available, including whey, casein, and plant-based options.",
      "time": "12:45 PM",
      "date": "2024-08-16",
      "author_name": "Chris Lee",
      "device_name": "Tablet"
    },
    {
      "title": "How to Improve Your Posture with Strength Training",
      "description": "Exercises and tips for using strength training to correct and improve your posture.",
      "time": "10:00 AM",
      "date": "2024-08-17",
      "author_name": "Alex Johnson",
      "device_name": "Smartphone"
    },
    {
      "title": "The Benefits of CrossFit for Functional Fitness",
      "description": "Learn about CrossFit and how it can enhance functional fitness, improve strength, and boost overall health.",
      "time": "11:30 AM",
      "date": "2024-08-18",
      "author_name": "Taylor Davis",
      "device_name": "Desktop"
    },
    {
      "title": "Tips for Staying Fit While Traveling",
      "description": "Practical advice on how to maintain your fitness routine while on the go, including travel-friendly workouts.",
      "time": "03:45 PM",
      "date": "2024-08-19",
      "author_name": "Jordan Miller",
      "device_name": "Laptop"
    },
    {
      "title": "The Impact of Sleep on Fitness and Recovery",
      "description": "Explore the crucial role sleep plays in muscle recovery, weight management, and overall fitness success.",
      "time": "08:30 AM",
      "date": "2024-08-20",
      "author_name": "Morgan Brown",
      "device_name": "Tablet"
    },
    {
      "title": "How to Set Realistic Fitness Goals and Achieve Them",
      "description": "Step-by-step guidance on setting attainable fitness goals and creating a plan to achieve them.",
      "time": "07:00 AM",
      "date": "2024-08-21",
      "author_name": "Casey Taylor",
      "device_name": "Smartphone"
    }
  ]



  // product category
  export const gym_equipment = [
    "Treadmill",
    "Elliptical Machine",
    "Stationary Bike",
    "Rowing Machine",
    "Dumbbells",
    "Barbells",
    "Kettlebells",
    "Resistance Bands",
    "Pull-Up Bar",
    "Cable Machine",
    "Leg Press Machine",
    "Smith Machine",
    "Bench Press",
    "Squat Rack",
    "Medicine Ball",
    "Exercise Mat",
    "Foam Roller",
    "Stability Ball",
    "Battle Ropes",
    "Plyo Box",
    "Jump Rope",
    "Lat Pulldown Machine",
    "Leg Curl Machine",
    "Chest Press Machine",
    "Ab Wheel"
]


// price list
export const  gym_product_pricing_inr = [
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
    "₹830 - ₹4,150"      
]


// faqs
export
const faqs = [
  {
      question: "What is this app used for?",
      answer: "This app helps users find and compare prices of various gym equipment. Whether you're setting up a home gym or outfitting a fitness center, you can browse through a wide range of equipment and see estimated price ranges."
  },
  {
      question: "How are the prices determined?",
      answer: "The prices shown in the app are estimated ranges based on market research and typical retail prices. Prices may vary depending on factors like brand, quality, and where you purchase the equipment."
  },
  {
      question: "Are the prices shown in real-time?",
      answer: "No, the prices in the app are general estimates and may not reflect real-time changes in the market. Always check with the seller or retailer for the most current pricing."
  },
  {
      question: "Can I purchase gym equipment directly through the app?",
      answer: "This app is designed for price comparison and information purposes only. It does not facilitate direct purchases. You will need to visit a retailer's website or store to make a purchase."
  },
  {
      question: "Is the pricing shown inclusive of taxes and shipping?",
      answer: "The pricing ranges provided do not include taxes or shipping costs. Be sure to check with the retailer for any additional charges that may apply."
  },
  {
      question: "Can I search for specific brands or models?",
      answer: "Currently, the app provides general categories of gym equipment with pricing ranges. Brand-specific searches and model comparisons may be added in future updates."
  },
  {
      question: "How do I convert the prices into my local currency?",
      answer: "The app currently displays prices in Indian Rupees (INR). If you need to convert prices to another currency, you can use an online currency converter."
  },
  {
      question: "Can I save my favorite equipment or price searches?",
      answer: "Yes, the app allows you to bookmark your favorite gym equipment and save your searches for quick access later."
  },
  {
      question: "How often is the pricing information updated?",
      answer: "The app is periodically updated to reflect changes in the market. However, prices can fluctuate, and we recommend checking with retailers for the latest information."
  },
  {
      question: "How can I contact customer support?",
      answer: "For any questions or issues, you can reach out to our customer support team via the 'Contact Us' section in the app. We’re here to help!"
  }
];



// admin content
export const linksAdmin = 
[
  {
    id:0,
    label:"Dashboard",
    route:"/admin",
    icon: GrBarChart
  },
  {
    id:1,
    label:"Users",
    route:"/admin/users",
    icon:FaUsers
  },
  {
    id:0,
    label:"Orders",
    route:"/admin/orders",
    icon:GoChecklist
  },
  {
    id:0,
    label:"Contact US",
    route:"/admin/contactus",
    icon:FaUsers
  },
  {
    id:0,
    label:"Products",
    icon:AiOutlineProduct,
    submenu:true,
    sublink:[
      {
        label:"List Products",
        route:"/admin/product-list",
        icon:AiOutlineProduct
      },
      {
        label:"Add Products",
        route:"/admin/products",
        icon:AiOutlineProduct
      },
      {
        label:"Bulk Add",
        route:"/admin/bulk-product",
        icon:AiOutlineProduct
      },
      {
        label:"Add Image",
        route:"/admin/bulk-images",
        icon:AiOutlineProduct
      }
    ]
  },
  {
    label:"Website",
    icon:CgWebsite,
    submenu:true,
    sublink:[{
         label:"Home Page",
         route:"/admin/website",
         icon:CgWebsite
    }]
  }, 
  {
    label:"Blogs",
    icon:FaBlog,
    submenu:true,
    sublink:[{
         label:"Blog  Page",
         route:"/admin/blog",
         icon:FaBlog
    }]
  }, 
  {
    label:"Coupon",
    icon:BiSolidDiscount,
    submenu:true,
    sublink:[
      {
        label:"List Coupon",
        route:"/admin/coupon-list",
        icon:BiSolidDiscount
      },
      {
        label:"Add Coupon",
        route:"/admin/coupon",
        icon:BiSolidDiscount
      }
    ]
  }
]
