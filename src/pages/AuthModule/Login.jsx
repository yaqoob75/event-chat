import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { loginSchema } from "../../schemas/validations";
import { InputField, CustomCheckBox, CustomButton } from "../../components";
import { authLogo } from "../../constants/home";
import { useLoginMutation } from "../../api/apiSlice";
import { useDispatch } from "react-redux";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { updateUser } from "../../store/auth/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = { email: "", password: "", rememberMe: false };
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(updateUser(response));
      showSuccessToast("Login Successfully!");
      navigate("/dashboard");
    } catch (error) {
      showErrorToast(error?.data?.message || "Login failed, please try again");
    }
  };
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 bg-[#F1F1F1] rounded-2xl p-4 m-4"></div>
      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="md:w-[80%] w-[95%] mx-auto">
          <div className="mb-8">
            <img
              src={authLogo}
              alt="ello"
              className="w-[160px] h-[75px] mb-8"
            />
            <h2 className="text-3xl font-semibold mb-1">Welcome</h2>
            <p className="text-base font-normal text-[#9D9D9D]">
              Please login here
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-5">
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••••••"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <div className="flex items-center justify-between">
                  <CustomCheckBox
                    name="rememberMe"
                    title="Remember me"
                    size="h-6 w-6"
                  />
                  <Link
                    to="/forgot-password"
                    className="text-base font-normal hover:text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="pt-4">
                  <CustomButton
                    btnTitle="Login"
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

export default LoginPage;
