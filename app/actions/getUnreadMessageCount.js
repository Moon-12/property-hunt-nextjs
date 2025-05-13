"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getSessionUser";

export async function getUnreadMessageCount() {
  await connectDB();

  const session = await getUserSession();

  if (!session || !session.user) throw new Error("User Id not found");

  const { userId } = session;
  const count = await Message.countDocuments({ receiver: userId, read: false });
  return { count };
}
