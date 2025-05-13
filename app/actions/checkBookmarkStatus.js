"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getUserSession } from "@/utils/getSessionUser";

export async function checkBookmarkStatus(propertyId) {
  const session = await getUserSession();
  if (!session || !session.user) {
    throw new Error("user login is required");
  }
  const { userId } = session;

  await connectDB();

  const bookmarkUser = await User.findById(userId);

  let isBookmarked = bookmarkUser.bookmarks.includes(propertyId);
  return { isBookmarked };
}
