import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const query: Record<string, unknown> = {};
    if (userId) {
      query.user = userId;
    }

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch {
    console.error('Get orders error');
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
    const order = await Order.create(data);

    return NextResponse.json({
      success: true,
      order,
    }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Create order error:', err);
    return NextResponse.json(
      { error: 'Server error', details: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const data = await req.json();
    const order = await Order.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch {
    console.error('Update order error');
    return NextResponse.json(
      { error: 'Server error' },
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
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    await Order.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Order deleted',
    });
  } catch {
    console.error('Delete order error');
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
