"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export async function deleteProperty(propertyId) {
  await connectDB();

  const session = await getUserSession();

  if (!session || !session.user) throw new Error("User Id not found");

  const { userId } = session;

  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property Not Found");
  //check ownership
  if (property.owner.toString() != userId) {
    throw new Error("You are not authorized to delete the property");
  }
  const publicIds = property.images.map((image) =>
    image.split("/").at(-1).split(".").at(0)
  );
  //delete from cloudinary
  if (publicIds.length != 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertyhunt/" + publicId);
    }
  }

  // delete from db
  await Property.deleteOne({ _id: propertyId });
  revalidatePath("/", "layout");
}
