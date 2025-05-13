import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const fetchAllProperties = async (skip, pageSize) => {
  return await Property.find({}).skip(skip).limit(pageSize);
};
const PropertyPage = async ({ searchParams: { page = 1, pageSize = 9 } }) => {
  await connectDB();
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});

  const showPagination = total > pageSize;
  const properties = await fetchAllProperties(skip, pageSize);
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
        {showPagination && (
          <Pagination page={parseInt(page)} total={total} pageSize={pageSize} />
        )}
      </div>
    </section>
  );
};

export default PropertyPage;
