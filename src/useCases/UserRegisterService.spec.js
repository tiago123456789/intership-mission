const UserRegisterService = require("./UserRegisterService");

describe("UserRegisterService", () => {
  let userRegisterService;

  const userRepository = {
    findByEmail: jest.fn(),
    createCompany: jest.fn(),
    createUser: jest.fn(),
  };

  const params = {
    email: "test@test.com",
    password: "test123",
    name: "User test",
    company: "Company test",
  };

  const bcrypt = {
    hashSync: jest.fn(),
  };

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should be throw exception if email is already used", async () => {
    try {
      userRepository.findByEmail.mockResolvedValue([
        { email: "test@test.com" },
      ]);

      userRegisterService = new UserRegisterService(userRepository);
      await userRegisterService.execute(params);
    } catch (err) {
      expect(err.message).toEqual("Não é possível usar o email informado.");
    }
  });

  it("Should create a new user successfully", async () => {
    userRepository.findByEmail.mockResolvedValue([]);

    userRepository.createCompany.mockResolvedValue([{ id: 10 }]);

    userRepository.createUser.mockResolvedValue({ id: 10, ...params });

    userRegisterService = new UserRegisterService(userRepository, bcrypt);

    const result = await userRegisterService.execute(params);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(params.email);

    expect(userRepository.createCompany).toHaveBeenCalledWith(params.company);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(params.password, 8);

    expect(result).toEqual({ id: 10, ...params });
  });
});
