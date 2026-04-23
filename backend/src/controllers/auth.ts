import { Handler } from "express";
import { prisma } from "..";
import { CustomError } from "../interfaces/interfaces";
import { Usuario } from "@prisma/client";
import { User } from "./user";

const { createHash } = require("node:crypto");

declare module "express-session" {
  interface SessionData {
    user: Usuario;
  }
}

export class Auth {
  static get loginError() {
    let err = new CustomError("Usuario o contrasena incorrecto");
    err.name = "400";
    return err;
  }

  static login: Handler = async (req, res) => {
    if (req.user) {
      const user = User.exclude([req.user as Usuario], ["password"])[0];
      res.status(200).json(user);
      return;
    }

    res.status(400).json({ error: "Usuario o contrasena incorrecto" });
  };

  static logout: Handler = async (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).send();
    });
  };

  public static hashPassword(password: string) {
    let hash = createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
  }
}
