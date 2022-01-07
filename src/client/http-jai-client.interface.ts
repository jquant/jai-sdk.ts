export interface HttpJaiClientInterface {
    authenticated: boolean;

    registerApiKeyOnAllHeaders(key: string): void

    postApiKeyRequest(body: any): Promise<void>;
}

export interface HttpJaiClientPutInterface {
    put(url: string, body: any): Promise<any>;
}
