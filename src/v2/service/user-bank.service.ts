export interface UserBankDetails {
  BankNo: number;
  AccountNumber: string;
  Currency: string;
}

export class UserBankDetailsService {
  async updateBankDetails(userId: number, bank: UserBankDetails): Promise<void> {
    console.log("* Updating user bank record");
    console.log(" - User Id:", userId, "\n - Bank", `${bank}\n`);
  }

  async createBankDetails(userId: number, bank: UserBankDetails): Promise<void> {
    console.log("* Creating user bank record");
    console.log(" - User Id:", userId, "\n - Bank", `${bank}\n`);
  }
}
