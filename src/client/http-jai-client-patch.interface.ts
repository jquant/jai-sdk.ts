export interface HttpJaiClientPatchInterface {
    patch(url: string, body: any): Promise<any>;
}
