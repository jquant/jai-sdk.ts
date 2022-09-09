import {GetTableFields} from "./get-table-fields";
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {JaiGetFieldsNotSupportedException} from "../../exceptions/JaiGetFieldsNotSupportedException";

const arrayResult = [{
    'fields': [{
        'name': 'string',
        'type': 'string',
    }],
}];

const objectResult = {
    'fields': [{
        'name': 'string',
        'type': 'string',
    }],
};

class HttpGetClientSpy implements HttpJaiClientGetInterface {
    urlCalled = ''

    resultMock: any;

    get(url: string): Promise<any> {
        this.urlCalled = url
        return Promise.resolve(this.resultMock);
    }

    makeResultAsArray() {
        this.resultMock = arrayResult;
    }

    makeResultAsObject() {
        this.resultMock = objectResult;
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
        client.makeResultAsArray();
        const databaseName: any = 'my-collection'

        await sut.fields(databaseName);

        await expect(client.urlCalled).toBe(`fields/${databaseName}`)
    })

    test('should return the fields from received array data', async () => {

        const {sut, client} = makeSut();
        client.makeResultAsArray();
        const databaseName: any = 'my-collection'

        const data = await sut.fields(databaseName);

        await expect(data).toBe(arrayResult[0].fields);
    })

    test('should return the fields from received object data', async () => {

        const {sut, client} = makeSut();
        client.makeResultAsObject();
        const databaseName: any = 'my-collection'

        const data = await sut.fields(databaseName);

        await expect(data).toBe(objectResult.fields);
    })

    test(`should throw ${JaiGetFieldsNotSupportedException.name}`, async () => {

        const {sut} = makeSut();
        const databaseName: any = 'my-collection'

        await expect(sut.fields(databaseName))
            .rejects
            .toThrow()
    })

})
