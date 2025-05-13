"use client";
import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Map, { Marker } from "react-map-gl/mapbox";
import pin from "@/assets/images/pin.svg";
import Image from "next/image";
import Spinner from "./Spinner";
const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [geocodeError, setGeocodeError] = useState(null);
  const [loading, setLoading] = useState(true);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "us", // Default region for responses.
  });

  useEffect(() => {
    fromAddress(
      `${property.location.street}${property.location.city}${property.location.state}${property.location.zipcode}`
    )
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        setLat(lat);
        setLng(lng);
      })
      .catch((err) => {
        setGeocodeError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    <div>
      {" "}
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 14,
        }}
        style={{ width: "100%", height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    </div>
  );
};

export default PropertyMap;
