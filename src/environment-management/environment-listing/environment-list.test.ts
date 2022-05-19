import "reflect-metadata"
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {EnvironmentLister} from "./environment-list";
import {Environment} from "../environment";

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

describe('list environments', () => {

    const makeSut = () => {
        const client = new GetClientSpy();
        const sut = new EnvironmentLister(client);
        return {sut, client};
    }
    test('should call server once', async () => {

        const {sut, client} = makeSut();

        await sut.list();

        expect(client.urlCalls).toBe(1);
    });

    test('should return data from client', async () => {

        const {sut, client} = makeSut();
        const dummyData: Environment[] = [{
            id: "my-dummy-environment-id",
            key: "my-dummy-environment-key",
            name: "Dummy Environment Name",
        }];
        client.dataToReturn = dummyData;

        const data = await sut.list();

        expect(data).toBe(dummyData);
    });
});
