const {
  index,
  login,
  register,
  inviteMember,
  confirmInvite,
} = require("../UsersController");
const UserLoginService = require("../../useCases/UserLoginService");
const UserListService = require("../../useCases/UserListService");
const UserRegisterService = require("../../useCases/UserRegisterService");
const UserInviteService = require("../../useCases/UserInviteService");
const UserConfirmInviteService = require("../../useCases/UserConfirmInviteService");

jest.mock("../../useCases/UserLoginService");
jest.mock("../../useCases/UserListService");
jest.mock("../../useCases/UserRegisterService");
jest.mock("../../useCases/UserInviteService");
jest.mock("../../useCases/UserConfirmInviteService");

describe("UserController", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      companyId: "company-id",
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe("index", () => {
    it("should return user list", async () => {
      UserListService.prototype.execute.mockResolvedValue(["user1", "user2"]);
      await index(req, res, next);
      expect(res.json).toHaveBeenCalledWith(["user1", "user2"]);
    });

    it("should handle errors", async () => {
      UserListService.prototype.execute.mockRejectedValue(new Error("error"));
      await index(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "error" });
    });
  });

  describe("login", () => {
    it("should return token for valid credentials", async () => {
      req.body = { email: "test@test.com", password: "password" };
      UserLoginService.prototype.execute.mockResolvedValue("token");
      await login(req, res, next);
      expect(res.json).toHaveBeenCalledWith({ token: "token" });
    });

    it("should return validation error for invalid credentials", async () => {
      req.body = { email: "", password: "" };
      await login(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.anything() })
      );
    });

    it("should handle errors", async () => {
      req.body = { email: "test@test.com", password: "password" };
      UserLoginService.prototype.execute.mockRejectedValue(new Error("error"));
      await login(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error("error"));
    });
  });

  describe("register", () => {
    it("should register user with valid data", async () => {
      req.body = {
        email: "test@test.com",
        password: "password",
        name: "name",
        company: "company",
      };
      await register(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({});
    });

    it("should return validation error for invalid data", async () => {
      req.body = { email: "", password: "", name: "", company: "" };
      await register(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.anything() })
      );
    });

    it("should handle errors", async () => {
      req.body = {
        email: "test@test.com",
        password: "password",
        name: "name",
        company: "company",
      };
      UserRegisterService.prototype.execute.mockRejectedValue(
        new Error("error")
      );
      await register(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error("error"));
    });
  });

  describe("inviteMember", () => {
    it("should invite member with valid data", async () => {
      req.body = { email: "invite@test.com", name: "name" };
      await inviteMember(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({});
    });

    it("should return validation error for invalid data", async () => {
      req.body = { email: "", name: "" };
      await inviteMember(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.anything() })
      );
    });

    it("should handle errors", async () => {
      req.body = { email: "invite@test.com", name: "name" };
      UserInviteService.prototype.execute.mockRejectedValue(new Error("error"));
      await inviteMember(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error("error"));
    });
  });

  describe("confirmInvite", () => {
    it("should confirm invite with valid data", async () => {
      req.body = { password: "password" };
      req.params = { hash: "hash" };
      await confirmInvite(req, res, next);
      expect(res.json).toHaveBeenCalledWith({});
    });

    it("should return validation error for invalid data", async () => {
      req.body = { password: "" };
      await confirmInvite(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.anything() })
      );
    });

    it("should handle errors", async () => {
      req.body = { password: "password" };
      req.params = { hash: "hash" };
      UserConfirmInviteService.prototype.execute.mockRejectedValue(
        new Error("error")
      );
      await confirmInvite(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error("error"));
    });
  });
});
