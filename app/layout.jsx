import "@/assets/styles/global.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import { ToastContainer } from "react-toastify";
import { GlobalContextProvider } from "@/context/GlobalContext";
const RootLayout = ({ children }) => {
  return (
    <AuthSessionProvider>
      <GlobalContextProvider>
        <html>
          <body>
            <NavBar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalContextProvider>
    </AuthSessionProvider>
  );
};

export default RootLayout;
