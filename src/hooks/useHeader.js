import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const useHeader = (config) => {
  const { updateHeaderConfig } = useOutletContext();

  useEffect(() => {
    updateHeaderConfig(config);

    return () => {
      updateHeaderConfig({
        isHeader: true,
        headerText: "Dashboard",
        subHeaderText: "",
      });
    };
  }, [
    updateHeaderConfig,
    config.isHeader,
    config.headerText,
    config.subHeaderText,
  ]);
};

export default useHeader;
