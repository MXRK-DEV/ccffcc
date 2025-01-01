import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format." }, { status: 400 });
    }

    // Check if email already exists
    await connectMongoDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered." }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
