export interface JaiApiKeyAuthenticator {
    authenticate(apiKey: string): void;

    authenticateFromEnvironmentVariable(): void;
    setEnvironment(environmentName: string): void;

    clearClientHeader(): void;
}
