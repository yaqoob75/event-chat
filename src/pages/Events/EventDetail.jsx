import { useNavigate } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import {
  ProfileAvatar,
  TagList,
  LocationMap,
  CustomButton,
} from "../../components";
import { eventDetailTags, eventDetailCoHosts } from "../../constants/home";

const EventDetail = () => {
  const navigate = useNavigate();

  useHeader({
    isHeader: true,
    headerText: "Events",
    subHeaderText: "Event Details",
  });

  const maxCoHosts = 3;
  const visibleCoHosts = eventDetailCoHosts.slice(0, maxCoHosts);
  const remainingCount = eventDetailCoHosts.length - maxCoHosts;

  const eventLocation = {
    lat: -37.8136,
    lng: 144.9631,
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Event Details</h2>
      <div className="flex gap-32">
        {/* Left Side */}
        <div className="w-[70%]">
          <p className="text-sm">Kiehl’s</p>
          <h1 className="text-2xl font-semibold">Kiehl’s Summer Series</h1>
          <p className="text-sm">Fri, 4 Mar, 7:00PM - 9:00PM</p>

          <div className="flex items-center border-y py-2 mt-4 border-[#00000026]">
            <div className="flex items-center gap-2 w-[70%]">
              <ProfileAvatar
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="John Doe"
                size="md"
              />
              <h4 className="text-sm font-semibold">
                Ben Jones
                <span className="text-sm font-normal"> posted in </span>
                <span className="text-sm font-semibold">
                  Skincare Team Melbourne
                </span>
              </h4>
            </div>
            {/* Co-hosts */}
            <div className="flex items-center gap-2 w-[30%] border-l-2 border-[#00000026]">
              <h2 className="pl-3 text-base font-semibold">Co-hosts</h2>
              <div className="flex -space-x-2">
                {visibleCoHosts.map((host, index) => (
                  <ProfileAvatar
                    key={index}
                    alt={host.name}
                    src={host.avatar}
                    size="sm"
                    imgBorder="border border-white"
                  />
                ))}
                {/* Extra count */}
                {remainingCount > 0 && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1F1F1F] text-xs font-normal text-white border border-white">
                    {remainingCount}+
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="my-5">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <div className="space-y-1 text-gray-700">
              <p>We will have a great time walking in the park together.</p>
              <p>
                Bring your walking shoes, and your best conversation as we climb
                the mountain of moisturiser.
              </p>
              <p>
                This is a public event, but the admin must accept your wave.
              </p>
            </div>
          </div>
          {/* Tags */}
          <div className="flex gap-32 py-4 border-y border-[#00000026]">
            <h2 className="text-xl font-semibold">Tags</h2>
            <TagList tags={eventDetailTags} />
          </div>
          {/* Map */}
          <div className="mt-4">
            <LocationMap location={eventLocation} />
          </div>
          {/* Posted in */}
          <div className="mt-4">
            <p className="text-xs">Posted in</p>
            <h2 className="text-base font-semibold">Skincare Team Melbourne</h2>
            <p className="text-sm">
              A group of girlies that love skincare and hate pores lol!
            </p>
            <div className="flex -space-x-2 my-4">
              {visibleCoHosts.map((host, index) => (
                <ProfileAvatar
                  key={index}
                  alt={host.name}
                  src={host.avatar}
                  size="sm"
                  imgBorder="border border-white"
                />
              ))}
              {/* Extra count */}
              {remainingCount > 0 && (
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1F1F1F] text-xs font-normal text-white border border-white">
                  {remainingCount}+
                </div>
              )}
            </div>
            <CustomButton
              btnTitle="Go Say Ello!"
              type="button"
              onClick={() => navigate("/chats")}
              fontSize="text-base"
              fontWeight="font-medium"
              fontColor="text-[#8FCFFF]"
              borderRadius="rounded-full"
              backgroundColor="bg-black"
              width="w-fit"
              btnPadding="px-8"
              hoverClass="hover:bg-gray-700"
            />
          </div>
        </div>
        {/* Right Side */}
        <div className="w-[30%]">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="icon"
            className="h-[436px] w-full rounded-xl"
          />
        </div>
      </div>
    </>
  );
};

export default EventDetail;
