import { BsHeart, BsChat } from "react-icons/bs";
import UserAvatar from "../UserAvatar";

const PostCard = ({ post }) => {
  return (
    <div className="w-full">
      {/* User Info */}
      <div className="flex items-center gap-2">
        <UserAvatar user={post.user} showName={false} size="lg" />
        <div>
          <h4 className="text-lg font-semibold -mb-1">{post.user.name}</h4>
          <p className="text-sm text-gray-500">
            {post.group} • {post.time}
          </p>
        </div>
      </div>

      {/* Main Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full h-[400px] object-fill mt-3"
        />
      )}

      {/* Likes & Comments */}
      <div className="flex items-center px-6 gap-4 mt-3">
        <div className="flex items-center gap-1">
          <BsHeart />
          <p>{post.likes}</p>
        </div>
        <div className="flex items-center gap-1">
          <BsChat />
          <p>{post.comments}</p>
        </div>
      </div>

      {/* Caption */}
      {post.caption && <p className="text-sm px-6 pb-9">{post.caption}</p>}

      {/* Optional Inner Event Card */}
      {post.event && (
        <div className="border-y border-gray-300 py-4">
          <div className="flex items-center gap-2">
            <UserAvatar user={post.user} showName={false} size="lg" />
            <div>
              <h4 className="text-lg font-semibold -mb-1">{post.user.name}</h4>
              <p className="text-sm text-gray-500">
                {post.group} • {post.time}
              </p>
            </div>
          </div>
          <p className="text-sm ml-2">{post.event.text}</p>

          <div className="rounded-xl p-2 border border-[#D7DCE2] mt-4">
            <div className="flex items-center gap-8">
              <img
                src={post.event.image}
                alt="event"
                className="w-44 h-32 rounded-xl object-fill"
              />
              <div>
                <UserAvatar user={post.user} size="lg" />
                <p className="text-base ml-2">{post.event.title}</p>
                <p className="text-sm ml-2">
                  <span>{post.event.location}</span>
                  <span> • </span>
                  <span>{post.event.date}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
