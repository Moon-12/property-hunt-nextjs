"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getUserSession } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export async function bookmarkProperty(propertyId) {
  const session = await getUserSession();
  if (!session || !session.user) {
    throw new Error("Please login to bookmark the property");
  }
  const { userId } = session;

  await connectDB();

  const bookmarkUser = await User.findById(userId);

  let isBookmarked = bookmarkUser.bookmarks.includes(propertyId);
  let message = "";
  if (isBookmarked) {
    //already bookmarked
    bookmarkUser.bookmarks.pull(propertyId);
    message = "Bookmark removed successfully";
  } else {
    //not bookmarked
    bookmarkUser.bookmarks.push(propertyId);
    message = "Bookmark added successfully";
  }
  await bookmarkUser.save();

  revalidatePath("/properties/saved", "page");
  return { isBookmarked: !isBookmarked, message };
}
