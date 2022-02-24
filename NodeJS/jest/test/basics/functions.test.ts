import { add, isNull, checkValue, createUser, getUser } from "./functions";

// it() and test() are same

const initDatabase = () => console.log("Initialize Database");
const closeDatabase = () => console.log("Database Closed");
const checkingFunctions = () => console.log("Checking Functions");

// beforeEach(() => initDatabase());
// afterEach(() => closeDatabase());

beforeAll(() => initDatabase());
afterAll(() => closeDatabase());

describe("Functions", () => {
  beforeEach(() => checkingFunctions());
  describe("add", () => {
    test("Sum to Be", () => {
      const sum = add(5, 4);
      expect(sum).toBe(9);
    });
    test("Sum NOT to Be", () => {
      const sum = add(5, 10);
      expect(sum).not.toBe(5);
    });
  });
  //
  describe("isNull", () => {
    test("Should be null", () => {
      expect(isNull()).toBeNull();
    });
  });
  //
  describe("checkValue", () => {
    test("Should be false", () => {
      expect(checkValue(0)).toBeFalsy();
    });
  });
  //
  describe("createUser", () => {
    test("User should be Nika Khachi object", () =>
      expect(createUser()).toEqual({ firstName: "Nika", lastName: "Khachi" }));
  });
  //
});

describe("Regex", () => {
  test("No 'Q' in Nika", () => expect("Nika").not.toMatch(/Q/));
});

describe("Arrays", () => {
  test("Admin should be in usernames", () => {
    const usernames = ["Nick", "Admin", "John"];
    expect(usernames).toContain("Admin");
  });
});

describe("Async Data", () => {
  test("Fetched user should be Leanne Graham", async () => {
    const user = await getUser();
    expect(user.name).toBe("Leanne Graham");
  });
});
