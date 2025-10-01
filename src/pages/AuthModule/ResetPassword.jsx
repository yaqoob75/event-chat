import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { resetPasswordSchema } from "../../schemas/validations";
import { IoIosArrowBack } from "react-icons/io";
import { InputField, CustomButton, AuthSuccessModal } from "../../components";
import { useResetPasswordMutation } from "../../api/apiSlice";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const initialValues = { password: "", confirmPassword: "" };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleBackToLogin = () => {
    setIsSuccess(false);
    navigate("/");
  };

  const handleSubmit = async (data) => {
    try {
      const payload = {
        currentPassword: data.password,
        newPassword: data.confirmPassword,
        confirmNewPassword: data.confirmPassword,
      };
      const response = await resetPassword(payload).unwrap();
      if (response) {
        setIsSuccess(true);
        showSuccessToast("Password Updated Successfuly!");
      }
    } catch (error) {
      showErrorToast(
        error?.data?.message || "Something went wrong please try again"
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 bg-[#F1F1F1] rounded-2xl p-4 m-4"></div>

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="md:w-[80%] w-[95%] mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors cursor-pointer"
          >
            <IoIosArrowBack className="mr-1" size={25} />
            <span className="text-base text">Back</span>
          </button>
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-1">Reset Password</h2>
            <p className="text-base text-[#9D9D9D]">Enter your new password</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={resetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••••••"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••••••"
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                />
                <div className="pt-4">
                  <CustomButton
                    btnTitle="Confirm"
                    type="submit"
                    backgroundColor="bg-[#8FCFFF]"
                    fontSize="text-lg"
                    fontWeight="font-medium"
                    fontColor="text-black"
                    borderColor="border-0"
                    borderRadius="rounded-full"
                    hoverClass="hover:bg-[#67abdf]"
                    height="h-12 sm:h-14"
                    disabled={isLoading}
                    loading={isLoading}
                  />
                </div>
              </Form>
            )}
          </Formik>

          {isSuccess && (
            <AuthSuccessModal
              onClose={handleBackToLogin}
              title="Password Successfully"
              subTitle="Updated"
              message="Your password has been updated successfully"
              buttonText="Back to login"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
