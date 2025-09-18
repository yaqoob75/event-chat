import { useNavigate } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import { Formik, Form } from "formik";
import { addGroupSchema } from "../../schemas/validations";
import {
  InputField,
  CustomSelect,
  CustomButton,
  NoteField,
  ImageUploader,
} from "../../components";
import { cityOptions, stateOptions } from "../../constants/home";

const AddGroup = () => {
  const navigate = useNavigate();
  useHeader({
    isHeader: true,
    headerText: "Groups",
    subHeaderText: "Add Group",
  });

  const initialValues = {
    groupImage: "",
    eventName: "",
    groupType: "",
    groupCategory: "",
    genderLimit: "",
    noOfMembers: "",
    ageLimit: "",
    description: "",
  };

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Create New Group
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={addGroupSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <ImageUploader name="groupImage" placeholder="Select Image" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <InputField
                label="Event Name"
                name="eventName"
                placeholder="Enter Event Name"
              />
              <CustomSelect
                label="Group Type"
                name="groupType"
                placeholder="Public / Private"
                options={stateOptions}
              />
              <CustomSelect
                label="Group Category"
                name="groupCategory"
                placeholder="Select"
                options={stateOptions}
              />
              <CustomSelect
                label="Gender Limit"
                name="genderLimit"
                placeholder="Select"
                options={stateOptions}
              />
              <CustomSelect
                label="No. of Members"
                name="noOfMembers"
                placeholder="Select"
                options={cityOptions}
              />
              <CustomSelect
                label="Age Limit"
                name="ageLimit"
                placeholder="Select"
                options={cityOptions}
              />
            </div>
            <NoteField
              label="Description"
              name="description"
              placeholder="Description....."
            />
            <button
              type="button"
              onClick={() => navigate("/groups/rules")}
              className="mt-3 mx-4 underline hover:text-blue-500 cursor-pointer"
            >
              Set New Rules
            </button>
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

export default AddGroup;
