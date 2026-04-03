import mongoose, { Schema, models, model } from 'mongoose';

export interface IMenuItem {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: [true, 'Please provide a name'] },
    description: { type: String, required: [true, 'Please provide a description'] },
    price: { type: Number, required: [true, 'Please provide a price'] },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Pizza', 'Burgers', 'BBQ', 'Drinks', 'Desserts', 'Appetizers', 'Pasta', 'Salads'],
    },
    image: { type: String, default: '/images/food-placeholder.jpg' },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.MenuItem || model<IMenuItem>('MenuItem', MenuItemSchema);
