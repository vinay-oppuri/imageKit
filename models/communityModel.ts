import mongoose, {model, models, Schema} from "mongoose";

export interface ICommunity {
    name: string
    description?: string
    admin: string
    members: string[]
}

const communitySchema = new Schema<ICommunity>(
    {
        name: {type: String, required: true},
        description: {type: String},
        admin: {type: String, required: true},
        members: {type: [String]}
    },
    {
        timestamps: true
    }
)

export const Community = models?.Community || model<ICommunity>('Community', communitySchema)