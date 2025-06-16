"use client";
import { SessionProvider } from "next-auth/react";

const AuthSessionProvider = ({ children }) => {
  return (
    <SessionProvider basePath="/property-hunt/api/auth">
      {children}
    </SessionProvider>
  );
};
export default AuthSessionProvider;
