export interface HttpJaiClientInterface {
    authenticated: boolean;

    registerApiKeyOnAllHeaders(key: string): void

    postApiKeyRequest(body: any): Promise<void>;
}

