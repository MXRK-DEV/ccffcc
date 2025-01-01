import { connectMongoDB } from "../../../../../lib/mongodb"; 
import User from "../../../../../models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { rateLimit } from "../../../../../lib/rateLimit"; // Assuming you have a rate limit utility
import { setCookie } from 'cookies-next';  // For setting secure cookies

// Rate-limiter configuration (assuming you have a rate-limit utility implemented)
const limiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 500, // Max requests per user in 15 minutes
});

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Rate limiting: prevent brute-force attacks
          const rateLimited = await limiter.check(email); // Rate limit based on email
          if (!rateLimited) {
            throw new Error("Too many attempts, please try again later.");
          }

          await connectMongoDB(); // Step 1: Connect to MongoDB
          const user = await User.findOne({ email });  // Step 2: Find the user by email

          if (!user) {
            return null;  // Step 3: Return null if no user is found
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);  // Step 4: Compare password

          if (!passwordsMatch) {
            return null;  // Step 5: Return null if passwords do not match
          }

          // Session handling with JWT: Store only minimal user information
          const sessionUser = {
            id: user._id,
            email: user.email,
            name: user.name,
          };

          // Set the token as a secure cookie (optional)
          setCookie('auth_token', user._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Only set secure cookies in production
            sameSite: 'Strict',  // Prevent CSRF attacks
          });

          return sessionUser;  // Step 6: Return user information to create a session
        } catch (error) {
          console.error("Error: ", error);  // Avoid exposing sensitive details in production
          throw new Error("An error occurred during authentication");
        }
      },
    }),
  ],
  
  // Session settings: JWT-based session with expiration time
  session: {
    strategy: "jwt",
    maxAge: 15 * 60,  // Set JWT expiration to 15 minutes
  },
  
  secret: process.env.NEXTAUTH_SECRET,  // Secure secret for JWT signing (ensure it's a strong secret)

  pages: {
    signIn: "/login",  // Redirect to custom login page
  },
  
  callbacks: {
    async jwt({ token, user }) {
      // Add user information to JWT token (minimal info)
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      // Add user data from JWT token to session object
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
