import { useNavigate } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import { Formik, Form } from "formik";
import { addNewRuleSchema } from "../../schemas/validations";
import { InputField, NoteField, CustomButton } from "../../components";

const AddNewRules = () => {
  const navigate = useNavigate();
  useHeader({
    isHeader: true,
    headerText: "Groups",
    subHeaderText: "Add Group",
  });

  const initialValues = {
    title: "",
    description:"",
  };

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addNewRuleSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <h1 className="text-xl font-semibold mb-8 text-left">
            Create New Rules
          </h1>
          <div className="my-6 space-y-5">
            <InputField label="Title" name="title" placeholder="Enter Title" />
             <NoteField
              label="Description"
              name="description"
              placeholder="Description....."
            />
          </div>
          <div className="flex w-full items-center justify-end gap-4 pt-6">
            <CustomButton
              btnTitle="Cancel"
              type="button"
              onClick={() => navigate(-1)}
              backgroundColor="bg-[#EDEDED]"
              fontSize="text-base"
              fontWeight="font-normal"
              fontColor="text-black"
              borderColor="border-0"
              borderRadius="rounded-full"
              hoverClass="hover:bg-gray-300"
              btnPadding="px-12"
              height="h-14"
              width="w-fit"
            />
            <CustomButton
              btnTitle="Create"
              type="submit"
              backgroundColor="bg-[#8FCFFF]"
              fontSize="text-base"
              fontWeight="font-normal"
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
  );
};

export default AddNewRules;
