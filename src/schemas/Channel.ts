import { Field, ObjectType, InputType } from "type-graphql"
import mongoose, {Schema} from 'mongoose'

@ObjectType() export class Channel{
    @Field() _id: string
    @Field() name: string
}

@InputType() export class ChannelInput{
    @Field() name: string
}

const schema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        required: true,
        // format data before save
        set: v => v ? v.trim() : v
    }
});

export const ChannelModel = mongoose.model('Channel', schema)