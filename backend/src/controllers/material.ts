import { Handler, RequestParamHandler } from "express";
import { prisma } from "..";
import { CustomError, MaterialsRequest } from "../interfaces/interfaces";
import { Material } from "@prisma/client";

export class Materiales {
  static index: Handler = async (req, res, next) => {
    try {
      const materiales = await prisma.material.findMany({
        include: {
          Proveedor: {
            select: {
              id: true,
              name: true,
              telefono: true,
              email: true,
              detalles: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(materiales);
    } catch (e) {
      next(e);
    } finally {
      prisma.$disconnect();
    }
  };

  static show: Handler = async (req: MaterialsRequest, res, next) => {
    prisma.$disconnect();

    if (!req.Materials) return next(new Error());

    res.json(req.Materials[0]);
  };

  static create: Handler = async (req, res, next) => {
    const data: Omit<Material, "id" | "createdAt" | "updatedAt"> = req.body;

    if (
      !data.name?.trim() ||
      !data.descripcion?.trim() ||
      Number.isNaN(Number(data.stock)) ||
      Number.isNaN(Number(data.costo)) ||
      Number.isNaN(Number(data.proveedor_id))
    ) {
      const err = new CustomError("Todos los campos del material son obligatorios");
      err.name = "400";
      return next(err);
    }

    try {
      const proveedor = await prisma.proveedor.findUnique({
        where: {
          id: Number(data.proveedor_id),
        },
      });

      if (!proveedor) {
        const err = new CustomError("El proveedor seleccionado no existe");
        err.name = "400";
        return next(err);
      }

      const material = await prisma.material.create({
        data: {
          ...data,
          name: data.name.trim(),
          descripcion: data.descripcion.trim(),
          stock: Number(data.stock),
          costo: Number(data.costo),
          proveedor_id: Number(data.proveedor_id),
        },
      });

      res.json(material);
    } catch (e) {
      next(e);
    }
  };

  public static update: Handler = async (req: MaterialsRequest, res, next) => {
    if (!req.Materials) return;

    const old = req.Materials[0];
    const data: Omit<Material, "createdAt" | "updatedAt"> = req.body;

    if (
      !data.name?.trim() ||
      !data.descripcion?.trim() ||
      Number.isNaN(Number(data.stock)) ||
      Number.isNaN(Number(data.costo)) ||
      Number.isNaN(Number(data.proveedor_id))
    ) {
      const err = new CustomError("Todos los campos del material son obligatorios");
      err.name = "400";
      return next(err);
    }

    try {
      const proveedor = await prisma.proveedor.findUnique({
        where: {
          id: Number(data.proveedor_id),
        },
      });

      if (!proveedor) {
        const err = new CustomError("El proveedor seleccionado no existe");
        err.name = "400";
        return next(err);
      }

      const material = await prisma.material.update({
        where: {
          id: old.id,
        },
        data: {
          ...data,
          id: old.id,
          name: data.name.trim(),
          descripcion: data.descripcion.trim(),
          stock: Number(data.stock),
          costo: Number(data.costo),
          proveedor_id: Number(data.proveedor_id),
        },
      });

      res.json(material);
    } catch (e) {
      next(e);
    } finally {
      prisma.$disconnect();
    }
  };

  public static delete: Handler = async (req: MaterialsRequest, res, next) => {
    if (!req.Materials) {
      const err = new CustomError("Not found");
      err.name = "404";
      return next(err);
    }

    try {
      await prisma.material.delete({
        where: {
          id: req.Materials[0].id,
        },
      });

      res.send();
    } catch (e) {
      next(e);
    } finally {
      prisma.$disconnect();
    }
  };

  public static MaterialsRequestHandler: RequestParamHandler = async (
    req: MaterialsRequest,
    res,
    next,
    id
  ) => {
    let material: Material | null;
    const validated = parseInt(id);

    if (isNaN(validated)) {
      const err = new CustomError("materialId debe ser int");
      err.name = "400";
      return next(err);
    }

    try {
      material = await prisma.material.findUnique({
        where: {
          id: validated,
        },
        include: {
          Proveedor: {
            select: {
              id: true,
              name: true,
              telefono: true,
              email: true,
              detalles: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
    } catch (e) {
      return next(e);
    }

    if (!material) {
      const err = new CustomError("Material no encontrado");
      err.name = "404";
      return next(err);
    }

    req.Materials = [material];
    next();
  };
}
