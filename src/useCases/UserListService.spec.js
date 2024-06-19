const UserListService = require("./UserListService");

jest.mock("../repository/UserRepository");

describe("UserListService", () => {
  let userListService;

  const userRepository = {
    getAllUsers: jest.fn(),
  };

  it("should return a list of users", async () => {
    const mockUsers = [
      { id: 1, name: "User One" },
      { id: 2, name: "User Two" },
    ];

    userRepository.getAllUsers.mockResolvedValue(mockUsers);

    userListService = new UserListService(userRepository);

    const users = await userListService.execute();

    expect(users).toEqual(mockUsers);
  });

  it("should handle empty user list", async () => {
    userRepository.getAllUsers.mockResolvedValue([]);

    userListService = new UserListService(userRepository);

    const users = await userListService.execute();

    expect(users).toEqual([]);
  });
});
