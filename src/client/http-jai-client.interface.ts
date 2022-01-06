export interface HttpJaiClientInterface {
    authenticated: boolean;

    registerApiKeyOnAllHeaders(key: string): void;
}
