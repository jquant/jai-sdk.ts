export interface JaiApiKeyAuthenticator {
    authenticate(apiKey: string): void;

    authenticateFromEnvironmentVariable(): void;

    clearClientHeader(): void;
}
