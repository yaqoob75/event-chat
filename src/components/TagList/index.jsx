const TagList = ({ tags }) => {
  const validTags = Array.isArray(tags) ? tags : [];
  return (
    <div className="flex flex-wrap gap-2">
      {validTags.length > 0 ? (
        validTags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm rounded-full border bg-gray-100 border-gray-200 text-gray-700"
          >
            {tag}
          </span>
        ))
      ) : (
        <span className="text-gray-500 text-sm capitalize">No tags available</span>
      )}
    </div>
  );
};

export default TagList;
