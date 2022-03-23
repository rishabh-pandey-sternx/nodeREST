import * as crypto from 'crypto';
import * as bycrpt from 'bcrypt';
// import * as jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const userSchema = new Schema({
email: { type: String, unique: true, lowercase: true, required: true },
password: { type: String, select: false, required: true },
role: { type: String, enum: ['user', 'admin'], default: 'user' },
fullName: {type: String, required: true}
},{ timestamps: true });

// userSchema.pre('save', function(next) {
//  // hash the password
// }