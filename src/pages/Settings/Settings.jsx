import { useState } from "react";
import useHeader from "../../hooks/useHeader";
import { Formik, Form } from "formik";
import { settingsSchema } from "../../schemas/validations";
import { InputField, CustomButton } from "../../components";
import { useUpdatePasswordMutation } from "../../api/apiSlice";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const Settings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  useHeader({
    isHeader: true,
    headerText: "Settings",
    subHeaderText: "",
  });

  const handleSubmit = async (data) => {
    try {
      const payload = {
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      };
      const response = await updatePassword(payload).unwrap();
      if (response) {
        showSuccessToast("Password Updated Successfuly!");
      }
    } catch (error) {
      showErrorToast(
        error?.data?.message || "Something went wrong please try again"
      );
    }
  };

  return (
    <div className="lg:w-[50%] bg-[#FFFFFF]">
      <h2 className="text-lg font-semibold mb-6">Update Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={settingsSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-5">
            <InputField
              label="Old Password"
              name="oldPassword"
              type="password"
              placeholder="••••••••••••"
              showPassword={showOldPassword}
              setShowPassword={setShowOldPassword}
            />
            <InputField
              label="New Password"
              name="newPassword"
              type="password"
              placeholder="••••••••••••"
              showPassword={showNewPassword}
              setShowPassword={setShowNewPassword}
            />
            <InputField
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              placeholder="••••••••••••"
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />
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
                loading={isLoading}
                disabled={isLoading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Settings;
