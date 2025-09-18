import React from "react";
import { useNavigate } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import { Formik, Form, FieldArray } from "formik";
import { InputField, CustomButton } from "../../components";
import PollOptionItem from "../../components/PollOptionItem";
import { addNewPollSchema } from "../../schemas/validations";

const AddNewPoll = () => {
  const navigate = useNavigate();
  useHeader({
    isHeader: true,
    headerText: "Groups",
    subHeaderText: "Add Group",
  });

  const initialValues = {
    title: "",
    options: [""],
  };

  const handleSubmit = (values) => {
    const filteredOptions = values.options.filter(
      (option) => option.trim() !== ""
    );
    const pollData = {
      ...values,
      options: filteredOptions,
    };
    console.log("Form submitted:", pollData);
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Add your Card
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={addNewPollSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="space-y-8">
              <InputField
                label="Title"
                name="title"
                type="text"
                placeholder="Enter Title"
              />

              <div className="space-y-4 rounded-lg border border-[#EEEEEE] p-4">
                <FieldArray name="options">
                  {({ push, remove }) => (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          Add poll
                        </h3>
                        <CustomButton
                          btnTitle="Add option"
                          type="button"
                          onClick={() => push("")}
                          backgroundColor={`${
                            values.options.some((opt) => !opt.trim())
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-[#8FCFFF]"
                          }`}
                          fontSize="text-base"
                          fontWeight="font-normal"
                          fontColor="text-black"
                          borderColor="border-0"
                          borderRadius="rounded-full"
                          hoverClass={`${
                            values.options.some((opt) => !opt.trim())
                              ? ""
                              : "hover:bg-[#67abdf]"
                          }`}
                          btnPadding="px-5"
                          height="h-12"
                          width="w-fit"
                          disabled={values.options.some((opt) => !opt.trim())}
                        />
                      </div>

                      <div className="space-y-3">
                        {values.options.map((_, index) => (
                          <PollOptionItem
                            key={index}
                            index={index}
                            onRemove={remove}
                            canRemove={values.options.length > 1}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>
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

export default AddNewPoll;
