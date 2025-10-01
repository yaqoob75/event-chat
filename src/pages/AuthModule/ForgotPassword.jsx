import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { IoIosArrowBack } from "react-icons/io";
import { forgotPasswordSchema } from "../../schemas/validations";
import { InputField, CustomButton } from "../../components";
import { useForgotPasswordMutation } from "../../api/apiSlice";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { setEmail } from "../../store/auth/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch =  useDispatch();
  const initialValues = { email: "" };
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const handleSubmit = async (data) => {
    try {
      const response = await forgotPassword(data).unwrap();
      if (response) {
        showSuccessToast("Verification code sent successfully!");
        navigate("/verify-otp");
        dispatch(setEmail(data.email));
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
            className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack className="mr-1" size={25} />
            <span className="text-base text">Back</span>
          </button>
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-1">Forgot Password</h2>
            <p className="text-base text-[#9D9D9D]">
              Enter your registered email address. We'll send you a code to
              reset your password.
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
                <InputField
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="john@example.com"
                />
                <div className="pt-4">
                  <CustomButton
                    btnTitle="Send OTP"
                    type="submit"
                    backgroundColor="bg-[#8FCFFF]"
                    fontSize="text-lg"
                    fontWeight="font-medium"
                    fontColor="text-black"
                    borderColor="border-0"
                    borderRadius="rounded-full"
                    hoverClass="hover:bg-[#67abdf]"
                    height="h-14"
                    loading={isLoading}
                    disabled={isLoading}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
