import request from "supertest";
import Koa from "koa";
import Mount from "koa-mount";
import bodyParser from "koa-bodyparser";
import bcrypt from "bcrypt";
import DotEnv from "dotenv";
DotEnv.config();

import { mongodb } from "@db/index";
import Api from "@controllers/index";
import { TokenService, UserService } from "@services/v1";
import { UserTable } from "@models/mongo";

jest.mock("../services/v1/user.service", () => ({
  ifEmailExists: jest.fn(),
  ifUserNameExists: jest.fn(),
  userSignup: jest.fn(),
}));

jest.mock("../services/v1/token.service", () => ({
  generateToken: jest.fn(),
}));

jest.mock("../middleware/auth.middleware", () => {
  const originalModule = jest.requireActual("../middleware/auth.middleware");

  return {
    ...originalModule,
    Auth: jest.fn(() => {
      return (_: Object, __?: string, descriptor?: PropertyDescriptor) => {
        const fn: Function = descriptor.value;
        descriptor.value = async function (ctx: any) {
          // Mocked implementation for Auth
          ctx.request.user = {
            _id: "fakeUserId",
            email: "fake@gmail.com",
            username: "testuser",
          };
          return await fn.apply(this, [ctx]);
        };
      };
    }),
  };
});

jest.mock("../models/mongo");
const app = new Koa();

app.use(bodyParser());

async () => {
  await mongodb();
};

// Mount API routes using koa-mount
app.use(Mount("/api", Api));

describe("AuthController", () => {
  describe("POST /api/v1/signup", () => {
    it("should signup a user successfully", async () => {
      const mockUser = {
        email: "test@test.com",
        username: "testuser",
        password: "password",
      };
      (UserService.ifEmailExists as jest.Mock).mockResolvedValue(false);
      (UserService.ifUserNameExists as jest.Mock).mockResolvedValue(false);
      (UserService.userSignup as jest.Mock).mockResolvedValue(mockUser);
      (TokenService.generateToken as jest.Mock).mockResolvedValue({
        token: "fakeToken",
        refreshToken: "fakeRefreshToken",
      });
      const response = await request(app.callback())
        .post("/api/v1/signup")
        .send(mockUser)
        .expect(200);
      expect(JSON.parse(response.text).message).toEqual({
        token: "fakeToken",
        refreshToken: "fakeRefreshToken",
      });
    });
    it("should return an error if username or password is missing", async () => {
      const response = await request(app.callback())
        .post("/api/v1/signup")
        .send({ email: "test@test.com" })
        .expect(400);
      expect(response.text).toBe("Username and password are required");
    });
    it("should return an error if email already exists", async () => {
      (UserService.ifEmailExists as jest.Mock).mockResolvedValue(true);
      const response = await request(app.callback())
        .post("/api/v1/signup")
        .send({
          email: "test@test.com",
          username: "testuser",
          password: "password",
        })
        .expect(400);
      expect(response.text).toBe("Email already exists");
    });
    it("should return an error if username already exists", async () => {
      (UserService.ifEmailExists as jest.Mock).mockResolvedValue(false);
      (UserService.ifUserNameExists as jest.Mock).mockResolvedValue(true);
      const response = await request(app.callback())
        .post("/api/v1/signup")
        .send({
          email: "test@test.com",
          username: "testuser",
          password: "password",
        })
        .expect(400);
      expect(response.text).toBe("Username already exists");
    });
  });

  describe("GET /api/v1/password-login", () => {
    it("should login a user successfully with username and password", async () => {
      const mockUser = {
        _id: "fakeUserId",
        username: "testuser",
        password: await bcrypt.hash("password", 10),
      };
      (UserTable.findOne as jest.Mock).mockResolvedValue(mockUser);
      (TokenService.generateToken as jest.Mock).mockResolvedValue({
        token: "fakeToken",
        refreshToken: "fakeRefreshToken",
      });
      const response = await request(app.callback())
        .get("/api/v1/password-login")
        .send({ username: "testuser", password: "password" })
        .expect(200);
      expect(response.body).toEqual({
        message: "service is up and running",
        data: { token: "fakeToken", refreshToken: "fakeRefreshToken" },
        status: 200,
      });
    });
    it("should return an error if username or password is missing", async () => {
      const response = await request(app.callback())
        .get("/api/v1/password-login")
        .send({ username: "testuser" })
        .expect(400);
      expect(response.text).toBe("Username and password are required");
    });
    it("should return an error if user is not found", async () => {
      (UserTable.findOne as jest.Mock).mockResolvedValue(false);
      const response = await request(app.callback())
        .get("/api/v1/password-login")
        .send({ username: "testuser", password: "password" })
        .expect(400);
      expect(response.text).toBe("Invalid Credentials");
    });
    it("should return an error if password is incorrect", async () => {
      const mockUser = {
        _id: "fakeUserId",
        username: "testuser",
        password: await bcrypt.hash("password", 10),
      };
      (UserTable.findOne as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compare").mockImplementation(async () => false);
      const response = await request(app.callback())
        .get("/api/v1/password-login")
        .send({ username: "testuser", password: "wrongpassword" })
        .expect(400);
      expect(response.text).toBe("Invalid Credentials");
    });
  });

  describe("GET /api/v1/login", () => {
    it("should login a user successfully with JWT token", async () => {
      const password = await bcrypt.hash("password", 10);
      const mockUser = {
        _id: "fakeUserId",
        email: "fake@gmail.com",
        username: "testuser",
        password,
      };
      (UserService.userSignup as jest.Mock).mockResolvedValue(mockUser);
      (UserTable.findOne as jest.Mock).mockResolvedValue(mockUser);
      const response = await request(app.callback())
        .get("/api/v1/login")
        .set("x-access-token", `fakeRefreshToken`)
        .expect(200);
      expect(JSON.parse(response.text).message).toBe(
        "service is up and running"
      );
    });
    it("should return an error if user is not found", async () => {
      (UserTable.findOne as jest.Mock).mockResolvedValue(null);
      const response = await request(app.callback())
        .get("/api/v1/login")
        .set("x-access-token", "fakeJwtToken")
        .expect(400);
      expect(response.text).toBe("User Not Found");
    });
  });
});
