import { Schema, Document, model } from 'mongoose';

import { validStatuses } from '../utils/validations/validOrderSchema';

export interface OrderProperties extends Document {
    userEmail: string;
    date: Date;
    value: number;
    currency: 'USD';
    status: 'approved' | 'pending' | 'rejected';
}

const orderSchema = new Schema({
    userEmail: {
        type: String,
        trim: true,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        enum: ['USD'],
        required: true,
    },
    status: {
        type: String,
        enum: validStatuses,
        required: true,
    },
});

orderSchema.index({ userEmail: 1, date: 1 }, { unique: true });

export const Order = model('Order', orderSchema);
