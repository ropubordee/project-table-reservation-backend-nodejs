const prisma = require("../config/prisma");
const {TableStatEnum} = require("@prisma/client")



exports.getTables = async (req, res) => {
  const tables = await prisma.tables.findMany();
  const totalTables = tables.length;
  const responseData = {
    totalTables: totalTables,
    tables: tables 
  };
  res.json({responseData});
};

exports.getTableById = async (req, res) => {
  const { id } = req.params;
  try {
    const table = await prisma.tables.findUnique({
      where: {
        table_id: parseInt(id),
      },
      include: {
        image: true, 
      },
    });
  
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
  
    res.json({ table });
  } catch (error) {
    console.error('Error fetching table details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.uploadImages = async (req, res, next) => {
  try {
    const image = req.files;
    console.log(image)

    if (!image || image.length === 0) {
      return res.status(400).json({ error: 'Invalid or missing image file' });
    }
    const imagePaths = image.map((image) => image.path);
    const data = req.body;
  
    data.capacity = parseInt(data.capacity, 10);
    data.price = parseFloat(data.price, 10);

    // สร้างโต๊ะใหม่และเชื่อมโยงกับสถานะของโต๊ะ
    const rs = await prisma.tables.create({
      data: {
        ...data,
        image: { createMany: { data: imagePaths.map((path) => ({ path })) } },
        tableStatus: {
          create: { tableStatus: data.status }
        }
      },
    });

    res.status(200).json({ message: 'Table created successfully', result: rs });
  } catch (err) {
    next(err);
  }
};

exports.createTable = async (req, res, next) => {
  try {
    const data = req.body;
    data.tableNumber = parseInt(data.tableNumber, 10);
    data.capacity = parseInt(data.capacity, 10);
    const rs = await prisma.tables.create({
      data: { ...data }
    });

    
    res.json({ message: 'Create OK', result: rs });
  } catch (err) {
    next(err);
  }
};

exports.updateTable = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    let updateData = { ...data };
    let imagePaths = [];

    if (req.files) {
      imagePaths = req.files.map((file) => ({ path: file.path }));
    }

    if (imagePaths.length > 0) {
      const existingImages = await prisma.image.findMany({
        where: { table_id: parseInt(id) },
      });

      if (existingImages.length > 0) {
        await prisma.image.deleteMany({
          where: { table_id: parseInt(id) },
        });
      }
      const createdImages = await Promise.all(imagePaths.map(async (path) => {
        return await prisma.Image.create({
          data: {
            path: path.path,
            table_id: +id
          },
        });
      }));
      updateData = {
        ...updateData,
        image: {
          connect: createdImages.map((image) => ({ image_id: image.image_id })),
        },
      };
    }
    const updatedTable = await prisma.tables.update({
      data: {
        ...updateData,
        capacity: parseInt(updateData.capacity),
        price: parseFloat(updateData.price),
        tableStatus : {
          create : {tableStatus : data.status}
        }
      },
      where: { table_id: +id },
    });

    res.json({ msg: 'Update ok', result: updatedTable });
  } catch (err) {
    next(err);
  }
};


exports.deleteTable = async (req, res, next) => {
  const {id} = req.params
  try {
    const rs = await prisma.tables.delete({ where : {table_id : +id}})
    res.json({msg: 'Delete ok', result : rs})
  }catch(err) {
    next(err)
  }
}

exports.uploadImagesTable = async (req,res,next) =>{
  try {
  const {id} = req.params;
  console.log(id)
  const images = await prisma.image.findMany({
    where : {
      table_id : parseInt(id),
    },
    orderBy :{
      createdAt : 'desc',
    }
  })
  console.log(images)
  res.json(images);
  } catch (err) {
    next(err)
  }
}

exports.status = async (req,res,next) => {
  res.json ({status : Object.values(TableStatEnum)})
}






