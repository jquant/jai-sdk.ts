import {SearchById} from "./search-by-id";


test('should reject an empty collection name', () => {

    const sut = new SearchById();
    let value: Array<number> = [];

    expect(() => {
        sut.search(value)
    }).toThrow()
});
