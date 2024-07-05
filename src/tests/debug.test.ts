import { UserService } from "@app/services/v1";

describe("Path Resolution", () => {
  it("should resolve UserService correctly", () => {
    expect(UserService).toBeDefined();
  });
});
