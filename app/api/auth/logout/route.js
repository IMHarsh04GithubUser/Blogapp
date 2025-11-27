import { NextResponse } from 'next/server';
import env from 'dotenv';

env.config();

export async function POST() {
  try {
    
    const cookieOptions = [
      `token=`,
      `HttpOnly`,
      `Path=/`,
      `Max-Age=0`,
      `SameSite=Strict`,
    ];
    if (process.env.NODE_ENV === 'production') cookieOptions.push('Secure');

    return NextResponse.json(
      { message: 'Logged out' },
      {
        status: 200,
        headers: {
          'Set-Cookie': cookieOptions.join('; '),
        },
      }
    );
  } catch (err) {
    console.error('Logout error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
