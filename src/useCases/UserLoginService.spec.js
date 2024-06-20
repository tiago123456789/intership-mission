const { ADMIN } = require("../utils/roleUtil");
const UserLoginService = require("./UserLoginService");

describe("UserLoginService", () => {
  let userLoginService;

  const userRepository = {
    findByEmail: jest.fn(),
    getRoleByRoleId: jest.fn(),
  };

  const bcrypt = {
    compare: jest.fn(),
  };

  generateJwtTokenProvider = {
    getToken: jest.fn(),
  };

  const params = {
    email: "test@example.com",
    password: "test@test",
  };

  const userLoginTest = {
    email: "test@example",
    password: "teste123",
  };

  it("should throw InvalidCredentialsError if user not found", async () => {
    try {
      userRepository.findByEmail.mockResolvedValue([]);

      userLoginService = new UserLoginService(userRepository);

      await userLoginService.execute(params);
    } catch (err) {
      expect(err.message).toEqual("Credenciais invalidas!");
    }
  });

  it("should throw InvalidCredentialsError if password not valid", async () => {
    try {
      userRepository.findByEmail.mockResolvedValue([
        { email: userLoginTest.email, password: userLoginTest.password },
      ]);

      userLoginService = new UserLoginService(userRepository, bcrypt);

      await userLoginService.execute(userLoginTest);
      expect(true).toBe(false);
    } catch (err) {
      expect(bcrypt.compare).toHaveBeenCalledWith(
        userLoginTest.password,
        userLoginTest.password
      );
      expect(err.message).toEqual("Credenciais invalidas!");
    }
  });

  it("should return a token if credentials are valid", async () => {
    userRepository.findByEmail.mockResolvedValue([
      {
        id: 10,
        email: params.email,
        password: params.password,
        company_id: 1,
        role_id: ADMIN,
      },
    ]);

    userRepository.getRoleByRoleId.mockResolvedValue([{ name: "ADMIN" }]);

    generateJwtTokenProvider.getToken.mockResolvedValue({
      id: 10,
      email: params.email,
      company_id: 1,
      role: "ADMIN",
    });

    bcrypt.compare.mockResolvedValue(params.password, params.password);

    const tokenResult = await userLoginService.execute(params);

    const result = await userLoginService.execute(params);

    expect(result).toBe(tokenResult);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      params.password,
      params.password
    );
  });
});
