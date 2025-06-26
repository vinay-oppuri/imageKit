import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    username: string
    email: string
    password: string
    _id?: mongoose.Types.ObjectId
    resetToken: string
    resetTokenExpiry: Date
    createdAt?: Date
    updatedAt?: Date
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        resetToken: { type: String, default: null },
        resetTokenExpiry: { type: Date, default: null }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const User = models?.User || model<IUser>('User', userSchema)
export default User