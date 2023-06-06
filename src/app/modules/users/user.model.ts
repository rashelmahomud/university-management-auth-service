import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

///this is a user model
const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
export const User = model<IUser, UserModel>('User', userSchema);
