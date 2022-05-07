import {buildPredictCommand} from "../model-interface/command-line-interface/command-builder";
import {buildSearchByIdCommand} from "../similar/search/by-id/command-line-interface/command-builder";
import {buildSearchByDataCommand} from "../similar/search/by-data/command-line-interface/command-builder";
import {
    buildCollectionCreateCommand
} from "../collection-management/collection-creator/command-line-interface/command-builder";
import {
    buildCollectionCheckDataCommand
} from "../collection-management/data-check/command-line-interface/command-builder";
import {
    buildCollectionDeleteCommand
} from "../collection-management/deletion/inserted-data/command-line-interface/command-builder";
import {buildCollectionSetupCommand} from "../collection-management/setup/command-line-interface/command-builder";
import {
    buildCollectionInterruptSetupCommand
} from "../collection-management/interrupter/command-line-interface/command-builder";
import {buildCollectionAddDataCommand} from "../collection-management/add-data/command-line-interface/command-builder";
import {
    buildCollectionDatabaseDescriptionCommand
} from "../collection-management/database-description/command-line-interface/command-builder";
import {
    buildCollectionDatabaseInfoCommand
} from "../collection-management/database-info/command-line-interface/command-builder";
import {buildCollectionGetFilterCommand} from "../collection-management/filters/command-line-interface/command-builder";
import {buildCollectionGetIdsCommand} from "../collection-management/ids/command-line-interface/command-builder";
import {
    buildCollectionIsDatabaseNameValidCommand
} from "../collection-management/name-validation/command-line-interface/command-builder";
import {buildCollectionGetReportCommand} from "../collection-management/report/command-line-interface/command-builder";
import {
    buildCollectionGetFieldsCommand
} from "../collection-management/table-fields/command-line-interface/command-builder";
import {buildVectorByIdCommand} from "../collection-management/vector/command-line-interface/command-builder";
import {
    buildCollectionDownloadCommand
} from "../collection-management/vector/download/command-line-interface/command-builder";
import {
    buildCollectionDeleteDatabaseCommand
} from "../collection-management/deletion/database/command-line-interface/command-builder";
import {
    buildCollectionDeleteEntityCommand
} from "../collection-management/deletion/entity/command-line-interface/command-builder";
import {buildGetStatusCommand} from "../api/status/command-line-interface/command-builder";
import {buildDeleteStatusCommand} from "../api/status/deletion/command-line-interface/command-builder";
import {buildApiKeyCreatorCommand} from "../authentication/api-key/command-line-interface/command-builder";
import {
    buildGetEnvironmentsStatusCommand
} from "../environment-management/environment-listing/command-line-interface/command-builder";
import {buildRecommendationByIdCommand} from "../recommendation/by-id/command-line-interface/command-builder";
import {buildRecommendationByDataCommand} from "../recommendation/by-data/command-line-interface/command-builder";

const buildCommands = () => [
    buildPredictCommand(),
    buildSearchByIdCommand(),
    buildSearchByDataCommand(),
    buildCollectionCreateCommand(),
    buildCollectionCheckDataCommand(),
    buildCollectionDeleteCommand(),
    buildCollectionSetupCommand(),
    buildCollectionInterruptSetupCommand(),
    buildCollectionAddDataCommand(),
    buildCollectionDatabaseDescriptionCommand(),
    buildCollectionDatabaseInfoCommand(),
    buildCollectionGetFilterCommand(),
    buildCollectionGetIdsCommand(),
    buildCollectionIsDatabaseNameValidCommand(),
    buildCollectionGetReportCommand(),
    buildCollectionGetFieldsCommand(),
    buildVectorByIdCommand(),
    buildCollectionDownloadCommand(),
    buildCollectionDeleteDatabaseCommand(),
    buildCollectionDeleteEntityCommand(),
    buildGetStatusCommand(),
    buildDeleteStatusCommand(),
    buildApiKeyCreatorCommand(),
    buildGetEnvironmentsStatusCommand(),
    buildRecommendationByIdCommand(),
    buildRecommendationByDataCommand(),
];

export default buildCommands;
