import { useState } from "react";

const sizeClasses = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base",
  xl: "h-12 w-12 text-lg",
};

const UserAvatar = ({ user, showName = true, size = "md" }) => {
  const [imgError, setImgError] = useState(false);

  const avatarSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="flex items-center">
      <div className={`flex-shrink-0 ${avatarSize}`}>
        {user.avatar && !imgError ? (
          <img
            className={`rounded-full object-cover ${avatarSize}`}
            src={user.avatar}
            alt="icon"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`bg-gray-600 rounded-full flex items-center justify-center ${avatarSize}`}
          >
            <span className="text-white font-medium">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {showName && (
        <div className="ml-3">
          <div className="text-sm font-normal">{user.name}</div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
