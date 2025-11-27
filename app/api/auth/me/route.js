import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/lib/models/UserModel";
import { ConnectDB } from "@/lib/config/db";

await ConnectDB();

export async function GET(req) {
  try {
    const cookie = req.headers.get("cookie") || "";

    
    const token = cookie?.split("token=")?.[1]?.split(";")?.[0];
    if (!token) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    return NextResponse.json({
      authenticated: true,
      user,
      
      
    });
  } catch (err) {
    console.log("ME ERROR:", err);
    return NextResponse.json({ authenticated: false, user: null });
  }
}
