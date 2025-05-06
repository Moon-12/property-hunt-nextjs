import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const fetchAllProperties = async () => {
  await connectDB();
  return await Property.find({});
};
const PropertyPage = async () => {
  const properties = await fetchAllProperties();
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <div>No properties to display</div>
          ) : (
            properties.map((property) => (
              <PropertyCard property={property} key={property._id} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyPage;
