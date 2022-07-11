export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dob: Date;
}

const allUsers: User[] = [
  {
    userId: 1,
    firstName: "John",
    lastName: "Doe",
    emailAddress: "john@gmail.com",
    dob: new Date(),
  },
  {
    userId: 2,
    firstName: "Mary",
    lastName: "Lee",
    emailAddress: "mary@gmail.com",
    dob: new Date(),
  },
  {
    userId: 3,
    firstName: "Paul",
    lastName: "",
    emailAddress: "paul@gmail.com",
    dob: new Date(),
  },
];

export class UserService {
  async updateUser(userId: number, user: Partial<User>): Promise<void> {
    console.log("* Updating user record:");
    console.log(
      " - User Id:",
      userId,
      "\n - Name:",
      `${user.firstName} ${user.lastName}`,
      "\n - DOB: ",
      user.dob,
      "\n"
    );
  }

  async getUser(companyId: number, userId: any): Promise<User | undefined> {
    return allUsers.find((user) => user.userId === userId);
  }
}
