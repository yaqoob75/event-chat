import React from "react";
import { useNavigate } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import { Formik, Form } from "formik";
import { supportSchema } from "../../schemas/validations";
import {
  InputField,
  CustomSelect,
  NoteField,
  CustomButton,
} from "../../components";

const SupportTicketDetail = () => {
  const navigate = useNavigate();
  const initialValues = {
    customerName: "",
    event: "",
    price: "",
    eventAdmin: "",
    domain: "",
    actionRequires: "",
    country: "",
    details: "",
  };

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
  ];

  useHeader({
    isHeader: true,
    headerText: "Support",
    subHeaderText: "Ticket Details",
  });

  const handleSubmit = (data) => {
    console.log("Data:", data);
  };

  return (
    <div className="bg-[#FFFFFF]">
      <h2 className="text-lg font-semibold mb-6">Ticket Details</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={supportSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                label="Customer Name"
                name="customerName"
                type="text"
                placeholder="Enter Customer Name"
              />
              <InputField
                label="Event"
                name="event"
                type="text"
                placeholder="Enter Event"
              />
              <InputField
                label="Price"
                name="price"
                type="number"
                placeholder="Enter Price"
              />
              <InputField
                label="Event Admin"
                name="eventAdmin"
                type="text"
                placeholder="Enter Event Admin"
              />
              <InputField
                label="Domain"
                name="domain"
                type="text"
                placeholder="Enter Domain"
              />
              <CustomSelect
                label="Country Required"
                name="country"
                placeholder="Select"
                options={countryOptions}
              />
            </div>

            <NoteField
              label="Details"
              name="details"
              placeholder="Enter Detail"
              rows={4}
            />

            <div className="flex items-center justify-end gap-4 pt-2">
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
                width="w-full sm:w-fit"
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
                width="w-full sm:w-fit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SupportTicketDetail;
