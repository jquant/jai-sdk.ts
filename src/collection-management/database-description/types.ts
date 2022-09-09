export type Feature = {
    name: string,
    dtype: string,
    feature_id: string,
    embedding_dim: string,
}

export type DatabaseDescription = {
    name: string,
    dtype: string,
    state: string,
    version: string,
    has_filter: string,
    twin_base: string,
    model_hyperparams: any,
    features: Feature[]
}
