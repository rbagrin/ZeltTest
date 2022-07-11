import { IntegrationService } from "./service/integration.service";
import { UserAddressService } from "./service/user-address.service";
import { UserBankDetailsService } from "./service/user-bank.service";
import { UserService } from "./service/user.service";

export interface UserIdentifier {
  userId: number;
  identifier: string;
}

export class UserEnrichmentService {
  constructor(
    private readonly userService: UserService,
    private readonly userAddressService: UserAddressService,
    private readonly userBankService: UserBankDetailsService,
    private readonly integrationService: IntegrationService
  ) {}
  
  async enrichUsers(companyId: number, matchedLocalUsers: UserIdentifier[]) {
    // TODO implementation goes here
    throw new Error("Method not implemented.");
  }
}
