import {inject} from "tsyringe";
import {HttpJaiClientPutInterface} from "../../../client/http-jai-client-put.interface";

export class SearchByData {

    constructor(
        @inject("ClientPutInterface") private readonly client: HttpJaiClientPutInterface
    ) {
    }

    async search(collectionName: string, data: Array<any>, topK = 5): Promise<void> {
        if (!collectionName)
            throw new Error('You must provide e collectionName');

        if (!topK)
            throw new Error('Parameter topK cannot be null');

        if (topK < 1)
            throw new Error('Parameter topK must be greater than 0');

        if (!data)
            throw new Error('Parameter data cannot be null');

        if (!Array.isArray(data))
            throw new Error('Parameter data must be an array');


        return await this.client.put(`similar/id/${collectionName}?top_k=${topK}`, data);
    }
}
