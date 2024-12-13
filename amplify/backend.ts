import { RemovalPolicy } from "aws-cdk-lib";
import { auth } from "./auth/resource";
import { storage } from "./storage/resource";
import { defineBackend } from "@aws-amplify/backend";
import { Duration } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
const backend = defineBackend({
    auth,
    storage
});
const cfnUserPool = backend.auth.resources.cfnResources.cfnUserPool;
cfnUserPool.userPoolName = "testmigrationdemofin7ebac70d_userpool_7ebac70d-main";
cfnUserPool.usernameAttributes = undefined;
cfnUserPool.policies = {
    passwordPolicy: {
        minimumLength: 8,
        requireLowercase: false,
        requireNumbers: false,
        requireSymbols: false,
        requireUppercase: false,
        temporaryPasswordValidityDays: 7
    }
};
cfnUserPool.applyRemovalPolicy(RemovalPolicy.RETAIN, { applyToUpdateReplacePolicy: true })
const cfnIdentityPool = backend.auth.resources.cfnResources.cfnIdentityPool;
cfnIdentityPool.identityPoolName = "testmigrationdemofin7ebac70d_identitypool_7ebac70d__main";
cfnIdentityPool.applyRemovalPolicy(RemovalPolicy.RETAIN, { applyToUpdateReplacePolicy: true })
const userPool = backend.auth.resources.userPool;
userPool.addClient("eu-central-1_rUiA1hKy1", {
    disableOAuth: true,
    authSessionValidity: Duration.minutes(3),
    userPoolClientName: "testmi7ebac70d_app_client",
    enablePropagateAdditionalUserContextData: false,
    enableTokenRevocation: true,
    refreshTokenValidity: Duration.days(30)
})
const s3Bucket = backend.storage.resources.cfnResources.cfnBucket;
// s3Bucket.bucketName = "testmigrationdemofin91eee89a044d4822a9b0892105ee435b-main";
s3Bucket.applyRemovalPolicy(RemovalPolicy.RETAIN, { applyToUpdateReplacePolicy: true })
s3Bucket.bucketEncryption = {
    serverSideEncryptionConfiguration: [
        {
            serverSideEncryptionByDefault: {
                sseAlgorithm: "AES256"
            },
            bucketKeyEnabled: false
        }
    ]
};
