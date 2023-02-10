import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Form } from "react-bootstrap";
import Loader from "../loader/Loader";

export default function AutoComplete(props) {
  const { handleSetLocation, Loc, value, setValue } = props;

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    handleSetLocation(value);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Form.Group controlId="location" className="pt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="location"
                placeholder="Enter Name"
                {...getInputProps({ placeholder: Loc })}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <div>
              {loading ? <Loader /> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
