## Scenario

Consider that you're working on an app that offers the possibility of connecting an external app that contains data from your employees. We would like to import this data and enriching our app's user data with information like addresses, banking data, etc.

1. We fetch a list of employees from an external source using their public API.
This is the kind of data that we receive: 
```
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
```

2. Users are matched using their first and last name. We take the data from the external source and save in our our database. *Imported data will override any existing data*.

This is what the schema looks like:

```
User {
  userId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dob: Date;
}

UserAddress {
  userAddressId?: number;
  streetName: string;
  city: string;
  country: string;
}
```

3. We would like to also import bank account information from the external source. 

## Stage: Code review (5-10min)

Imagine that a collegue of yours submited a PR with the code that you can find in the `v1` folder. How could you make it more readable, maintenable and future proof?

Check only `enrichment.ts` file, the others are mock services that return data and act like the database or the external API.

## Stage: Refactory (30-45min)

Refactor the code applying the suggestions that you made on the previous step.

Also, we'd like to also enrich the user model with banking informations.
