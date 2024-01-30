const prisma = require("../config/prisma");

exports.getTables = async (req, res) => {
  const tables = await prisma.table.findMany();
  res.json(tables);
};

exports.reserveTable = async (req, res) => {
  const { tableId } = req.params;
  const updatedTable = await prisma.table.update({
    where: { id: parseInt(tableId) },
    data: { isReserved: true },
  });
  res.json(updatedTable);
};





