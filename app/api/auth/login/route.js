import User from '@/lib/models/UserModel'
import { ConnectDB } from '../../../../lib/config/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();
const JWT_SECRET = process.env.JWT_SECRET 
const TOKEN_EXPIRY_SECONDS = 60 * 60 * 24 * 7; 

await ConnectDB();

export async function POST(req) {
  try {
    const body = await req.json();
    const email = (body.email || '').toLowerCase();
    const password = body.password;
    

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const payload = {
      id: user._id.toString(),
      email: user.email,
      name:user.name
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRY_SECONDS,
    });

    const cookieOptions = [
      `token=${token}`,
      `HttpOnly`,
      `Path=/`,
      `Max-Age=${TOKEN_EXPIRY_SECONDS}`,
      `SameSite=Strict`,
    ];
    if (process.env.NODE_ENV === 'production') cookieOptions.push('Secure');

    return NextResponse.json(
      { message: 'Logged in',user:payload.email },
      {
        status: 200,
        headers: {
          'Set-Cookie': cookieOptions.join('; '),
        },
        payload:payload           
          
        
        
        
      }
    );
  } catch (err) {
    console.error('Login error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
