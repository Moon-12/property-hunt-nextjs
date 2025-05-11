import "@/assets/styles/global.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import { ToastContainer } from "react-toastify";
const RootLayout = ({ children }) => {
  return (
    <html>
      <AuthSessionProvider>
        <body>
          <NavBar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </AuthSessionProvider>
    </html>
  );
};

export default RootLayout;
