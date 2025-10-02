import authLogo from "../assets/Icons/authLogo.svg";
import sidebarLogo from "../assets/Icons/sidebarLogo.svg";
import notificationIcon from "../assets/Icons/notificationIcon.svg";
import imageUploader from "../assets/Icons/imageUploader.svg";
import newRulesIcon from "../assets/Icons/newRulesIcon.svg";

// Sidebar Icons
import dashboardIcon from "../assets/SidebarIcons/dashboardIcon.svg";
import customersIcon from "../assets/SidebarIcons/customersIcon.svg";
import eventsIcon from "../assets/SidebarIcons/eventsIcon.svg";
import chatIcon from "../assets/SidebarIcons/chatIcon.svg";
import settingIcon from "../assets/SidebarIcons/settingIcon.svg";

export const sidebarItems = [
  { icon: dashboardIcon, label: "Dashboard", path: "/dashboard" },
  { icon: customersIcon, label: "Customers", path: "/customers" },
  { icon: eventsIcon, label: "Events", path: "/events" },
  { icon: eventsIcon, label: "Groups", path: "/groups" },
  { icon: chatIcon, label: "Chats", path: "/chats" },
  { icon: settingIcon, label: "Support", path: "/support" },
];

export const customerFilterOptions = [
  { label: "Simple  User", value: "SimpleUser" },
  { label: "Business User", value: "BusinessUser" },
  { label: "Admin", value: "Admin" },
];

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const cityOptions = [
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "houston", label: "Houston" },
];

export const stateOptions = [
  { value: "ny", label: "New York" },
  { value: "ca", label: "California" },
  { value: "il", label: "Illinois" },
  { value: "tx", label: "Texas" },
];

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const customerDetailProfileData = {
  name: "User Name",
  location: "Location",
  description:
    "This is a profile description that users can add in their 'edit profile' tab. This is a profile description that users can add in their 'edit profile' tab. This is a profile description that users can add in their 'edit profile' tab.",
  interests: [
    "Food",
    "Run Clubs",
    "Dance",
    "Picnics",
    "Picnics",
    "Run Clubs",
    "Dance",
    "Picnics",
    "Food",
    "Food",
    "Food",
    "Dance",
    "Food",
    "Run Clubs",
    "Dance",
    "Picnics",
    "Picnics",
    "Run Clubs",
    "Dance",
    "Picnics",
    "Food",
    "Food",
    "Food",
    "Dance",
  ],
  qa: [
    {
      question: "What makes you, you?",
      answer: "My lovely personality, and lovely eyebrows.",
    },
    {
      question: "Why is your left leg longer than your right?",
      answer:
        "Lol who knows? It may be due to my genetics, or some form of poor stretching in my youth.",
    },
    {
      question: "What makes you, you?",
      answer: "My lovely personality, and lovely eyebrows.",
    },
  ],
};

export const customerImgCardData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "In my 'self-care' era",
    alt: "Person with straw hat on suspension bridge with arms raised",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "In my 'self-care' era",
    alt: "Person with straw hat on suspension bridge with arms raised",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "In my 'self-care' era",
    alt: "Person with straw hat on suspension bridge with arms raised",
  },
];

export const eventsAttendedData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Kiehl's Summer Series",
    subtitle: "Kiehl's",
    location: "TBA",
    date: "Friday 4 March",
    time: "6-10pm",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Kiehl's Summer Series",
    subtitle: "Kiehl's",
    location: "TBA",
    date: "Friday 4 March",
    time: "6-10pm",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Wine Tasting Evening",
    subtitle: "Premium Events",
    location: "Downtown Gallery",
    date: "Saturday 12 March",
    time: "7-11pm",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Kiehl's Summer Series",
    subtitle: "Kiehl's",
    location: "TBA",
    date: "Friday 4 March",
    time: "6-10pm",
  },
];

export const joinedGroupCardData = [
  {
    id: 1,
    title: "Hockey Appreciation Society",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1893&q=80",
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    ],
  },
  {
    id: 2,
    title: "Hockey Appreciation Society",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1893&q=80",
    avatars: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    ],
  },
  {
    id: 3,
    title: "Hockey Appreciation Society",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1893&q=80",
    avatars: [
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    ],
  },
  {
    id: 4,
    title: "Hockey Appreciation Society",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1893&q=80",
    avatars: [
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    ],
  },
];

export const eventDetailTags = [
  "Food",
  "Run Clubs",
  "Dance",
  "Picnics",
  "Food",
  "Dance",
  "Food",
  "Run Clubs",
  "Dance",
  "Picnics",
  "Food",
  "Dance",
  "Food",
  "Run Clubs",
  "Dance",
  "Picnics",
  "Food",
  "Dance",
];

