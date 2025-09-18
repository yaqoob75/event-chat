import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import useHeader from "../../hooks/useHeader";
import { addEventSchema } from "../../schemas/validations";
import {
  InputField,
  CustomSelect,
  CustomButton,
  NoteField,
  CustomDateTimePicker,
} from "../../components";
import ImageUploader from "../../components/ImageUploader";
import { cityOptions, stateOptions, genderOptions } from "../../constants/home";

const AddEvent = () => {
  const navigate = useNavigate();
  useHeader({
    isHeader: true,
    headerText: "Events",
    subHeaderText: "Add Event",
  });

  const initialValues = {
    eventImage: "",
    eventName: "",
    coHost: "",
    eventType: "",
    startDateTime: "",
    endDateTime: "",
    eventCategory: "",
    paidEvent: "",
    price: "",
    noOfMembers: "",
    genderLimit: "",
    venue: "",
    location: "",
    tags: "",
    description: "",
  };

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Add New Event
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={addEventSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <ImageUploader name="eventImage" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <InputField
                label="Event Name"
                name="eventName"
                placeholder="Enter Event Name"
              />
              <CustomSelect
                label="Co-Host"
                name="coHost"
                placeholder="Select"
                options={stateOptions}
              />
              <CustomSelect
                label="Event Type"
                name="eventType"
                placeholder="Public / Private"
                options={stateOptions}
              />
              <CustomDateTimePicker
                label="Start Date & Time"
                name="startDateTime"
                placeholder="MM-DD-YYYY hh:mm:ss"
              />
              <CustomDateTimePicker
                label="End Date & Time"
                name="endDateTime"
                placeholder="MM-DD-YYYY hh:mm:ss"
              />
              <CustomSelect
                label="Event Category"
                name="eventCategory"
                placeholder="Select"
                options={stateOptions}
              />
              <CustomSelect
                label="Paid Event"
                name="paidEvent"
                placeholder="Select"
                options={stateOptions}
              />
              <InputField
                label="Price"
                name="price"
                type="number"
                placeholder="Enter Price"
              />
              <CustomSelect
                label="No. of Members"
                name="noOfMembers"
                placeholder="Select"
                options={cityOptions}
              />
              <CustomSelect
                label="Gender Limit"
                name="genderLimit"
                placeholder="Select"
                options={stateOptions}
              />
              <InputField
                label="Venue"
                name="venue"
                placeholder="Enter Venue"
              />
              <InputField
                label="Location"
                name="location"
                placeholder="Enter Location"
              />
            </div>
            <CustomSelect
              label="Tags"
              name="tags"
              placeholder="Select"
              options={genderOptions}
              extra="mb-6"
            />
            <NoteField
              label="Description"
              name="description"
              placeholder="Description....."
            />
            <div className="flex w-full items-center justify-end gap-4 pt-6">
              <CustomButton
                btnTitle="Cancel"
                type="button"
                onClick={() => navigate(-1)}
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
                btnTitle="Submit"
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

export default AddEvent;
