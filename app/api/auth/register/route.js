import User from '@/lib/models/UserModel'
import { ConnectDB } from '../../../../lib/config/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import env from 'dotenv';

env.config();

await ConnectDB();

export async function POST(req) {
  try {
    const body = await req.json();
    const name = body.name;
    const email = (body.email || '').toLowerCase();
    const password = body.password;
    

    if (!name||!email || !password) {
      return NextResponse.json(
        { error: 'Name, Email and password are required' },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashed,
    });

    await newUser.save();

    return NextResponse.json({ message: 'User registered' }, { status: 201 });
  } catch (err) {
    console.error('Register error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