export const eventDetailCoHosts = [
  {
    name: "Host 1",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Host 2",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Host 3",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Host 4",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Host 5",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Host 6",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

export const postsData = [
  {
    user: {
      name: "User",
      avatar:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=1000&q=80",
    },
    group: "Group",
    time: "11 hours ago",
    image:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=1000&q=80",
    likes: 22,
    comments: 12,
    caption:
      "Shoutout to my trusty travel buddy, my camera 📷, for capturing these unforgettable moments.",
    event: {
      text: "Come along to our exclusive summer series, where you can try our fantastic new range!",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80",
      title: "Bike Ride Melbourne",
      location: "[event location]",
      date: "Friday 4 March, 6-10pm",
    },
  },
  {
    user: { name: "Alice", avatar: "/alice.jpg" },
    group: "Travel",
    time: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    likes: 54,
    comments: 18,
    caption: "Beach vibes 🌊☀️ #vacation",
  },
];

export const subscriptionFilterOptions = [
  { label: "Business", value: "business" },
  { label: "Individual", value: "individual" },
  { label: "All", value: "all" },
];

export const chatsData = [
  {
    id: 1,
    name: "Group 1",
    lastMessage: "Haha oh man 😂",
    time: "12m",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    isGroup: true,
    members: [
      {
        name: "Sarah",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "Mike",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
    ],
    messages: [
      {
        id: 1,
        sender: "John",
        message: "Hey everyone!",
        time: "10:30 AM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 2,
        sender: "You",
        message: "Hello!",
        time: "10:32 AM",
        isOwn: true,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 3,
        sender: "Sarah",
        message: "Haha oh man 😂",
        time: "10:35 AM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 2,
    name: "Florencio Dorrance",
    lastMessage: "woohoooo",
    time: "24m",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
    messages: [
      {
        id: 1,
        sender: "Florencio",
        message: "omg, this is amazing",
        time: "2:15 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 2,
        sender: "Florencio",
        message: "perfect! ✅",
        time: "2:16 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 3,
        sender: "Florencio",
        message: "Wow, this is really epic",
        time: "2:18 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 4,
        sender: "You",
        message: "How are you?",
        time: "2:20 PM",
        isOwn: true,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 5,
        sender: "Florencio",
        message: "just checs for next time",
        time: "2:22 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 6,
        sender: "Florencio",
        message: "I'll be there in 2 mins 🕐",
        time: "2:25 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 7,
        sender: "You",
        message: "woohoooo",
        time: "2:28 PM",
        isOwn: true,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 8,
        sender: "You",
        message: "Haha oh man",
        time: "2:30 PM",
        isOwn: true,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 9,
        sender: "You",
        message: "Haha that's terrifying 😂",
        time: "2:32 PM",
        isOwn: true,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 10,
        sender: "Florencio",
        message: "aww",
        time: "2:35 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 11,
        sender: "Florencio",
        message: "omg, this is amazing",
        time: "2:38 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 12,
        sender: "Florencio",
        message: "woohoooo 🔥",
        time: "2:40 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 13,
        sender: "Florencio",
        message: "woohoooo 🔥",
        time: "2:40 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 14,
        sender: "Florencio",
        message: "woohoooo 🔥",
        time: "2:40 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 15,
        sender: "Florencio",
        message: "woohoooo 🔥",
        time: "2:40 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 16,
        sender: "Florencio",
        message: "woohoooo 🔥",
        time: "2:40 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 16,
        sender: "Florencio",
        message: "woohoooo 🔥",
        time: "2:40 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 16,
        sender: "Florencio",
        message: "woohoooo 🔥",
        time: "2:40 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 16,
        sender: "Florencio",
        message: "woohoooo 🔥",
        time: "2:40 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 3,
    name: "Lavern Laboy",
    lastMessage: "Haha that's terrifying 😂",
    time: "1h",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    messages: [
      {
        id: 1,
        sender: "Lavern",
        message: "Hey there!",
        time: "1:00 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: 2,
        sender: "You",
        message: "Haha that's terrifying 😂",
        time: "1:05 PM",
        isOwn: true,
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 4,
    name: "Titus Kitamura",
    lastMessage: "omg, this is amazing",
    time: "5h",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
    messages: [
      {
        id: 1,
        sender: "Titus",
        message: "omg, this is amazing",
        time: "9:00 AM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 5,
    name: "Geoffrey Mott",
    lastMessage: "aww 😍",
    time: "8d",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    messages: [
      {
        id: 1,
        sender: "Geoffrey",
        message: "aww 😍",
        time: "Yesterday",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 6,
    name: "Alfonzo Schuessler",
    lastMessage: "perfect!",
    time: "1m",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    messages: [
      {
        id: 1,
        sender: "Alfonzo",
        message: "perfect!",
        time: "3:45 PM",
        isOwn: false,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
];

export { authLogo, sidebarLogo, notificationIcon, imageUploader, newRulesIcon };
