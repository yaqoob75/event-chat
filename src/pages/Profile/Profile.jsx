import { useState, useRef } from "react";
import { Formik, Form } from "formik";
import { profileSchema } from "../../schemas/validations";
import {
  InputField,
  CustomSelect,
  CustomButton,
  CustomDatePicker,
} from "../../components";
import { cityOptions, stateOptions, genderOptions } from "../../constants/home";

const Profile = () => {
  const fileInputRef = useRef(null);
  const [currentProfileImage, setCurrentProfileImage] = useState(
    "/professional-headshot-of-john-doe.png"
  );

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  };

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  const handleUpdateImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentProfileImage(imageUrl);
      console.log("Image updated successfully");
    }
  };

  const handleSaveImage = () => {
    console.log("Image saved successfully");
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Personal Information
      </h1>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            <img
              src={currentProfileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">John Doe</h2>
            <p className="text-sm text-gray-500">john.doe@gmail.com</p>
            <p className="text-xs text-gray-400">18:27 PM (last month)</p>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        <div className="flex gap-3">
          <CustomButton
            btnTitle="Edit Image"
            backgroundColor="bg-gray-100"
            fontColor="text-gray-700"
            borderColor="border-gray-300"
            borderWidth="border"
            width="w-auto"
            height="h-9"
            textSize="text-sm"
            fontWeight="font-medium"
            onClick={handleUpdateImage}
            btnPadding="px-4"
          />
          <CustomButton
            btnTitle="Save Image"
            backgroundColor="bg-blue-600"
            fontColor="text-white"
            width="w-auto"
            height="h-9"
            textSize="text-sm"
            fontWeight="font-medium"
            onClick={handleSaveImage}
            btnPadding="px-4"
            hoverClass="hover:bg-blue-700"
          />
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={profileSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <InputField
                label="Full Name"
                name="fullName"
                placeholder="Enter Name"
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter Email"
              />

              <InputField
                label="Phone"
                name="phone"
                placeholder="Enter Number"
              />

              <CustomSelect
                label="City"
                name="city"
                placeholder="Select"
                options={cityOptions}
              />

              <CustomSelect
                label="State"
                name="state"
                placeholder="Select"
                options={stateOptions}
              />

              <InputField
                label="Zip Code"
                name="zipCode"
                placeholder="Enter Code"
              />

              <CustomDatePicker
                label="Date of Birth"
                name="dateOfBirth"
                placeholder="YYYY-MM-DD"
              />

              <CustomSelect
                label="Gender"
                name="gender"
                placeholder="Select"
                options={genderOptions}
              />

              <InputField
                label="Address"
                name="address"
                placeholder="Enter Address"
              />
            </div>

            <div className="flex w-full items-center justify-end gap-4 pt-2">
              <CustomButton
                btnTitle="Cancel"
                type="button"
                backgroundColor="bg-[#EDEDED]"
                fontSize="text-lg"
                fontWeight="font-medium"
                fontColor="text-black"
                borderColor="border-0"
                borderRadius="rounded-full"
                hoverClass="hover:bg-gray-300"
                btnPadding="px-12"
                height="h-14"
                width="w-fit"
              />
              <CustomButton
                btnTitle="Save"
                type="submit"
                backgroundColor="bg-[#8FCFFF]"
                fontSize="text-lg"
                fontWeight="font-medium"
                fontColor="text-black"
                borderColor="border-0"
                borderRadius="rounded-full"
                hoverClass="hover:bg-[#67abdf]"
                btnPadding="px-12"
                height="h-14"
                width="w-fit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
