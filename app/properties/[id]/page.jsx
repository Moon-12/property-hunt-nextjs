import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyInfo from "@/components/PropertyInfo";
import PropertyInfoSideBar from "@/components/PropertyInfoSideBar";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
const PropertyPage = async ({ params }) => {
  const property = await Property.findById(params.id).lean();

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

            <section class="bg-blue-50">
              <div class="container m-auto py-10 px-6">
                <div class="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
                  <PropertyInfo property={property} />
                  <PropertyInfoSideBar />
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default PropertyPage;
