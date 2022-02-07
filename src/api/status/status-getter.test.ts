import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {StatusGetter} from "./status-getter";

class GetClientSpy implements HttpJaiClientGetInterface {
    get(url: string): Promise<any> {
        this.urlCalled = url;
        this.urlCalls++;
        return Promise.resolve(this.dataToReturn);
    }

    urlCalls = 0;
    urlCalled = '';
    dataToReturn = {};
}

describe('Status Getter', () => {

    const makeSut = () => {
        const client = new GetClientSpy();
        const sut = new StatusGetter(client);
        return {sut, client};
    }


    test('should call server once', async () => {

        const {sut, client} = makeSut();

        await sut.getStatus();

        expect(client.urlCalls).toBe(1);
    });

    test('should return data from client', async () => {

        const {sut, client} = makeSut();

        client.dataToReturn = {
            count: 200
        };

        const data = await sut.getStatus();

        expect(data).toBe(client.dataToReturn);
    });
});
