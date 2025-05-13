"use client";
import { bookmarkProperty } from "@/app/actions/bookmarkProperty";
import { checkBookmarkStatus } from "@/app/actions/checkBookmarkStatus";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleBookmark = () => {
    bookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      toast.success(res.message);
      setIsBookmarked(res.isBookmarked);
    });
  };
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) {
        setIsBookmarked(res.isBookmarked);
      }
      setLoading(false);
    });
  }, [userId, checkBookmarkStatus, property._id]);
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  return (
    <button
      className={`${
        isBookmarked
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      }  text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
      onClick={handleBookmark}
    >
      <FaBookmark className="m-2" />
      {isBookmarked ? "Remove Bookmark Property" : "Bookmark Property"}
    </button>
  );
};

export default BookmarkButton;
