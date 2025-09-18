import React from "react";
import { useNavigate } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import { LuGripVertical } from "react-icons/lu";
import { NoRuleSetup, CustomButton } from "../../components";

const RuleCard = ({ number, title, description }) => {
  return (
    <div className="flex items-start gap-3 border border-[#00000033] rounded-lg px-4 py-3 bg-[#F2F2F280] hover:shadow-sm">
      <LuGripVertical className="text-[#8FCFFF] mt-1" size={22} />
      <div>
        <h4 className="text-base font-medium text-[#6B6B6B]">
          {number} {title}
        </h4>
        <p className="text-sm font-normal text-[#6B6B6B]">{description}</p>
      </div>
    </div>
  );
};

const RulesList = () => {
  const navigate = useNavigate();
  useHeader({
    isHeader: true,
    headerText: "Groups",
    subHeaderText: "Add Group",
  });

  const rules = [
    {
      number: 1,
      title: "No hate speech or bullying",
      description:
        "Make sure that everyone feels safe. Bullying of any kind isn’t allowed.",
    },
    {
      number: 2,
      title: "Respect privacy",
      description:
        "Do not share personal information without consent. Respect everyone’s privacy.",
    },
    {
      number: 3,
      title: "Stay on topic",
      description:
        "Keep discussions relevant and avoid unnecessary spam or off-topic posts.",
    },
  ];

  return (
    <div>
      {rules.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-semibold">Create New Rules</h1>
            <CustomButton
              btnTitle="Create"
              type="button"
              onClick={() => navigate("/groups/add-rule")}
              backgroundColor="bg-[#8FCFFF]"
              fontSize="text-base"
              fontWeight="font-normal"
              fontColor="text-black"
              borderColor="border-0"
              borderRadius="rounded-full"
              hoverClass="hover:bg-[#67abdf]"
              btnPadding="px-8"
              height="h-12"
              width="w-fit"
            />
          </div>
          <div className="space-y-4">
            {rules.map((rule) => (
              <RuleCard
                key={rule.number}
                number={rule.number}
                title={rule.title}
                description={rule.description}
              />
            ))}
          </div>
        </>
      ) : (
        <NoRuleSetup />
      )}
    </div>
  );
};

export default RulesList;
