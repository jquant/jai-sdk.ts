// import {HttpJaiClientPutInterface} from "../../../client/http-jai-client.interface";

export class SearchById {

    async search(collectionName: string, ids: Array<number>, topK = 5): Promise<void> {

        if (!collectionName)
            throw new Error('You must provide e collectionName');

        if (!topK)
            throw new Error('Parameter topK cannot be null');

        if (topK < 1)
            throw new Error('Parameter topK must be greather than 0');

        if (!ids || ids.length === 0)
            throw new Error('The ids are required to perform the search');

        if (ids.some(x => isNaN(x)) || ids.some(x => x == null || false))
            throw new Error('All the ids must be a number');


        // console.log(this.client)

        // await this.client.put(`similar/id/${collectionName}?top_k=${topK}`, ids);
    }

}
