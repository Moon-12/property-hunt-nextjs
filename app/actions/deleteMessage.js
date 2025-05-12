"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export async function deleteMessage(messageId) {
  await connectDB();

  const session = await getUserSession();

  if (!session || !session.user) throw new Error("User Id not found");

  const { userId } = session;

  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message Not Found");
  //check ownership
  if (message.receiver.toString() != userId) {
    throw new Error("Unauthorized");
  }

  revalidatePath("/messages", "page");
  await message.deleteOne();
}
