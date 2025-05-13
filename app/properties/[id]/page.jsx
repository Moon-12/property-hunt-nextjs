import BookmarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import PropertyInfo from "@/components/PropertyInfo";
import ShareButton from "@/components/ShareButton";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }) => {
  const { id } = await params;
  await connectDB();
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializeableObject(propertyDoc);
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
                  <aside className="space-y-4">
                    <BookmarkButton property={property} />
                    <ShareButton property={property} />
                    {/* <!-- Contact Form --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-6">
                        Contact Property Manager{" "}
                      </h3>
                      <PropertyContactForm property={property} />
                    </div>
                  </aside>
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
