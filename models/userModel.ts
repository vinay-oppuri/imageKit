import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    name?: string
    email: string
    password?: string
    image?: string
    _id?: mongoose.Types.ObjectId
    resetToken: string
    resetTokenExpiry: Date
    createdAt?: Date
    updatedAt?: Date
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        image: {type: String},
        resetToken: { type: String, default: null },
        resetTokenExpiry: { type: Date, default: null }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err as any);
    }
});


const User = models?.User || model<IUser>('User', userSchema)
export default User