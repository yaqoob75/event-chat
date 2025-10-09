import { useState, useEffect, useRef } from "react";
import { Field } from "formik";
import { SlLocationPin } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete";

const LocationSelectField = ({
  label,
  name,
  placeholder = "Enter location...",
  onLocationSelect,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ only updates input (not formik)
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setValue(newValue);
    if (newValue.trim().length > 0) setIsOpen(true);
    else setIsOpen(false);
  };

  // ✅ sets full object in Formik on select
  const handleSelectLocation = async (suggestion, setFieldValue) => {
    try {
      setValue(suggestion.description, false);
      clearSuggestions();
      setIsOpen(false);

      const results = await getGeocode({ address: suggestion.description });
      const result = results[0];
      const { lat, lng } = getLatLng(result);
      const postalCode = getZipCode(result, true)?.toString() || "";

      let city = "";
      let state = "";
      let country = "";

      result.address_components.forEach((component) => {
        if (component.types.includes("locality")) city = component.long_name;
        if (component.types.includes("administrative_area_level_1"))
          state = component.long_name;
        if (component.types.includes("country")) country = component.long_name;
      });

      const locationData = {
        description: suggestion.description,
        formattedAddress: result.formatted_address,
        coordinates: { lat, lng },
        city,
        state,
        country,
        postalCode,
      };

      // ✅ only now set Formik value
      setFieldValue(name, locationData);
      setInputValue(locationData.description);

      if (onLocationSelect) onLocationSelect(locationData);
    } catch (error) {
      console.error("Error selecting location:", error);
      const fallback = {
        description: suggestion.description,
        formattedAddress: suggestion.description,
      };
      setFieldValue(name, fallback);
      setInputValue(suggestion.description);
    }
  };

  const handleClear = (setFieldValue) => {
    setInputValue("");
    setValue("");
    clearSuggestions();
    setIsOpen(false);
    setFieldValue(name, null);
    if (onLocationSelect) onLocationSelect(null);
  };

  const hasValidSuggestions = status === "OK" && data?.length > 0;

  return (
    <div className="w-full">
      <Field name={name}>
        {({ field, meta, form }) => {
          // ✅ display logic: prefer description if object, otherwise typed text
          const displayValue =
            typeof field.value === "object" && field.value !== null
              ? field.value.description
              : inputValue;

          return (
            <div className="relative" ref={wrapperRef}>
              <div
                className={`bg-gray-100 rounded-xl px-4 py-4 relative ${
                  meta.error && meta.touched ? "border border-red-500" : ""
                }`}
              >
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {label}
                </label>

                <div className="relative">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <SlLocationPin size={18} />
                  </div>

                  <input
                    {...props}
                    type="text"
                    value={displayValue || ""}
                    onChange={handleInputChange}
                    onFocus={() => displayValue && setIsOpen(true)}
                    placeholder={placeholder}
                    disabled={!ready}
                    className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base pl-7 pr-10 disabled:opacity-50"
                    autoComplete="off"
                  />

                  {displayValue && (
                    <button
                      type="button"
                      onClick={() => handleClear(form.setFieldValue)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      <RxCross2 size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Suggestions dropdown */}
              {isOpen && inputValue.trim().length > 0 && hasValidSuggestions && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                  <ul>
                    {data.map((suggestion) => {
                      const mainText =
                        suggestion.structured_formatting?.main_text || "";
                      const secondaryText =
                        suggestion.structured_formatting?.secondary_text || "";
                      return (
                        <li
                          key={suggestion.place_id}
                          onClick={() =>
                            handleSelectLocation(
                              suggestion,
                              form.setFieldValue
                            )
                          }
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <SlLocationPin
                              size={16}
                              className="text-gray-400 mt-1 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="text-gray-900 font-medium text-sm">
                                {mainText}
                              </div>
                              {secondaryText && (
                                <div className="text-gray-500 text-xs mt-0.5">
                                  {secondaryText}
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {meta.touched && meta.error && (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
              )}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default LocationSelectField;
