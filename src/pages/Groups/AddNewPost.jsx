import { useNavigate } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import { Formik, Form } from "formik";
import { addNewPostSchema } from "../../schemas/validations";
import { ImageUploader, NoteField, CustomButton } from "../../components";

const AddNewPost = () => {
  const navigate = useNavigate();
  useHeader({
    isHeader: true,
    headerText: "Groups",
    subHeaderText: "Add Group",
  });

  const initialValues = {
    description: "",
    postImage: "",
  };

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Create New Post
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={addNewPostSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="space-y-8">
              <ImageUploader name="postImage" placeholder="Select Image" />
              <NoteField
                label="Description"
                name="description"
                placeholder="Enter description..."
              />
            </div>
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
                btnTitle="Post"
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

export default AddNewPost;
