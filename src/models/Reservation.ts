import mongoose, { Schema, models, model } from 'mongoose';

export interface IReservation {
  _id?: string;
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: [true, 'Please provide a name'] },
    email: { type: String, required: [true, 'Please provide an email'] },
    phone: { type: String, required: [true, 'Please provide a phone number'] },
    date: { type: Date, required: [true, 'Please provide a date'] },
    time: { type: String, required: [true, 'Please provide a time'] },
    guests: { type: Number, required: [true, 'Please provide number of guests'], min: 1 },
    specialRequests: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default models.Reservation || model<IReservation>('Reservation', ReservationSchema);
