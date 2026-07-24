import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';

export async function GET(_req: NextRequest) {
  try {
    await dbConnect();

    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch {
    console.error('Get messages error:');
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data = await req.json();
    const message = await ContactMessage.create(data);

    return NextResponse.json({
      success: true,
      message,
    }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Create message error:', err);
    return NextResponse.json(
      { error: 'Server error', details: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    await ContactMessage.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Message deleted',
    });
  } catch {
    console.error('Delete message error:');
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
