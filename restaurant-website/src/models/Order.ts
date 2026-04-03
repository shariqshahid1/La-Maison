import mongoose, { Schema, models, model } from 'mongoose';

export interface IOrder {
  _id?: string;
  user: mongoose.Schema.Types.ObjectId;
  items: {
    menuItem: mongoose.Schema.Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  deliveryAddress?: string;
  phone?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'],
      default: 'pending',
    },
    deliveryAddress: { type: String },
    phone: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export default models.Order || model<IOrder>('Order', OrderSchema);
