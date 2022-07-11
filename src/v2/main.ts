import { IntegrationService } from "./service/integration.service";
import { UserAddressService } from "./service/user-address.service";
import { UserBankDetailsService } from "./service/user-bank.service";
import { UserService } from "./service/user.service";
import { MatchedUser, UserEnrichmentService } from "./user-enrichment.service";

async function main(): Promise<void> {
  const enrichmentService = new UserEnrichmentService(
    new UserService(),
    new UserAddressService(),
    new UserBankDetailsService(),
    new IntegrationService()
  );
  const matchedUsers: MatchedUser[] = [
    { userId: 1, identifier: "John Doe" },
    { userId: 3, identifier: "Mary Lee" },
  ];
  await enrichmentService.enrichUsers(1, matchedUsers);
}

main();
