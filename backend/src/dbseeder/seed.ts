import { PrismaClient } from "@prisma/client";
import { SD } from "../interfaces/interfaces";
import { createHash } from "node:crypto";

export const prisma = new PrismaClient();

async function seed() {
  let adminRol = await prisma.rol.findUnique({
    where: {
      descripcion: SD.ROLES.ADMIN,
    },
  });

  if (!adminRol) {
    adminRol = await prisma.rol.create({
      data: {
        descripcion: SD.ROLES.ADMIN,
      },
    });
  }

  const requiredRoles = [
    SD.ROLES.CLIENT,
    SD.ROLES.EMPLOYEE,
    SD.ROLES.TECHNICIAN,
    SD.ROLES.ADMINISTRATIVE,
    SD.ROLES.CUSTOMER_SUPPORT,
  ];

  for (const descripcion of requiredRoles) {
    const exists = await prisma.rol.findFirst({
      where: {
        descripcion,
      },
    });

    if (!exists) {
      await prisma.rol.create({
        data: {
          descripcion,
        },
      });
    }
  }

  let adminExists = await prisma.usuario.findFirst({
    where: {
      Rol: {
        descripcion: SD.ROLES.ADMIN,
      },
    },
  });

  if (!adminExists) {
    const hash = createHash("sha256");
    hash.update("admin");
    const password = hash.digest("hex");

    await prisma.usuario.create({
      data: {
        id: 1,
        first_name: "admin",
        last_name: "admin",
        email: "admin@admin.com",
        password,
        telefono: 1111,
        cuit: "admin",
        condicion_iva: "admin",
        rol: adminRol.id_rol,
      },
    });
  }
}

seed()
  .then(() => console.log("Allisgood"))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
