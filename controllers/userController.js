const { User } = require("../models");
const { Op } = require("sequelize");

const userAttributes = ["id", "nombre", "email", "edad"];

const normalizeUserData = (body = {}) => {
  const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  const edadRaw = body.edad;

  let edad = null;
  if (edadRaw !== undefined && edadRaw !== null && edadRaw !== "") {
    edad = Number(edadRaw);
  }

  return { nombre, email, edad };
};

const validateUserData = ({ nombre, email, edad }) => {
  if (!nombre || !email || edad === null) {
    return "Todos los campos son obligatorios";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "El email no tiene un formato válido";
  }

  if (!Number.isInteger(edad) || edad < 0) {
    return "La edad debe ser un número entero mayor o igual a 0";
  }

  return null;
};

const isValidId = (id) => {
  const numericId = Number(id);
  return Number.isInteger(numericId) && numericId > 0;
};

const toPlain = (model) => {
  if (!model) return null;
  return model.get({ plain: true });
};

const wantsJson = (req) => {
  return req.is("application/json");
};

const renderUsers = async (req, res) => {
  try {
    const usersDb = await User.findAll({
      attributes: userAttributes,
      order: [["id", "ASC"]],
    });

    const users = usersDb.map((user) => toPlain(user));

    return res.render("users/index", {
      titulo: "Lista de usuarios",
      users,
    });
  } catch (error) {
    console.error("Error en renderUsers:", error);
    return res.status(500).send("No se pudieron obtener los usuarios");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: userAttributes,
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      status: "success",
      message: "Usuarios obtenidos correctamente",
      data: users,
    });
  } catch (error) {
    console.error("Error en getUsers:", error);

    return res.status(500).json({
      status: "error",
      message: "Error al obtener usuarios",
      data: null,
    });
  }
};

const showCreateForm = (req, res) => {
  return res.render("users/create", {
    titulo: "Crear usuario",
    user: {},
  });
};

const createUser = async (req, res) => {
  try {
    const userData = normalizeUserData(req.body);
    const validationError = validateUserData(userData);

    if (validationError) {
      if (wantsJson(req)) {
        return res.status(400).json({
          status: "error",
          message: validationError,
          data: null,
        });
      }

      return res.status(400).render("users/create", {
        titulo: "Crear usuario",
        error: validationError,
        user: userData,
      });
    }

    const existingUser = await User.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      if (wantsJson(req)) {
        return res.status(409).json({
          status: "error",
          message: "El email ya está registrado",
          data: null,
        });
      }

      return res.status(409).render("users/create", {
        titulo: "Crear usuario",
        error: "El email ya está registrado",
        user: userData,
      });
    }

    const newUser = await User.create(userData);

    const createdUser = await User.findByPk(newUser.id, {
      attributes: userAttributes,
    });

    if (wantsJson(req)) {
      return res.status(201).json({
        status: "success",
        message: "Usuario creado correctamente",
        data: createdUser,
      });
    }

    return res.redirect("/usuarios/vista");
  } catch (error) {
    console.error("Error en createUser:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      if (wantsJson(req)) {
        return res.status(409).json({
          status: "error",
          message: "El email ya está registrado",
          data: null,
        });
      }

      return res.status(409).render("users/create", {
        titulo: "Crear usuario",
        error: "El email ya está registrado",
        user: normalizeUserData(req.body),
      });
    }

    if (wantsJson(req)) {
      return res.status(500).json({
        status: "error",
        message: "Error al crear usuario",
        data: null,
      });
    }

    return res.status(500).render("users/create", {
      titulo: "Crear usuario",
      error: "Error al crear usuario",
      user: normalizeUserData(req.body),
    });
  }
};

const showEditForm = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).send("ID de usuario inválido");
    }

    const userDb = await User.findByPk(id, {
      attributes: userAttributes,
    });

    if (!userDb) {
      return res.status(404).send("Usuario no encontrado");
    }

    const user = toPlain(userDb);

    return res.render("users/edit", {
      titulo: "Editar usuario",
      user,
    });
  } catch (error) {
    console.error("Error en showEditForm:", error);
    return res.status(500).send("Error al cargar usuario");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      if (wantsJson(req)) {
        return res.status(400).json({
          status: "error",
          message: "ID de usuario inválido",
          data: null,
        });
      }

      return res.status(400).send("ID de usuario inválido");
    }

    const userDb = await User.findByPk(id);

    if (!userDb) {
      if (wantsJson(req)) {
        return res.status(404).json({
          status: "error",
          message: "Usuario no encontrado",
          data: null,
        });
      }

      return res.status(404).send("Usuario no encontrado");
    }

    const userData = normalizeUserData(req.body);
    const validationError = validateUserData(userData);

    if (validationError) {
      if (wantsJson(req)) {
        return res.status(400).json({
          status: "error",
          message: validationError,
          data: null,
        });
      }

      return res.status(400).render("users/edit", {
        titulo: "Editar usuario",
        error: validationError,
        user: { id: userDb.id, ...userData },
      });
    }

    const existingUser = await User.findOne({
      where: {
        email: userData.email,
        id: { [Op.ne]: userDb.id },
      },
    });

    if (existingUser) {
      if (wantsJson(req)) {
        return res.status(409).json({
          status: "error",
          message: "El email ya está registrado",
          data: null,
        });
      }

      return res.status(409).render("users/edit", {
        titulo: "Editar usuario",
        error: "El email ya está registrado",
        user: { id: userDb.id, ...userData },
      });
    }

    await userDb.update(userData);

    const updatedUser = await User.findByPk(id, {
      attributes: userAttributes,
    });

    if (wantsJson(req)) {
      return res.status(200).json({
        status: "success",
        message: "Usuario actualizado correctamente",
        data: updatedUser,
      });
    }

    return res.redirect("/usuarios/vista");
  } catch (error) {
    console.error("Error en updateUser:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      if (wantsJson(req)) {
        return res.status(409).json({
          status: "error",
          message: "El email ya está registrado",
          data: null,
        });
      }

      return res.status(409).render("users/edit", {
        titulo: "Editar usuario",
        error: "El email ya está registrado",
        user: { id: req.params.id, ...normalizeUserData(req.body) },
      });
    }

    if (wantsJson(req)) {
      return res.status(500).json({
        status: "error",
        message: "Error al actualizar usuario",
        data: null,
      });
    }

    return res.status(500).render("users/edit", {
      titulo: "Editar usuario",
      error: "Error al actualizar usuario",
      user: { id: req.params.id, ...normalizeUserData(req.body) },
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      if (wantsJson(req)) {
        return res.status(400).json({
          status: "error",
          message: "ID de usuario inválido",
          data: null,
        });
      }

      return res.status(400).send("ID de usuario inválido");
    }

    const user = await User.findByPk(id);

    if (!user) {
      if (wantsJson(req)) {
        return res.status(404).json({
          status: "error",
          message: "Usuario no encontrado",
          data: null,
        });
      }

      return res.status(404).send("Usuario no encontrado");
    }

    await user.destroy();

    if (wantsJson(req)) {
      return res.status(200).json({
        status: "success",
        message: "Usuario eliminado correctamente",
        data: null,
      });
    }

    return res.redirect("/usuarios/vista");
  } catch (error) {
    console.error("Error en deleteUser:", error);

    if (wantsJson(req)) {
      return res.status(500).json({
        status: "error",
        message: "Error al eliminar usuario",
        data: null,
      });
    }

    return res.status(500).send("Error al eliminar usuario");
  }
};

module.exports = {
  renderUsers,
  getUsers,
  showCreateForm,
  createUser,
  showEditForm,
  updateUser,
  deleteUser,
};