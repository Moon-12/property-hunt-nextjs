import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import PropertyInfo from "@/components/PropertyInfo";
import PropertyInfoSideBar from "@/components/PropertyInfoSideBar";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
const PropertyPage = async ({ params }) => {
  const property = await Property.findById(params.id).lean();
  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }
  return (
    <>
      <div>
        <PropertyHeaderImage image={property.images[0]} />
        <section>
          <div className="container m-auto py-6 px-6">
            <Link
              href="/properties"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Properties
            </Link>

            <section className="bg-blue-50">
              <div className="container m-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
                  <PropertyInfo property={property} />
                  <PropertyInfoSideBar />
                </div>
              </div>
            </section>
            <PropertyImages images={property.images} />
          </div>
        </section>
      </div>
    </>
  );
};

export default PropertyPage;
