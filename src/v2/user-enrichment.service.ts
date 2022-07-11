import { IntegrationService } from "./service/integration.service";
import { UserAddressService } from "./service/user-address.service";
import { UserBankDetailsService } from "./service/user-bank.service";
import { UserService } from "./service/user.service";

export interface MatchedUser {
  userId: number;
  identifier: string;
  employeeID?: string | undefined;
}

export class UserEnrichmentService {
  constructor(
    private readonly userService: UserService,
    private readonly userAddressService: UserAddressService,
    private readonly userBankService: UserBankDetailsService,
    private readonly integrationService: IntegrationService
  ) {}

  // TODO implementation goes here
  enrichUsers(companyId: number, matchedUsers: MatchedUser[]) {
    throw new Error("Method not implemented.");
  }
}
