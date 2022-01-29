import "reflect-metadata"
import {inject} from "tsyringe";
import {HttpJaiHttpJaiClientPostInterface} from "../../client/http-jai-client-post-interface";

export class Creator {

    constructor(
        @inject("HttpJaiClientPostInterface") private readonly client: HttpJaiHttpJaiClientPostInterface
    ) {
    }

    async insert(databaseName: string, data: Array<any>, filterName:string = '') {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        if (!data)
            throw new Error('Parameter data cannot be null');

        if (!Array.isArray(data))
            throw new Error('Parameter data must be an array');

        this.throwIfAnyRequiredFieldsAreNotPresent(data);

        const encodedFilterName = encodeURIComponent(filterName);
        const encodedDatabaseName= encodeURIComponent(databaseName);

        return await this.client.post(`data/${encodedDatabaseName}?filter_name=${encodedFilterName}`, data);
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
