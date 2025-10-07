import TagList from "../TagList";
import CustomerQA from "../CustomerQA";
import ProfileAvatar from "../ProfileAvatar";
import { getFullName } from "../../constants/home";

const CustomerProfileSection = ({ user }) => {
  return (
    <div className="px-6">
      {/* ===== Profile Header ===== */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-200">
        <div className="flex items-center gap-4 w-[30%]">
          <ProfileAvatar
            src={user?.profilePicture}
            alt={user?.firstName}
            size="xl"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-1 capitalize">
              {getFullName(user)}
            </h2>
            <p className="text-gray-500 text-sm mb-3 capitalize">
              {user?.address || "N/A"}
            </p>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed w-[70%]">
          {user?.bio}
        </p>
      </div>

      {/* ===== Interests ===== */}
      <div className="py-2">
        <div className="flex items-center mb-6">
          <h3 className="text-xl font-semibold mb-3 w-[30%]">Interests</h3>
          <div className="w-[70%]">
            {user?.interests?.length > 0 ? (
              <TagList tags={user.interests} />
            ) : (
              <p className="text-gray-500 text-sm text-center">
                No data available
              </p>
            )}
          </div>
        </div>

        {user?.profileAnswer?.length > 0 ? (
          user.profileAnswer.map((item, index) => (
            <CustomerQA
              key={item._id || index}
              question={item.question}
              answer={item.answer}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center mb-6">
            No data available
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerProfileSection;
