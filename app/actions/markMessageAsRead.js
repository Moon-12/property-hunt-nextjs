"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export async function markMessageAsRead(msgId) {
  await connectDB();
  const userSession = await getUserSession();
  if (!userSession || !userSession.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = userSession;

  const message = await Message.findById(msgId);
  if (!message) {
    throw new Error("Message not found");
  }
  //check message ownership
  if (message.receiver.toString() !== userId) {
    throw new Error("unauthorized");
  }
  message.read = !message.read;
  revalidatePath("/messages", " page");
  await message.save();
  return message.read;
}
