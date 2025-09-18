import { useNavigate } from "react-router-dom";
import { newRulesIcon } from "../../constants/home";
import CustomButton from "../CustomButton";

const NoRuleSetup = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-xl font-semibold mb-8 text-left">Create New Rules</h1>
      <div className="flex justify-center">
        <img
          src={newRulesIcon}
          alt="No rules set up"
          className="object-contain"
        />
      </div>
      <p className="text-gray-600 font-medium text-lg text-center my-8">
        No rules set up
      </p>

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
          btnTitle="Get Started"
          type="button"
          onClick={() => navigate("/groups/add-rule")}
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
    </div>
  );
};

export default NoRuleSetup;
