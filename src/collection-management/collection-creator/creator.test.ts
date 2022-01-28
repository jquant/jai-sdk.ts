import {Creator} from "./creator";


describe('create collection', () => {

    const makeSut = () => {
        const creator = new Creator();

        return {
            sut: creator
        }
    }

    const dummyCollectionName = 'my-collection-name';

    // const makeDummySearchCriteria = () => [{
    //     'id': 2,
    //     'title': 'Mr.'
    // }, {
    //     'id': 3,
    //     'firstname': 'John Doe'
    // }];


    test('should reject null collection name', async () => {

         const {sut} = makeSut();
         const nullCollectionName: any = null

        await expect(sut.insert(nullCollectionName, []))
            .rejects
            .toThrow()
    })

    test('should reject empty collection name', async () => {

        const {sut} = makeSut();
        const nullCollectionName: any = ''

        await expect(sut.insert(nullCollectionName, []))
            .rejects
            .toThrow()
    })

    test('should reject null data', async () => {

        const {sut} = makeSut();
        const nullData: any = null;

        await expect(sut.insert(dummyCollectionName, nullData))
            .rejects
            .toThrow(Error)
    });

    test('should reject number data', async () => {

        const {sut} = makeSut();

        const numberData: any = 56;

        await expect(sut.insert(dummyCollectionName, numberData))
            .rejects
            .toThrow(Error)
    });

    test('should reject string', async () => {

        const {sut} = makeSut();

        const stringData: any = 'not an object';

        await expect(sut.insert(dummyCollectionName, stringData))
            .rejects
            .toThrow(Error)
    });

    test('should reject object data', async () => {

        const {sut} = makeSut();

        const objectData: any = {};

        await expect(sut.insert(dummyCollectionName, objectData))
            .rejects
            .toThrow(Error)
    });

    test('should reject data without id field', async () => {

        const {sut} = makeSut();

        const objectData = [{
            key:1,
            value1: 100
        }];

        await expect(sut.insert(dummyCollectionName, objectData))
            .rejects
            .toThrow(Error)
    });

    test('should reject data without non id field', async () => {

        const {sut} = makeSut();

        const objectData = [{
            id:1,
            value1: 100
        },{
            id:2,
        }];

        await expect(sut.insert(dummyCollectionName, objectData))
            .rejects
            .toThrow(Error)
    });


})
