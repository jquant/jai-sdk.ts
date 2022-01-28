export interface HttpJaiClientPostInterface {
    post(url: string, body: any): Promise<any>;
}
