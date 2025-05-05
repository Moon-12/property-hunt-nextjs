import "@/assets/styles/global.css";
import NavBar from "./components/NavBar";
const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
