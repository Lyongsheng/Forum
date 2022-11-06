import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { Channel, ChannelInput, ChannelModel } from "../schemas/Channel";


@Resolver(of => Channel)
export class ChannelResolver {

    @Query(returns => [Channel], { nullable: false })
    async getChannels(): Promise<Channel[]> {
        let docs = await ChannelModel.find()
        return docs.map(item => item.toObject())
    }

    @Mutation(returns => Channel)
    async addChannel(@Arg('channelInput') { name }: ChannelInput): Promise<Channel> {
        let doc = await ChannelModel.create({name})
        return doc.toObject()
    }
}