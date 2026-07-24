import { Schema, models, model } from 'mongoose';

export interface IContactMessage {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: [true, 'Please provide a name'] },
    email: { type: String, required: [true, 'Please provide an email'] },
    phone: { type: String },
    subject: { type: String, required: [true, 'Please provide a subject'] },
    message: { type: String, required: [true, 'Please provide a message'] },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.ContactMessage || model<IContactMessage>('ContactMessage', ContactMessageSchema);
