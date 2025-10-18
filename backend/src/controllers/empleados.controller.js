const Empleado = require('../models/Empleado');

const empleadoCtrl = {};

// GET /api/empleados
empleadoCtrl.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find().lean();
    res.json(empleados);
  } catch (e) {
    res.status(500).json({ error: 'Error al listar empleados' });
  }
};

// POST /api/empleados
empleadoCtrl.createEmpleado = async (req, res) => {
  try {
    const { nombre, cargo, departamento, sueldo } = req.body;
    const empleado = new Empleado({ nombre, cargo, departamento, sueldo });
    await empleado.save();
    res.json({ status: 'Datos guardados' });
  } catch (e) {
    res.status(400).json({ error: 'No se pudo crear el empleado' });
  }
};

// GET /api/empleados/:id
empleadoCtrl.getEmpleado = async (req, res) => {
  try {
    const doc = await Empleado.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ error: 'No encontrado' });
    res.json(doc);
  } catch {
    res.status(400).json({ error: 'ID inválido' });
  }
};

// PUT /api/empleados/:id
empleadoCtrl.editEmpleado = async (req, res) => {
  try {
    const { nombre, cargo, departamento, sueldo } = req.body;
    await Empleado.findByIdAndUpdate(
      req.params.id,
      { $set: { nombre, cargo, departamento, sueldo } },
      { new: true }
    );
    res.json({ status: 'Datos actualizados' });
  } catch {
    res.status(400).json({ error: 'No se pudo actualizar' });
  }
};

// DELETE /api/empleados/:id
empleadoCtrl.deleteEmpleado = async (req, res) => {
  try {
    await Empleado.findByIdAndDelete(req.params.id);
    res.json({ status: 'Empleado ha sido removido' });
  } catch {
    res.status(400).json({ error: 'No se pudo eliminar' });
  }
};

module.exports = empleadoCtrl;
