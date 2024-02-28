const prisma = require("../config/prisma");

exports.getTables = async (req, res) => {
  const tables = await prisma.tables.findMany();
  const totalTables = tables.length;
  const responseData = {
    totalTables: totalTables,
    tables: tables 
  };
  res.json({responseData});
};

exports.createTable = async (req,res,next) =>{
  const data = req.body
  console.log(req.body)
  try {
    const rs = await prisma.tables.create({
      data : {...data}
    })
    res.json({message: "Create OK",result : rs})
  } catch (err) {
    next(err)
  }
}

exports.updateTable = async (req, res, next) => {
  const {id} = req.params
  const data = req.body
  try {
    const rs = await prisma.tables.update({
      data :  {...data},
      where: { table_id : +id } 
    });
    res.json({msg: 'Update ok', result: rs})
  }catch(err){
    next(err)
  }
}
exports.deleteTable = async (req, res, next) => {
  const {id} = req.params
  try {
    const rs = await prisma.tables.delete({ where : {table_id : +id}})
    res.json({msg: 'Delete ok', result : rs})
  }catch(err) {
    next(err)
  }
}





