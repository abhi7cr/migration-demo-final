import { defineStorage } from "@aws-amplify/backend";
/**
 * TODO: Your project uses group permissions. Group permissions have changed in Gen 2. In order to grant permissions to groups in Gen 2, please refer to https://docs.amplify.aws/react/build-a-backend/storage/authorization/#for-gen-1-public-protected-and-private-access-pattern. */
export const storage = defineStorage({ name: "testmigrationdemofin91eee89a044d4822a9b0892105ee435b-main", access: allow => ({
        "public/*": [allow.guest.to(["read"]), allow.authenticated.to(["write", "read", "delete"])],
        "protected/{entity_id}/*": [allow.authenticated.to(["write", "read", "delete"])],
        "private/{entity_id}/*": [allow.authenticated.to(["write", "read", "delete"])]
    }) });
