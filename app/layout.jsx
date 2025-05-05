import "@/assets/styles/global.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
