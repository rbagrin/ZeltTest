/**
 * This is a mock file that contains service methods. It returns mock data and you shouldn't change it.
 */

export interface ExternalEmployeeAddress {
  StreetLine: string;
  Country: string;
  City: string;
}

export interface ExternalEmployeeBankAccount {
  BankNo: number;
  AccountNumber: string;
  Currency: string;
}

export interface ExternalEmployee {
  Id: string;
  FamilyName: string;
  GivenName: string;
  Email: string;
  PrimaryAddr: ExternalEmployeeAddress;
  BankAccount: ExternalEmployeeBankAccount;
  DateOfBirth: string;
}

export async function getExternalEmployees(companyId: number): Promise<ExternalEmployee[]> {
  return [
    {
      Id: "user1",
      GivenName: "John",
      FamilyName: "Doe",
      Email: "john@gmail.com",
      DateOfBirth: "11/10/1976",
      PrimaryAddr: {
        StreetLine: "Rue Mouffetard, 43",
        Country: "France",
        City: "Paris",
      },
      BankAccount: {
        BankNo: 321,
        AccountNumber: "UK5321231231",
        Currency: "GBP",
      },
    },
    {
      Id: "user2",
      GivenName: "John",
      FamilyName: "Bonjovi",
      Email: "johnbj@gmail.com",
      DateOfBirth: "12/01/1971",
      PrimaryAddr: {
        StreetLine: "High St",
        Country: "UK",
        City: "London",
      },
      BankAccount: {
        BankNo: 321,
        AccountNumber: "UK938",
        Currency: "GBP",
      },
    },
    {
      Id: "user3",
      GivenName: "Mary",
      FamilyName: "Lee",
      Email: "mary@gmail.com",
      DateOfBirth: "22/06/1987",
      PrimaryAddr: {
        StreetLine: "High St",
        Country: "UK",
        City: "Manchester",
      },
      BankAccount: {
        BankNo: 321,
        AccountNumber: "UK938",
        Currency: "GBP",
      },
    },
  ];
}
