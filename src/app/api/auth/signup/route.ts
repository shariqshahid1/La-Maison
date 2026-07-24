import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/utils/jwt';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name, email: rawEmail, password, phone } = await req.json();

    const email = typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : '';

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Please provide name, email and password' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user (password will be hashed by schema pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Signup error:', err);
    return NextResponse.json(
      { error: 'Server error', details: err.message },
      { status: 500 }
    );
  }
}
