import MessageCard from "@/components/MessageCard";
import Message from "@/models/Message";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import { getUserSession } from "@/utils/getSessionUser";

const MessagesPage = async () => {
  const session = await getUserSession();
  const { userId } = session;
  const readMessage = await Message.find({ receiver: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "userName")
    .populate("property", "name")
    .lean();

  const unreadMessage = await Message.find({ receiver: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "userName")
    .populate("property", "name")
    .lean();

  const messages = [...unreadMessage, ...readMessage].map((msgDoc) => {
    const msg = convertToSerializeableObject(msgDoc);
    msg.sender = convertToSerializeableObject(msg.sender);
    msg.property = convertToSerializeableObject(msg.property);
    return msg;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
