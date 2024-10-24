import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "./auth.middleware"; // Your existing auth middleware
import { parse, DocumentNode, OperationDefinitionNode } from "graphql";

export const applyAuthConditionally = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.body.query;

  if (query) {
    const operationName = ifAuthOperation(query);

    // Check if it's login or signup and skip authMiddleware for these
    if (operationName === "UserLogin" || operationName === "UserSignup") {
      return next(); // Skip middleware for login/signup
    }
  }

  // Apply the auth middleware for other queries/mutations
  return authMiddleware(req, res, next);
};

export const ifAuthOperation = (query: string): string | null => {
  try {
    // Parse the GraphQL query to extract the operation names
    const parsedQuery: DocumentNode = parse(query);

    // Find the first operation definition (e.g., mutation or query)
    const operationDefinition = parsedQuery.definitions.find(
      (def) => def.kind === "OperationDefinition"
    ) as OperationDefinitionNode | undefined;

    // Return the name of the operation (like 'login' or 'signup')
    return operationDefinition?.name?.value || null;
  } catch (error) {
    throw new Error("Error parsing the query");
  }
};
