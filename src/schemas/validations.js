import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  name: Yup.string().required("Name is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const supportSchema = Yup.object().shape({
  customerName: Yup.string()
    .required("Customer Name is required")
    .min(2, "Must be at least 2 characters"),
  event: Yup.string().required("Event is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  eventAdmin: Yup.string().required("Event Admin is required"),
  domain: Yup.string().required("Domain is required"),
  country: Yup.string().required("Country is required"),
  details: Yup.string()
    .required("Details are required")
    .min(10, "Details must be at least 10 characters"),
});

export const settingsSchema = Yup.object({
  oldPassword: Yup.string()
    .min(6, "Old password must be at least 6 characters")
    .required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export const profileSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone must contain only digits")
    .min(10, "Phone must be at least 10 digits")
    .required("Phone number is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string()
    .matches(/^[0-9]{5}$/, "Zip Code must be 5 digits")
    .required("Zip Code is required"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),
});

export const addEventSchema = Yup.object().shape({
  eventImage: Yup.mixed().required("Image is required"),
  eventName: Yup.string().required("Event name is required"),
  coHost: Yup.string().required("Co-host is required"),
  eventType: Yup.string().required("Event type is required"),

  startDateTime: Yup.date()
    .required("Start date & time is required")
    .typeError("Invalid date"),
  endDateTime: Yup.date()
    .required("End date & time is required")
    .typeError("Invalid date")
    .min(Yup.ref("startDateTime"), "End date must be after start date"),

  eventCategory: Yup.string().required("Event category is required"),
  paidEvent: Yup.string().required("Please select if event is paid"),
  price: Yup.number()
    .required("Price is required for paid events")
    .min(1, "Price must be at least 1"),
  noOfMembers: Yup.string().required("Number of members is required"),
  genderLimit: Yup.string().required("Gender limit is required"),
  venue: Yup.string().required("Venue is required"),
  location: Yup.string().required("Location is required"),
  tags: Yup.string().required("Please select at least one tag"),
  description: Yup.string().required("Description is required"),
});

export const addGroupSchema = Yup.object().shape({
  groupImage: Yup.mixed().required("Image is required"),
  eventName: Yup.string().required("Event name is required"),
  groupType: Yup.string().required("Group type is required"),
  groupCategory: Yup.string().required("Group category is required"),
  genderLimit: Yup.string().required("Gender limit is required"),
  noOfMembers: Yup.string().required("Number of members is required"),
  ageLimit: Yup.string().required("Age limit is required"),
  description: Yup.string().required("Description is required"),
});

export const addNewPostSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  postImage: Yup.mixed().required("Image is required"),
});

export const addNewPollSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  options: Yup.array().of(
    Yup.string()
      .trim()
      .required("Option cannot be empty")
      .min(1, "Option must contain at least 1 character")
  ),
});

export const addNewRuleSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().required("Description is required"),
});
