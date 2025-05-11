"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteProperty } from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";
const ProfileProperties = ({ userProperties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const deletePropertyHandler = async (propertyId) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;
    await deleteProperty(propertyId);
    toast.success("Property Deleted");
    const filteredProperties = properties.filter(
      (property) => property._id !== propertyId
    );
    setProperties(filteredProperties);
  };

  return (
    <>
      {properties &&
        properties.map((property) => {
          return (
            <div className="mb-10" key={property._id}>
              <Link href={`/properties/${property._id}`}>
                <Image
                  className="h-32 w-full rounded-md object-cover"
                  src={property.images[0]}
                  alt="property"
                  height="0"
                  width="0"
                  sizes="100vw"
                  priority={true}
                />
              </Link>

              <div className="mt-2">
                <p className="text-lg font-semibold">{property.name}</p>
                <p className="text-gray-600">
                  {" "}
                  Address: {property.location.street} {property.location.city}{" "}
                  {property.location.state}
                </p>
              </div>
              <div className="mt-2">
                <Link
                  href="/add-property"
                  className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                  type="button"
                  onClick={() => deletePropertyHandler(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProfileProperties;
