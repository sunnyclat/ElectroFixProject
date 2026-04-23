import { Handler, RequestParamHandler } from "express";
import { prisma } from "..";
import { CustomError, presupuestosRequest } from "../interfaces/interfaces";
import { Presupuesto } from "@prisma/client";

type PresupuestoPayload = {
  descripcion: string;
  recepcion_id: number;
  client_id?: number | null;
  estado: string;
  confirmado: boolean;
  materialIds?: number[];
};

const presupuestoInclude = {
  Usuario: {
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      telefono: true,
      cuit: true,
      condicion_iva: true,
      createdAt: true,
      updatedAt: true,
      Rol: true,
    },
  },
  materiales: {
    include: {
      Proveedor: true,
    },
  },
  reparacionesNomencladas: true,
  Recepcion: true,
};

export class Presupuestos {
  static index: Handler = async (req, res, next) => {
    try {
      const presupuestos = await prisma.presupuesto.findMany({
        include: presupuestoInclude,
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(presupuestos);
    } catch (e) {
      next(e);
    } finally {
      prisma.$disconnect();
    }
  };

  static show: Handler = async (req: presupuestosRequest, res, next) => {
    prisma.$disconnect();

    if (!req.Presupuestos) return next(new Error());

    res.json(req.Presupuestos[0]);
  };

  static create: Handler = async (req, res, next) => {
    const data: PresupuestoPayload = req.body;

    if (
      !data.descripcion?.trim() ||
      Number.isNaN(Number(data.recepcion_id)) ||
      !data.estado?.trim()
    ) {
      const err = new CustomError("Faltan datos obligatorios del presupuesto");
      err.name = "400";
      return next(err);
    }

    try {
      const recepcion = await prisma.recepcion.findUnique({
        where: {
          id: Number(data.recepcion_id),
        },
      });

      if (!recepcion) {
        const err = new CustomError("La recepcion seleccionada no existe");
        err.name = "400";
        return next(err);
      }

      const materialIds = Array.isArray(data.materialIds)
        ? data.materialIds.map(Number).filter((id) => !Number.isNaN(id))
        : [];

      if (materialIds.length > 0) {
        const existingMaterials = await prisma.material.findMany({
          where: {
            id: {
              in: materialIds,
            },
          },
          select: {
            id: true,
          },
        });

        if (existingMaterials.length !== materialIds.length) {
          const err = new CustomError("Uno o mas materiales no existen");
          err.name = "400";
          return next(err);
        }
      }

      const presupuesto = await prisma.presupuesto.create({
        data: {
          descripcion: data.descripcion.trim(),
          recepcion_id: Number(data.recepcion_id),
          client_id: data.client_id ? Number(data.client_id) : null,
          estado: data.estado.trim(),
          confirmado: Boolean(data.confirmado),
          materiales: {
            connect: materialIds.map((id) => ({ id })),
          },
        },
        include: presupuestoInclude,
      });

      res.json(presupuesto);
    } catch (e) {
      next(e);
    }
  };

  public static update: Handler = async (req: presupuestosRequest, res, next) => {
    if (!req.Presupuestos) return;

    const old: Presupuesto = req.Presupuestos[0];
    const data: PresupuestoPayload = req.body;

    if (
      !data.descripcion?.trim() ||
      Number.isNaN(Number(data.recepcion_id)) ||
      !data.estado?.trim()
    ) {
      const err = new CustomError("Faltan datos obligatorios del presupuesto");
      err.name = "400";
      return next(err);
    }

    try {
      const recepcion = await prisma.recepcion.findUnique({
        where: {
          id: Number(data.recepcion_id),
        },
      });

      if (!recepcion) {
        const err = new CustomError("La recepcion seleccionada no existe");
        err.name = "400";
        return next(err);
      }

      const materialIds = Array.isArray(data.materialIds)
        ? data.materialIds.map(Number).filter((id) => !Number.isNaN(id))
        : [];

      if (materialIds.length > 0) {
        const existingMaterials = await prisma.material.findMany({
          where: {
            id: {
              in: materialIds,
            },
          },
          select: {
            id: true,
          },
        });

        if (existingMaterials.length !== materialIds.length) {
          const err = new CustomError("Uno o mas materiales no existen");
          err.name = "400";
          return next(err);
        }
      }

      const presupuesto = await prisma.presupuesto.update({
        where: {
          id: old.id,
        },
        data: {
          descripcion: data.descripcion.trim(),
          recepcion_id: Number(data.recepcion_id),
          client_id: data.client_id ? Number(data.client_id) : null,
          estado: data.estado.trim(),
          confirmado: Boolean(data.confirmado),
          materiales: {
            set: materialIds.map((id) => ({ id })),
          },
        },
        include: presupuestoInclude,
      });

      res.json(presupuesto);
    } catch (e) {
      next(e);
    } finally {
      prisma.$disconnect();
    }
  };

  public static delete: Handler = async (req: presupuestosRequest, res, next) => {
    if (!req.Presupuestos) return;

    try {
      await prisma.presupuesto.delete({
        where: {
          id: req.Presupuestos[0].id,
        },
      });

      res.send();
    } catch (e) {
      next(e);
    } finally {
      prisma.$disconnect();
    }
  };

  public static presupuestosRequestHandler: RequestParamHandler = async (
    req: presupuestosRequest,
    res,
    next,
    id
  ) => {
    let presupuesto: Presupuesto | null;
    const validated = parseInt(id);

    if (isNaN(validated)) {
      const err = new CustomError("presupuestoId debe ser int");
      err.name = "400";
      return next(err);
    }

    try {
      presupuesto = await prisma.presupuesto.findUnique({
        where: {
          id: validated,
        },
        include: presupuestoInclude,
      });
    } catch (e) {
      return next(e);
    }

    if (!presupuesto) {
      const err = new CustomError("Presupuesto no encontrado");
      err.name = "404";
      return next(err);
    }

    req.Presupuestos = [presupuesto];
    next();
  };
}
