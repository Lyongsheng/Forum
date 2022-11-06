import { Field, ObjectType, InputType } from "type-graphql"
import mongoose, {Schema} from 'mongoose'

@ObjectType() export class Message {
    @Field() _id: string
    @Field() title: string
    @Field() content: string
    @Field() channel: string
    @Field() createdAt: number
}

@InputType() export class QueryMessageInput {
    @Field() current: number
    @Field() limit: number
    @Field() channel: string
}

@InputType() export class MessageInput {
    @Field() title: string
    @Field() content: string
    @Field() channel: string
}

const schema = new Schema({
    title: {
        type: String,
        index: true,
        require: true,
        set: v => v ? v.trim() : v
    },
    content: String,
    channel: String,
    createdAt: {type: Number, default: Date.now}
});

export const MessageModel = mongoose.model('Message', schema)