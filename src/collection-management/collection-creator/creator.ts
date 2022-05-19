import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientPostInterface} from "../../client/http-jai-client-post-interface";

@injectable()
export class Creator {

    constructor(
        @inject("HttpJaiClientPostInterface") private readonly client: HttpJaiClientPostInterface
    ) {
    }

    async insert(databaseName: string, data: Array<any>, filterName: string = '') {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        if (!data)
            throw new Error('Parameter data cannot be null');

        if (!Array.isArray(data))
            throw new Error('Parameter data must be an array');

        this.throwIfAnyRequiredFieldsAreNotPresent(data);

        let url = `data/${encodeURIComponent(databaseName)}`;

        if (filterName) {
            url += `?filter_name=${encodeURIComponent(filterName)}`;
        }

        return await this.client.post(url, data);
    }

    private throwIfAnyRequiredFieldsAreNotPresent(data: Array<any>) {
        data.forEach(item => {

            const columNames = Object.keys(item);

            if (columNames.every(x => x !== 'id'))
                throw new Error(`Field 'id' must be present`);

            if (columNames.every(x => x === 'id'))
                throw new Error(`Field 'id' must be present`);
        });
    }

}
