import { ApolloServerPlugin } from "apollo-server-plugin-base";

import { GraphQLRequestContext } from "apollo-server-types";
import { GraphQLRequestListener } from "apollo-server-plugin-base/src/index";

// https://stackoverflow.com/questions/59988906/how-do-i-write-a-apollo-server-plugin-to-log-the-request-and-its-duration
export const LogPlugin: ApolloServerPlugin = {
  requestDidStart<TContext>(_: GraphQLRequestContext<TContext>): GraphQLRequestListener<TContext> {
    const { operationName, variables } = _.request;
    console.log("request  -->", `operation: ${operationName}; variables: ${JSON.stringify(variables)};}`);
    const start = Date.now();
    let op: string;

    return {
      didResolveOperation(context) {
        op = context.operationName as string;
      },
      didEncounterErrors(context) {
        console.log(`Errors: ${context.errors}`);
      },
      willSendResponse(context) {
        const stop = Date.now();
        const elapsed = stop - start;
        const size = JSON.stringify(context.response).length * 2;
        console.log(`response --> operataion: ${op}; duration: ${elapsed}ms; bytes: ${size}`);
      },
    };
  },
};
