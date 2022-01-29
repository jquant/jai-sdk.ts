import {InsertedDataSetup, SetupSettings} from "./inserted-data-setup";

const makeSut = () => {
    const sut = new InsertedDataSetup();

    return {sut};
}

const dummyCollectionName = 'my-collection-name';

const dummySetupSettings: SetupSettings = {
    db_type: "Image",
    hyperparams: {
        model_name: "torchvision",
        mode: "test",
        resize_W: 10,
        resize_H: 20
    }
}

describe('inserted data setup', () => {

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


});
