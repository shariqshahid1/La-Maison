import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Reservation from '@/models/Reservation';

export async function GET(_req: NextRequest) {
  try {
    await dbConnect();

    const reservations = await Reservation.find().sort({ date: -1 });

    return NextResponse.json({
      success: true,
      reservations,
    });
  } catch {
    console.error('Get reservations error');
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
    const reservation = await Reservation.create(data);

    return NextResponse.json({
      success: true,
      reservation,
    }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Create reservation error:', err);
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
        { error: 'Reservation ID is required' },
        { status: 400 }
      );
    }

    await Reservation.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Reservation deleted',
    });
  } catch {
    console.error('Delete reservation error');
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
