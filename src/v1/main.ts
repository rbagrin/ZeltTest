import { enrichUsers, MatchedUser } from "./enrichment.js";

async function main(): Promise<void> {
  const companyId = 1;
  const matchedUsers: MatchedUser[] = [
    { userId: 1, identifier: "John Doe" },
    { userId: 3, identifier: "Mary Lee" },
  ];
  await enrichUsers(companyId, matchedUsers);
}

main();
