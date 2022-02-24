import axios from "axios";

interface IUser {
  firstName: string;
  lastName?: string;
}

const add = (num1: number, num2: number) => num1 + num2;

const isNull = () => null;

const checkValue = (value: any) => value;

const createUser = () => {
  const user: IUser = {
    firstName: "Nika",
  };
  user["lastName"] = "Khachi";
  return user;
};

const getUser = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  return data;
};

export { add, isNull, checkValue, createUser, getUser };
