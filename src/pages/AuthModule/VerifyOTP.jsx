import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { CustomButton } from "../../components";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { email } = useSelector((state) => state?.auth);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus();
    } else {
      inputRefs.current[5].focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleSubmit = () => {
    if (isOtpComplete) {
      const otpCode = otp.join("");
      console.log("OTP Entered:", otpCode);
      navigate("/reset-password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-[#F1F1F1] rounded-2xl p-4 m-4"></div>

      <div className="flex w-full md:w-1/2 bg-white p-6 sm:p-8 min-h-screen items-center justify-center">
        <div className="md:w-[80%] w-[95%] mx-auto">
          <button
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack className="mr-1" size={25} />
            <span className="text-base">Back</span>
          </button>

          <div className="px-2 sm:px-6">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
              Enter OTP
            </h1>
            <p className="text-sm sm:text-base text-[#9D9D9D] mb-6 leading-relaxed">
              We sent a 6-digit code to your registered email address:
              <br />
              <span className="font-medium text-black">{email}</span>
            </p>

            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-2 lg:gap-2 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="number"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:w-16 xl:h-16 md:w-11 md:h-11 border border-gray-300 rounded-lg text-center text-base sm:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength="1"
                />
              ))}
            </div>

            <CustomButton
              btnTitle="Verify"
              type="submit"
              onClick={handleSubmit}
              backgroundColor="bg-[#8FCFFF]"
              fontSize="text-base sm:text-lg"
              fontWeight="font-medium"
              fontColor="text-black"
              borderColor="border-0"
              borderRadius="rounded-full"
              hoverClass="hover:bg-[#67abdf]"
              height="h-12 sm:h-14"
              disabled={!isOtpComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerifyOTP;
