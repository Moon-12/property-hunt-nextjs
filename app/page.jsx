import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <div className="text-2xl">Home page</div>
      <Link href={"/properties"}>Go to property page</Link>
    </>
  );
};

export default HomePage;
