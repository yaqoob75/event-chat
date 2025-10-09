import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import {
  ProfileAvatar,
  TagList,
  LocationMap,
  CustomButton,
  CustomLoader,
  Image,
} from "../../components";
import { getFullName, formatEventDateRange } from "../../constants/home";
import { useGetEventDetailQuery } from "../../api/apiSlice";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const maxCoHosts = 3;

  useHeader({
    isHeader: true,
    headerText: "Events",
    subHeaderText: "Event Details",
  });

  const { data, isLoading, isFetching } = useGetEventDetailQuery({ id });
  const eventData = data?.data?.event;

  console.log("data::", eventData);

  const coHosts = Array.isArray(eventData?.coHOst)
    ? eventData.coHOst.map((item) => ({
        name: item?.firstName || "N/A",
        avatar: item?.profilePicture || null,
      }))
    : [];

  const visibleCoHosts = coHosts.slice(0, maxCoHosts);
  const remainingCount = coHosts.length - maxCoHosts;

  const eventLocation =
    eventData?.location?.coordinates?.length === 2
      ? {
          lat: eventData.location.coordinates[1] ?? "N/A",
          lng: eventData.location.coordinates[0] ?? "N/A",
        }
      : {
          lat: "N/A",
          lng: "N/A",
        };

  return (
    <div className="w-full">
      {isLoading || isFetching ? (
        <CustomLoader />
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-6">Event Details</h2>
          <div className="flex gap-32">
            {/* Left Side */}
            <div className="w-[70%]">
              <p className="text-sm">{eventData?.eventType || "N/A"}</p>
              <h1 className="text-2xl font-semibold capitalize">
                {eventData?.eventName || "N/A"}
              </h1>
              <p className="text-sm">
                {formatEventDateRange(eventData?.startDate, eventData?.endDate)}
              </p>

              <div className="flex items-center border-y py-2 mt-4 border-[#00000026]">
                <div className="flex items-center gap-2 w-[70%]">
                  <ProfileAvatar
                    src={eventData?.userId?.profilePicture}
                    alt="John Doe"
                    size="md"
                  />
                  <h4 className="text-sm font-semibold capitalize">
                    {getFullName(eventData?.userId)}
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
                  {eventData?.description ? eventData?.description : "N/A"}
                </div>
              </div>
              {/* Tags */}
              <div className="flex gap-32 py-4 border-y border-[#00000026]">
                <h2 className="text-xl font-semibold">Tags</h2>
                <TagList tags={eventData?.eventCategory} />
              </div>
              {/* Map */}
              <div className="mt-4">
                <LocationMap location={eventLocation} />
              </div>
              {/* Posted in */}
              <div className="mt-4">
                <p className="text-xs">Posted in</p>
                <h2 className="text-base font-semibold">
                  Skincare Team Melbourne
                </h2>
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
              <Image
                src={eventData?.image}
                alt="icon"
                className="h-[436px] w-full rounded-xl"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetail;
