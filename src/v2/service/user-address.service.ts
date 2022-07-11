/**
 * This is a mock file that contains service methods. It returns mock data and you shouldn't change it.
 */

export interface UserAddress {
  userAddressId?: number;
  streetName: string;
  city: string;
  country: string;
}

export class UserAddressService {
  async updateAddress(userId: number, address: UserAddress): Promise<void> {
    console.log("* Updating user address record");
    console.log(" - User Id:", userId, "\n - Address", `${address.streetName}, ${address.city}, ${address.country}\n`);
  }

  async createAddress(userId: number, address: UserAddress): Promise<void> {
    console.log("* Creating user address record");
    console.log(" - User Id:", userId, "\n - Address", `${address.streetName}, ${address.city}, ${address.country}\n`);
  }

  async getUserAddress(companyId: number, userId: number): Promise<UserAddress | undefined> {
    return userAddressesTable[userId] || undefined;
  }
}

const userAddressesTable: { [key: number]: UserAddress } = {
  1: {
    userAddressId: 1,
    streetName: "Main St, 12",
    city: "London",
    country: "UK",
  },
};
