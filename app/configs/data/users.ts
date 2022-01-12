import { hashSync } from "bcrypt";

const userList = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: hashSync("123456", 10),
  },
];

export default userList;
