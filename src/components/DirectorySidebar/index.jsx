import { FiX, FiDownload, FiFile, FiImage } from "react-icons/fi";

const DirectorySidebar = ({ onClose }) => {
  const files = [
    {
      id: 1,
      name: "IQ.pdf",
      type: "PDF",
      size: "8mb",
      icon: FiFile,
      color: "text-red-500 bg-red-50",
    },
    {
      id: 2,
      name: "Screenshot-3817.png",
      type: "PNG",
      size: "4mb",
      icon: FiImage,
      color: "text-green-500 bg-green-50",
    },
    {
      id: 3,
      name: "sharefile.docx",
      type: "DOC",
      size: "558kb",
      icon: FiFile,
      color: "text-blue-500 bg-blue-50",
    },
    {
      id: 4,
      name: "Jerry-2020_1-9_Form.xml",
      type: "XML",
      size: "242kb",
      icon: FiFile,
      color: "text-purple-500 bg-purple-50",
    },
    {
      id: 5,
      name: "IQ.pdf",
      type: "PDF",
      size: "8mb",
      icon: FiFile,
      color: "text-red-500 bg-red-50",
    },
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="h-20 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Directory</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Files Header */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">Files</span>
          <span className="bg-[#EDF2F7] text-gray-600 text-xs px-2 py-1 rounded-full">
            125
          </span>
        </div>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto">
        {files.map((file) => {
          const IconComponent = file.icon;
          return (
            <div
              key={file.id}
              className="p-4 hover:bg-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${file.color} flex items-center justify-center`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate max-w-32">
                      {file.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {file.type} • {file.size}
                    </p>
                  </div>
                </div>

                <button className="p-1 rounded-lg border-2 border-[#0066CB]">
                  <FiDownload className="w-4 h-4 hover:text-gray-600 transition-colors" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DirectorySidebar;
