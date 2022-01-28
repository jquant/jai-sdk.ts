export class Creator {
    async insert(databaseName: string, data: Array<any>) {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        if (!data)
            throw new Error('Parameter data cannot be null');

        if (!Array.isArray(data))
            throw new Error('Parameter data must be an array');

        this.throwIfAnyRequiredFieldsAreNotPresent(data);

        console.debug(data)
    }

    private throwIfAnyRequiredFieldsAreNotPresent(data: Array<any>) {
        data.forEach(item => {

            const columNames = Object.keys(item);

            if (columNames.every(x => x !== 'id'))
                throw new Error(`Field 'id' must be present`);

            if (columNames.every(x => x === 'id'))
                throw new Error(`Field 'id' must be present`);
        });
    }

}
