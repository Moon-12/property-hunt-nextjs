"use client";
import { sendMessage } from "@/app/actions/sendMessage";
import { useSession } from "next-auth/react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";
const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [state, formAction] = useActionState(sendMessage, {});
  const { pending } = useFormStatus();
  if (state.isSubmitted) {
    return (
      <p className="text-green-500 mb-4">
        Your message has been sent successfully
      </p>
    );
  }

  return (
    session && (
      <form action={formAction}>
        <div className="mb-4">
          <input
            id="receiver"
            name="receiver"
            type="hidden"
            required
            defaultValue={property.owner}
          />
          <input
            id="property"
            name="property"
            type="hidden"
            required
            defaultValue={property._id}
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
            id="message"
            name="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
            type="submit"
            disabled={pending}
          >
            <FaPaperPlane className="m-2" />
            {pending ? "Sending...." : " Send Message"}
          </button>
        </div>
      </form>
    )
  );
};

export default PropertyContactForm;
