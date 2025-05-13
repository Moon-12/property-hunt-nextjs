import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      connectDB();
      const userExists = await User.findOne({ email: profile.email });
      // 4. Return true to allow sign in
      if (!userExists) {
        const userName = profile.name.slice(0, 20);
        User.create({
          email: profile.email,
          userName,
          image: profile.picture,
        });
      }
      return true;
    },
    // Modifies the session object
    async session({ session }) {
      connectDB();
      const user = await User.findOne({ email: session.user.email });
      if (user) {
        session.user.id = user._id.toString();
      }
      return session;
    },
  },
};
