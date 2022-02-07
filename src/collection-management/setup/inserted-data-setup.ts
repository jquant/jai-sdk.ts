import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientPostInterface} from "../../client/http-jai-client-post-interface";

export type ImageHyperParams = {
    model_name: "torchvision" | "other";
    mode?: string;
    resize_H?: number;
    resize_W?: number;
}

export type FastTextHyperParams = {
    minn?: number;
    maxn?: number;
    dim?: number;
    epoch?: number;
}

export type TextHyperParams = {
    nlp_model?: string;
    batch_size?: number;
    max_length?: number;
}

export type SupervisedHyperParams = {
    dropout_rate?: string;
    batch_size?: number;
    learning_rate?: number;
    encoder_layer?: "2L";
    decoder_layer?: "2L" | "2L_BN" | "1L";
    hidden_latent_dim?: 64 | 32 | 16 | 128 | 256;
    patience?: 7 | 14 | 21 | 28;
    min_delta?: number
}

export type SelfSupervisedHyperParams = SupervisedHyperParams & {}

export type SetupSettings = {
    db_type: "Supervised" | "SelfSupervised" | "Image" | "Text" | "FastText";
    hyperparams: ImageHyperParams | FastTextHyperParams | TextHyperParams |
        SupervisedHyperParams | SelfSupervisedHyperParams;
    callback_url?: string
}

@injectable()
export class InsertedDataSetup {
    constructor(
        @inject("HttpJaiClientPostInterface") private readonly client: HttpJaiClientPostInterface,
    ) {
    }

    async setup(databaseName: string, settings: SetupSettings,
                quickTest: boolean = false, overwrite: boolean = false) {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        if (!settings)
            throw new Error('Parameter settings cannot be null');

        if (Array.isArray(settings) || typeof settings !== "object")
            throw new Error('Parameter settings must be an object');

        const checkedQuickTest = !!quickTest;
        const checkedOverwrite = !!overwrite;

        const encodedDatabaseName = encodeURIComponent(databaseName);

        const url = `setup/${encodedDatabaseName}?quick_test=${checkedQuickTest}&overwrite=${checkedOverwrite}`

        await this.client.post(url, settings);
    }
}
