import { useState, useEffect, useRef } from "react";
import { Field } from "formik";
import { MapPin, X } from "lucide-react";
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
    requestOptions: {
      // You can add more options here like:
      // types: ['(cities)'],
      // componentRestrictions: { country: 'us' }
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e, setFieldValue) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setFieldValue(name, newValue);
    setValue(newValue);
    setIsOpen(true);
  };

  const handleSelectLocation = async (suggestion, setFieldValue) => {
    try {
      setValue(suggestion.description, false);
      setInputValue(suggestion.description);
      setFieldValue(name, suggestion.description);
      clearSuggestions();
      setIsOpen(false);

      // Get detailed location data
      const results = await getGeocode({ address: suggestion.description });
      const result = results[0];
      const { lat, lng } = getLatLng(result);

      let city = "";
      let state = "";
      let country = "";
      let postalCode = getZipCode(result, true)?.toString() || "";

      result.address_components.forEach((component) => {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.long_name;
        }
        if (component.types.includes("country")) {
          country = component.long_name;
        }
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

      if (onLocationSelect) {
        onLocationSelect(locationData);
      }
    } catch (error) {
      console.error("Error selecting location:", error);
      // Still set the basic value even if geocoding fails
      if (onLocationSelect) {
        onLocationSelect({
          description: suggestion.description,
          formattedAddress: suggestion.description,
        });
      }
    }
  };

  const handleClear = (setFieldValue) => {
    setInputValue("");
    setFieldValue(name, "");
    setValue("");
    clearSuggestions();
    setIsOpen(false);

    if (onLocationSelect) {
      onLocationSelect(null);
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    if (inputValue && inputValue.length >= 2) {
      setValue(inputValue);
    }
  };

  return (
    <div className="w-full">
      <Field name={name}>
        {({ field, meta, form }) => (
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
                  <MapPin size={18} />
                </div>
                <input
                  {...props}
                  type="text"
                  value={inputValue || field.value || ""}
                  onChange={(e) => handleInputChange(e, form.setFieldValue)}
                  onFocus={handleFocus}
                  placeholder={placeholder}
                  disabled={!ready}
                  className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base pl-7 pr-10 disabled:opacity-50"
                  autoComplete="off"
                />
                {inputValue && (
                  <button
                    type="button"
                    onClick={() => handleClear(form.setFieldValue)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Google Places Suggestions Dropdown */}
            {isOpen && status === "OK" && data && data.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                <ul>
                  {data.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      onClick={() =>
                        handleSelectLocation(suggestion, form.setFieldValue)
                      }
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <MapPin
                          size={16}
                          className="text-gray-400 mt-1 flex-shrink-0"
                        />
                        <div>
                          <div className="text-gray-900 font-medium text-sm">
                            {suggestion.structured_formatting.main_text}
                          </div>
                          {suggestion.structured_formatting.secondary_text && (
                            <div className="text-gray-500 text-xs">
                              {suggestion.structured_formatting.secondary_text}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* No results message */}
            {isOpen && status === "ZERO_RESULTS" && inputValue.length >= 2 && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="px-4 py-3 text-gray-500 text-sm">
                  No locations found. Try a different search.
                </div>
              </div>
            )}

            {/* Loading state */}
            {!ready && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="px-4 py-3 text-gray-500 text-sm">
                  Loading Google Maps...
                </div>
              </div>
            )}

            {meta.touched && meta.error && (
              <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default LocationSelectField;
