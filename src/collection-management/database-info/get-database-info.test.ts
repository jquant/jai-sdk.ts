import "reflect-metadata"
import {GetDatabaseInfo} from "./get-database-info";
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

class HttpGetClientSpy implements HttpJaiClientGetInterface {
    get(url: string): Promise<any> {
        this.urlCalled = url
        this.calls++
        return Promise.resolve(this.dataToBeReturned);
    }

    calls = 0;
    urlCalled = ''
    dataToBeReturned: any
}

const makeSut = () => {
    const client = new HttpGetClientSpy();
    const sut = new GetDatabaseInfo(client);

    return {sut, client};
}

describe('get database info', () => {

    test('should reject a null mode', async () => {
        const {sut} = makeSut();
        const mode: any = null;

        await expect(sut.getInfo(mode))
            .rejects
            .toThrow(Error)
    });

    test('should reject invalid mode', async () => {
        const {sut} = makeSut();
        const mode: any = 'invalid';

        await expect(sut.getInfo(mode))
            .rejects
            .toThrow(Error)
    });

    test('should use default mode if null', async () => {
        const {sut, client} = makeSut();

        await sut.getInfo();

        expect(client.urlCalled).toContain('mode=complete');
    });

    test('should call complete mode', async () => {
        const {sut, client} = makeSut();

        await sut.getInfo('complete');

        expect(client.urlCalled).toContain('mode=complete');
    });

    test('should call names mode', async () => {
        const {sut, client} = makeSut();

        await sut.getInfo('names');

        expect(client.urlCalled).toContain('mode=names');
    });

    test('should call with get size param', async () => {
        const {sut, client} = makeSut();

        await sut.getInfo();

        expect(client.urlCalled).toContain('get_size=true');
    });

    test('should call url once', async () => {
        const {sut, client} = makeSut();

        await sut.getInfo('names');

        expect(client.calls).toBe(1);
    });

    test('should return expected data', async () => {
        const {sut, client} = makeSut();

        client.dataToBeReturned = {
            super: true
        };

        const returnedData = await sut.getInfo();

        expect(returnedData).toBe(client.dataToBeReturned);
    });

})
