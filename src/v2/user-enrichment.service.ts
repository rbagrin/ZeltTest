import {ExternalEmployee, IntegrationService} from "./service/integration.service";
import {UserAddress, UserAddressService} from "./service/user-address.service";
import { UserBankDetailsService } from "./service/user-bank.service";
import { UserService } from "./service/user.service";
import {updateUser} from "../v1/service/users";

export interface MatchedUser {
  userId: number;
  identifier: string;
  employeeID?: string | undefined;
}

interface IdentifiableExternalUser extends ExternalEmployee {
  identifier: string
  userId?: number
}

interface ExternalUserAddresses {
  userId: number;
  address: UserAddress
}

export class UserEnrichmentService {
  constructor(
    private readonly userService: UserService,
    private readonly userAddressService: UserAddressService,
    private readonly userBankService: UserBankDetailsService,
    private readonly integrationService: IntegrationService
  ) {}

  // TODO implementation goes here
  async enrichUsers(companyId: number, matchedUsers: MatchedUser[]) {
  // Call integration service and retrieve the external users
   const externalUsers = await this.integrationService.getExternalEmployees(companyId);
   const identifiableExternalUsers: IdentifiableExternalUser[] = externalUsers.map(externalUser => {
     return {
       ...externalUser,
       identifier: `${externalUser.FamilyName} ${externalUser.GivenName}`.toLowerCase()
     }
   })

  // Match the local users with the external users
  //  TODO: Fix name for this variable
    const externalUsers2: IdentifiableExternalUser[] = identifiableExternalUsers.map(externalUser => {
      const matchedUser = matchedUsers.find(user => user.identifier.toLowerCase() === externalUser.identifier);
      if (!matchedUser) return externalUser;
      return {
        ...externalUser, userId: matchedUser.userId
      }
    })

  //  For each external user, upsert the user information with address
    let addressesToUpdate: ExternalUserAddresses[] = [];

   externalUsers2.forEach((externalUser) => {
     // If could not match user
     if (!externalUser.userId) return;

     //  Convert external user address format to database format
     const {PrimaryAddr: externalAddress} = externalUser

      const userAddress: UserAddress = {
        streetName: externalAddress.StreetLine,
        city: externalAddress.City,
        country: externalAddress.Country
      }

      addressesToUpdate.push({
        userId: externalUser.userId,
        address: userAddress
      })
    })

  //  Update all information of address
    for (const addressToUpdate of addressesToUpdate) {
      await this.userAddressService.updateAddress(addressToUpdate.userId, addressToUpdate.address)
    }
  }
}
