import {GetTableFields} from "./get-table-fields";
import {HttpJaiClientGetInterface} from "../client/http-jai-client-get.interface";

class HttpGetClientSpy implements HttpJaiClientGetInterface {

    urlCalled = ''
    mockedData = {
        'id' : 'number',
        'name' : 'string',
    }

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
        const collectionName: any = 'my-collection'

        await sut.fields(collectionName);

        await expect(client.urlCalled).toBe(`fields/${collectionName}`)
    })

    test('should return the raw received data', async () => {

        const {sut, client} = makeSut();
        const collectionName: any = 'my-collection'

       const data = await sut.fields(collectionName);

        await expect(data).toBe(client.mockedData)
    })

})
