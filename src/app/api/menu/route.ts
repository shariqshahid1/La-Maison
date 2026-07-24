import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MenuItem from '@/models/MenuItem';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const query: Record<string, unknown> = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    const menuItems = await MenuItem.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      menuItems,
    });
  } catch {
    console.error('Get menu error');
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
    const menuItem = await MenuItem.create(data);

    return NextResponse.json({
      success: true,
      menuItem,
    }, { status: 201 });
  } catch {
    console.error('Create menu item error');
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
        { error: 'Menu item ID is required' },
        { status: 400 }
      );
    }

    await MenuItem.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Menu item deleted',
    });
  } catch {
    console.error('Delete menu item error');
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
