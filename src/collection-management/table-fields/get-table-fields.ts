import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {JaiGetFieldsNotSupportedException} from "../../exceptions/JaiGetFieldsNotSupportedException";

export interface GetTableFieldsClient {
    fields(databaseName: string): Promise<any>;
}

@injectable()
export class GetTableFields implements GetTableFieldsClient {

    constructor(
        @inject("HttpJaiClientGetInterface")
        private readonly client: HttpJaiClientGetInterface
    ) {
    }

    /**
     * Get the column names of a supervised/selfsupervised database.
     * @param databaseName Target Database.
     */
    async fields(databaseName: string) : Promise<any> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const result = await this.client.get(`fields/${databaseName}`);
        return this.extractFields(result);
    }

    private extractFields(result: any) {
        if (Object.keys(result).includes('fields')) {
            return result.fields;
        }

        if (Array.isArray(result) && result.length > 0) {
            if (Object.keys(result[0]).includes('fields')) {
                return result[0].fields;
            }
        }

        throw new JaiGetFieldsNotSupportedException("Result structure not supported");
    }
}
