import { enrichUsers, UserIdentifier } from "./enrichment.js";

async function main(): Promise<void> {
  const companyId = 1;
  const matchedLocalUsers: UserIdentifier[] = [
    { userId: 1, identifier: "John Doe" },
    { userId: 3, identifier: "Mary Lee" },
  ];
  await enrichUsers(companyId, matchedLocalUsers);
}

main();
