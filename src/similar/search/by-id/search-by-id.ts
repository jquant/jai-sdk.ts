export class SearchById {

    search(ids: Array<number>) {
        if (!ids || ids.length === 0)
            throw new Error('The ids are required to perform the search');


    }

}
