import mongoose, {model, models, Schema} from "mongoose";

export interface ICommunity {
    name: string
    description?: string
    admin: mongoose.Types.ObjectId
    members: mongoose.Types.ObjectId[]
}

const communitySchema = new Schema<ICommunity>(
    {
        name: {type: String, required: true},
        description: {type: String},
        admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    },
    {
        timestamps: true
    }
)

export const Community = models?.Community || model<ICommunity>('Community', communitySchema)