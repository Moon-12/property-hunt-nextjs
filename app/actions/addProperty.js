"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProperty(formData) {
  await connectDB();
  const userSession = await getUserSession();
  if (!userSession || !userSession.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = userSession;
  const amenities = formData.getAll("amenities");
  let images = formData.getAll("images").filter((image) => image.name !== "");

  images = images.map((image) => image.name);
  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
      nightly: formData.get("rates.nightly."),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    images,
  };
  console.log(propertyData);
  const newProperty = new Property(propertyData);
  await newProperty.save();
  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}
