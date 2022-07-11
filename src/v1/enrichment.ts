import { getUser, getUserAddress, updateUser, UserAddress, User } from "./service/users";

import { getExternalEmployees, ExternalEmployee, ExternalEmployeeAddress } from "./service/integration";

interface HashObject {
  [key: string]: string | number | boolean;
}

export interface UserIdentifier {
  userId: number;
  identifier: string;
}

export async function enrichUsers(companyId: number, matchedLocalUsers: UserIdentifier[]) {
  const externalUsers = await getExternalEmployees(companyId);
  const preparedUsers = externalUsers.map((user) => ({
    ...user,
    identifier: `${user.GivenName} ${user.FamilyName}`,
  }));
  for await (const matchedUser of matchedLocalUsers) {
    try {
      await enrichUser(companyId, matchedUser, preparedUsers);
    } catch (err) {
      //
    }
  }
}

export async function enrichUser(
  companyId: number,
  matchedLocalUser: UserIdentifier,
  usersWithEnrichmentIdentifier: (ExternalEmployee & { identifier: string })[]
): Promise<void> {
  const _enrich = async (data): Promise<void> => {
    const updateUserInternally = async (companyId: number, userId: number, user: User): Promise<void> => {
      const userAddress = await getUserAddress(companyId, userId);
      if (userAddress && userAddress.userAddressId) {
        if (user.UserAddresses) user.UserAddresses[0].userAddressId = userAddress.userAddressId;
        else {
          user.UserAddresses = [{ userAddressId: userAddress.userAddressId }];
        }
      }
      await updateUser(companyId, userId, user);
    };
    await updateUserInternally(companyId, matchedLocalUser.userId, data.user);
  };

  const convertData = (emailAddress: string, externalEmployee: ExternalEmployee) => {
    const data = {};
    const user = convertExternalEmployeeToUser(externalEmployee);
    if (user.personalEmail === emailAddress) delete user.personalEmail;
    data["user"] = { ...user };
    let address;
    if (externalEmployee.PrimaryAddr) {
      address = convertExternalAddressToUserAddress(externalEmployee.PrimaryAddr);
    }
    if (address && Object.keys(address).length > 0) data["user"]["UserAddresses"] = [address];
    return data;
  };

  const externalEmployee = usersWithEnrichmentIdentifier.find((user) => user.identifier === matchedLocalUser.identifier);
  const emailAddress: string | undefined = (await getUser(companyId, matchedLocalUser.userId))?.emailAddress;
  const data = convertData(emailAddress as string, externalEmployee as unknown as ExternalEmployee);
  _enrich(data);
}

function convertExternalEmployeeToUser(externalEmployee: ExternalEmployee): HashObject {
  return {
    firstName: externalEmployee.GivenName,
    lastName: externalEmployee.FamilyName,
    emailAddress: externalEmployee.Email,
    dob: externalEmployee.DateOfBirth,
  };
}

function convertExternalAddressToUserAddress(address: ExternalEmployeeAddress): UserAddress {
  return {
    streetName: address.StreetLine,
    city: address.City,
    country: address.Country,
  };
}
