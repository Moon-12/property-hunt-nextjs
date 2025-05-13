"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getSessionUser";

export async function sendMessage(previousState, formData) {
  await connectDB();
  const userSession = await getUserSession();
  if (!userSession || !userSession.userId) {
    throw new Error("User Id is required");
  }

  const { userId } = userSession;
  const receiver = formData.get("receiver");
  if (userId == receiver) {
    throw new Error("cannot message yourself");
  }

  const msgData = {
    sender: userId,
    receiver,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  const newMessage = new Message(msgData);
  await newMessage.save();
  return { isSubmitted: true };
}
