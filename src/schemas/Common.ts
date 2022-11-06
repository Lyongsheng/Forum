import {Field, ObjectType} from "type-graphql";

@ObjectType() export class Page<T> {
    @Field() limit: number
    @Field() total: number
    @Field() currentPage: number
    @Field() data: T[] | T
}

@ObjectType() export class Result<T> {
    @Field() code: number
    @Field() message: string|null
    @Field() data: T|null
    constructor(code: number, data: T, message: string|null) {
        this.code = code
        this.data = data
        this.message = message
    }
    static success(data: T): Result<Array<T>>{
        return new Result<Array<T>>(200, data, null)
    }
    static fail(message){
        return new Result(500, null, message)
    }
}