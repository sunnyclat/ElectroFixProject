import { Handler, RequestParamHandler } from "express";
import { prisma } from "..";
import { CustomError, proveedorRequest } from "../interfaces/interfaces";
import { Proveedor } from "@prisma/client";
import * as EmailValidator from "email-validator";

export class Proveedores {
  static index: Handler = async (req, res, next) => {
    try {
      const proveedores = await prisma.proveedor.findMany({
        include: {
          Materials: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(proveedores);
    } catch (e) {
      next(e);
    } finally {
      prisma.$disconnect();
    }
  };

  static show: Handler = async (req: proveedorRequest, res, next) => {
    prisma.$disconnect();

    if (!req.Proveedores) return next(new Error());

    res.json(req.Proveedores[0]);
  };

  static create: Handler = async (req, res, next) => {
    const data: Omit<Proveedor, "id" | "createdAt" | "updatedAt"> = req.body;

    if (!data.name?.trim() || !data.email?.trim() || !String(data.telefono).trim() || !data.detalles?.trim()) {
      const err = new CustomError("Todos los campos del proveedor son obligatorios");
      err.name = "400";
      return next(err);
    }

    if (!EmailValidator.validate(data.email)) {
      const err = new CustomError("Email invalido");
      err.name = "400";
      return next(err);
    }

    try {
      const proveedor = await prisma.proveedor.create({
        data: {
          ...data,
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          detalles: data.detalles.trim(),
          telefono: Number(data.telefono),
        },
      });

      res.json(proveedor);
    } catch (e) {
      next(e);
    }
  };

  public static update: Handler = async (req: proveedorRequest, res, next) => {
    if (!req.Proveedores) return;

    const old = req.Proveedores[0];
    const data: Omit<Proveedor, "createdAt" | "updatedAt"> = req.body;

    if (!data.name?.trim() || !data.email?.trim() || !String(data.telefono).trim() || !data.detalles?.trim()) {
      const err = new CustomError("Todos los campos del proveedor son obligatorios");
      err.name = "400";
      return next(err);
    }

    if (!EmailValidator.validate(data.email)) {
      const err = new CustomError("Email invalido");
      err.name = "400";
      return next(err);
    }

    try {
      const proveedor = await prisma.proveedor.update({
        where: {
          id: old.id,
        },
        data: {
          ...data,
          id: old.id,
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          detalles: data.detalles.trim(),
          telefono: Number(data.telefono),
        },
      });

      res.json(proveedor);
    } catch (e) {
      next(e);
    } finally {
      prisma.$disconnect();
    }
  };

  public static delete: Handler = async (req: proveedorRequest, res, next) => {
    if (!req.Proveedores) return;

    try {
      await prisma.proveedor.delete({
        where: {
          id: req.Proveedores[0].id,
        },
      });

      res.send();
    } catch (e) {
      next(e);
    } finally {
      prisma.$disconnect();
    }
  };

  public static proveedoresRequestHandler: RequestParamHandler = async (
    req: proveedorRequest,
    res,
    next,
    id
  ) => {
    let proveedor: Proveedor | null;
    const validated = parseInt(id);

    if (isNaN(validated)) {
      const err = new CustomError("proveedorId debe ser int");
      err.name = "400";
      return next(err);
    }

    try {
      proveedor = await prisma.proveedor.findUnique({
        where: {
          id: validated,
        },
        include: {
          Materials: true,
        },
      });
    } catch (e) {
      return next(e);
    }

    if (!proveedor) {
      const err = new CustomError("Proveedor no encontrado");
      err.name = "404";
      return next(err);
    }

    req.Proveedores = [proveedor];
    next();
  };
}
