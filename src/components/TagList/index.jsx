const TagList = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={` px-3 py-1 text-sm rounded-full border bg-gray-100 border-gray-200 text-gray-700`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
