import {GetTableFields} from "./get-table-fields";
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

class HttpGetClientSpy implements HttpJaiClientGetInterface {

    urlCalled = ''
    mockedData = {
        'fields' : [{
            'name' : 'string',
            'type' : 'string',
        }],
    }

    extractedFields (){
        const {fields} = this.mockedData;
        return fields;
    };

    get(url: string): Promise<any> {
        this.urlCalled = url
        return Promise.resolve(this.mockedData);
    }
}

const makeSut = () => {
    const client = new HttpGetClientSpy()
    const sut = new GetTableFields(client)

    return {
        sut, client
    }
}

describe('get table fields', () => {

    test('should reject null collection name', async () => {

        const {sut} = makeSut();
        const nullCollectionName: any = null

        await expect(sut.fields(nullCollectionName))
            .rejects
            .toThrow()
    })

    test('should reject empty collection name', async () => {

        const {sut} = makeSut();
        const nullCollectionName: any = ''

        await expect(sut.fields(nullCollectionName))
            .rejects
            .toThrow()
    })

    test('should call the expected url', async () => {

        const {sut, client} = makeSut();
        const databaseName: any = 'my-collection'

        await sut.fields(databaseName);

        await expect(client.urlCalled).toBe(`fields/${databaseName}`)
    })

    test('should return the fields received data', async () => {

        const {sut, client} = makeSut();
        const databaseName: any = 'my-collection'

       const data = await sut.fields(databaseName);

        await expect(data).toBe(client.extractedFields())
    })

})
