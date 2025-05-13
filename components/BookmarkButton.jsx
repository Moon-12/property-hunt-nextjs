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
    bookmarkProperty(property._id)
      .then((res) => {
        toast.success(res.message);
        setIsBookmarked(res.isBookmarked);
      })
      .catch((err) => {
        toast.error(err.message);
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
    <div className="relative group">
      <button
        data-tooltip-target="tooltip-default"
        className={`${
          isBookmarked
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        }  text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center disabled:bg-blue-300 `}
        onClick={handleBookmark}
        disabled={!session || !session.user}
      >
        <FaBookmark className="m-2" />
        {isBookmarked ? "Remove Bookmark Property" : "Bookmark Property"}
      </button>
      {!session && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-amber-300 text-black text-xs rounded px-2 py-1">
          Please login to Bookmark Property
          {/* <!-- Arrow pointing down --> */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
        </div>
      )}
    </div>
  );
};

export default BookmarkButton;
