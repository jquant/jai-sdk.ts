import {InsertedDataSetup, SetupSettings} from "./inserted-data-setup";
import {HttpJaiClientPostInterface} from "../../client/http-jai-client-post-interface";

class ClientSpy implements HttpJaiClientPostInterface {
    post(url: string, body: any): Promise<any> {

        if (this.shouldThrow)
            throw new Error();

        this.calls++;
        this.urlCalled = url;
        this.bodyCalled = body;
        return Promise.resolve({url, body});
    }

    shouldThrow = false;
    calls = 0;
    urlCalled = ''
    bodyCalled: any;
}

const makeSut = () => {
    const client = new ClientSpy();
    const sut = new InsertedDataSetup(client);

    return {sut, client};
}

const dummyCollectionName = 'my-collection-name';

let dummySetupSettings: SetupSettings;

describe('inserted data setup', () => {

    beforeEach(() => {
        dummySetupSettings = {
            db_type: "Image",
            hyperparams: {
                model_name: "torchvision",
                mode: "test",
                resize_W: 10,
                resize_H: 20
            }
        };
    })

    test('should reject an empty collection name', async () => {
        const {sut} = makeSut();

        await expect(sut.setup('', dummySetupSettings))
            .rejects
            .toThrow(Error)
    });

    test('should reject null data', async () => {

        const {sut} = makeSut();
        const nullData: any = null;

        await expect(sut.setup(dummyCollectionName, nullData))
            .rejects
            .toThrow(Error)
    });

    test('should reject array data', async () => {

        const {sut} = makeSut();
        const arrayData: any = [];

        await expect(sut.setup(dummyCollectionName, arrayData))
            .rejects
            .toThrow(Error)
    });

    test('should reject string', async () => {

        const {sut} = makeSut();

        const stringData: any = 'not an object';

        await expect(sut.setup(dummyCollectionName, stringData))
            .rejects
            .toThrow(Error)
    });

    test('should reject number', async () => {

        const {sut} = makeSut();

        const stringData: any = 25;

        await expect(sut.setup(dummyCollectionName, stringData))
            .rejects
            .toThrow(Error)
    });

    test('should post received settings', async () => {

        const {sut, client} = makeSut();

        await sut.setup(dummyCollectionName, dummySetupSettings);

        expect(client.bodyCalled).toBe(dummySetupSettings);
    });

    test('should post once', async () => {

        const {sut, client} = makeSut();

        await sut.setup(dummyCollectionName, dummySetupSettings);

        expect(client.calls).toBe(1);
    });

    test('should post the correct quick test as true', async () => {

        const {sut, client} = makeSut();

        await sut.setup(dummyCollectionName, dummySetupSettings, true);

        expect(client.urlCalled).toContain('quick_test=true');
    });

    test('should post the correct quick test as true with invalid value', async () => {

        const {sut, client} = makeSut();

        const quickTest: any = 'other'

        await sut.setup(dummyCollectionName, dummySetupSettings, quickTest);

        expect(client.urlCalled).toContain('quick_test=true');
    });

    test('should post the correct quick test as false', async () => {
        const {sut, client} = makeSut();

        await sut.setup(dummyCollectionName, dummySetupSettings, false);

        expect(client.urlCalled).toContain('quick_test=false');
    });

    test('should post the correct quick test as false as default value', async () => {
        const {sut, client} = makeSut();

        await sut.setup(dummyCollectionName, dummySetupSettings);

        expect(client.urlCalled).toContain('quick_test=false');
    });

    test('should post the correct overwrite as true', async () => {

        const {sut, client} = makeSut();

        await sut.setup(dummyCollectionName, dummySetupSettings, false, true);

        expect(client.urlCalled).toContain('overwrite=true');
    });

    test('should encode collection name', async () => {

        const {sut, client} = makeSut();

        const unencoded = 'mY_1 Unenc&%oded collection Nam3';
        const expected = encodeURIComponent(unencoded);

        await sut.setup(unencoded, dummySetupSettings);

        expect(client.urlCalled).toContain(expected);
    });

    test('should post the correct overwrite as true with invalid value', async () => {

        const {sut, client} = makeSut();

        const overwrite: any = 'other'

        await sut.setup(dummyCollectionName, dummySetupSettings, false, overwrite);

        expect(client.urlCalled).toContain('overwrite=true');
    });

    test('should post the correct overwrite as false', async () => {
        const {sut, client} = makeSut();

        await sut.setup(dummyCollectionName, dummySetupSettings, false, false);

        expect(client.urlCalled).toContain('overwrite=false');
    });

    test('should post the correct overwrite as false as default value', async () => {
        const {sut, client} = makeSut();

        await sut.setup(dummyCollectionName, dummySetupSettings);

        expect(client.urlCalled).toContain('overwrite=false');
    });

    test('should throw clients exception', async () => {
        const {sut, client} = makeSut();

        client.shouldThrow = true

        await expect(sut.setup(dummyCollectionName, dummySetupSettings))
            .rejects
            .toThrow();
    });

});
