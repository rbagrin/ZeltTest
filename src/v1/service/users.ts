/**
 * This is a mock file that contains service methods. It returns mock data and you shouldn't change it.
 */

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dob: Date;
  UserAddresses: Partial<UserAddress>[];
}

export interface UserAddress {
  userAddressId?: number;
  streetName: string;
  city: string;
  country: string;
}

export async function getUserAddress(companyId: number, userId: number): Promise<UserAddress | undefined> {
  return userAddressesTable[userId] || undefined;
}

export async function updateUser(companyId: number, userId: number, user: User): Promise<void> {
  console.log("* Updating user record:");
  console.log(" - User Id:", userId, "\n - Name:", `${user.firstName} ${user.lastName}`, "\n - DOB: ", user.dob, "\n");
  if (user.UserAddresses[0].userAddressId) {
    console.log("* Updating user address record");
    console.log(
      " - User Id:",
      userId,
      "\n - Address",
      `${user.UserAddresses[0].streetName}, ${user.UserAddresses[0].city}, ${user.UserAddresses[0].country}\n`
    );
  } else {
    console.log("* Creating user address record");
    console.log(
      " - User Id:",
      userId,
      "\n - Address",
      `${user.UserAddresses[0].streetName}, ${user.UserAddresses[0].city}, ${user.UserAddresses[0].country}\n`
    );
  }
}

export async function getUser(companyId: number, userId: any): Promise<User | undefined> {
  return allUsers.find((user) => user.userId === userId);
}

const allUsers: User[] = [
  {
    userId: 1,
    firstName: "John",
    lastName: "Doe",
    emailAddress: "john@gmail.com",
    dob: new Date(),
    UserAddresses: [],
  },
  {
    userId: 2,
    firstName: "Mary",
    lastName: "Lee",
    emailAddress: "mary@gmail.com",
    dob: new Date(),
    UserAddresses: [],
  },
  {
    userId: 3,
    firstName: "Paul",
    lastName: "",
    emailAddress: "paul@gmail.com",
    dob: new Date(),
    UserAddresses: [],
  },
];

const userAddressesTable: { [key: number]: UserAddress } = {
  1: {
    userAddressId: 1,
    streetName: "Main St, 12",
    city: "London",
    country: "UK",
  },
};