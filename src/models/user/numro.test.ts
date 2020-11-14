import { createNumros } from "./numro";

test("createNumros", () => {
  const results = createNumros(101, "example.com", 0);
  const user1 = results[0];
  expect(user1.familyName).toBe("一条");
  expect(user1.givenName).toBe("太郎");

  const user2 = results[1];
  expect(user2.familyName).toBe("一条");
  expect(user2.givenName).toBe("次郎");

  const user101 = results[100];
  expect(user101.familyName).toBe("二条");
  expect(user101.givenName).toBe("太郎");
});
