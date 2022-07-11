import { getUser, getUserAddress, updateUser, UserAddress, User } from "./service/users";

import { getExternalEmployees, ExternalEmployee, ExternalEmployeeAddress } from "./service/integration";

interface HashObject {
  [key: string]: string | number | boolean;
}

export interface MatchedUser {
  userId: number;
  identifier: string;
  employeeID?: string | undefined; // We don't need to say undefined
}

export async function enrichUsers(companyId: number, matchedUsers: MatchedUser[]) {
  const externalUsers = await getExternalEmployees(companyId);
  const preparedUsers = externalUsers.map((user) => ({
    ...user,
    identifier: `${user.GivenName} ${user.FamilyName}`,
  }));

  // Can use Promise.all() to parallelize process
  for await (const matchedUser of matchedUsers) {
    try {
      await enrichUser(companyId, matchedUser, preparedUsers);
    } catch (err) {
      //
    }
  }
}

// Break into smaller functions (Single Responsibility)
// Keep the individual functions as not exported
export async function enrichUser(
  companyId: number,
  matchedUser: MatchedUser,
  usersWithEnrichmentIdentifier: (ExternalEmployee & { identifier: string })[]
): Promise<void> {
  // Take out of the implementation
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
    await updateUserInternally(companyId, matchedUser.userId, data.user);
  };

  // Take out of the implementation
  const convertData = (emailAddress: string, externalEmployee: ExternalEmployee) => {
    const data = {};
    const user = convertExternalEmployeeToUser(externalEmployee);
    if (user.personalEmail === emailAddress) delete user.personalEmail;
    data["user"] = { ...user };
    let address;
    if (externalEmployee.PrimaryAddr) {
      address = convertExternalAddressToUserAddress(externalEmployee.PrimaryAddr);
    }
    // Make a variable for Object.keys(address).length > 0
    if (address && Object.keys(address).length > 0) data["user"]["UserAddresses"] = [address];
    return data;
  };

  // Must make all lower case
  // Can consider to trim whitespaces
  const externalEmployee = usersWithEnrichmentIdentifier.find((user) => user.identifier === matchedUser.identifier);
  // Make clearer with two variables, one for user then email
  const emailAddress: string | undefined = (await getUser(companyId, matchedUser.userId))?.emailAddress;
  // Unnecessary to cast as unknown first
  // If else block before calling convertData to check if undefined
  // If undefined, then return error message
  const data = convertData(emailAddress as string, externalEmployee as unknown as ExternalEmployee);
  _enrich(data);
}

// Can return more strongly typed interface extending HashObject
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
