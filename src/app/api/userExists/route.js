import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Extract email from the request body
    const { email } = await req.json();

    // Validate the email format (simple regex check)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    // Find user by email (only selecting the _id field)
    const user = await User.findOne({ email }).select("_id");

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    // If user exists, return user data (or just user._id)
    return NextResponse.json({ user });
  } catch (error) {
    // Log the error and send a 500 response to the client
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { message: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
