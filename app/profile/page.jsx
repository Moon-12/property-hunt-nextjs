import ProfileProperties from "@/components/ProfileProperties";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import { getUserSession } from "@/utils/getSessionUser";
import Image from "next/image";
const ProfilePage = async () => {
  const session = await getUserSession();
  if (!session || !session.user) throw new Error("user id not found");
  const {
    user: { name, image, id, email },
  } = session;

  await connectDB();
  const propertyDocs = await Property.find({ owner: id }).lean();
  let userListedproperties = [];
  if (propertyDocs) {
    userListedproperties = propertyDocs.map(convertToSerializeableObject);
  }
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md  m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={image}
                  alt="User"
                  height="0"
                  width="0"
                  sizes="100vw"
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

              {userListedproperties.length == 0 ? (
                <p>You have no properties listed</p>
              ) : (
                <ProfileProperties userProperties={userListedproperties} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
