import {Query, Resolver, Mutation, Arg} from "type-graphql";
import {Message, MessageInput, MessageModel, QueryMessageInput} from "../schemas/Message";


@Resolver(of => Message)
export class MessageResolver {

    @Query(returns => [Message], { nullable: true })
    async getMessagesByChannel(@Arg('queryMessageInput') { channel, current = 1, limit = 20 }: QueryMessageInput): Promise<Message[]> {
        let docs = await MessageModel.find({channel})
            .sort('-_id')
            .skip(limit * (current - 1))
            .limit(limit)
        return docs.map(item => item.toObject());
    }

    @Mutation(returns => Message)
    async addMessage(@Arg('messageInput') {title, content, channel }: MessageInput): Promise<Message> {
        let doc = await MessageModel.create({title, content, channel})
        return doc.toObject()
    }
}