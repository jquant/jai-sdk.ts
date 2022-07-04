export type mode = 'complete' | 'names';

export type DatabaseInfo = {
    db_name: string,
    db_type: string,
    db_version: string,
    db_parents: string[],
    "size": number
}
