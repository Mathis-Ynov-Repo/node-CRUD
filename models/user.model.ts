import mongoose, { Schema } from 'mongoose';
import { IUser } from './IUser';

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    civility: { type: String, required: true },
    photo: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    birthDate: { type: Date, required: true }

})

export default mongoose.model<IUser>('user', UserSchema);
