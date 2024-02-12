const prisma = require("../config/prisma");

exports.getUserById = (id) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
};

exports.getUserByEmail = (email,password,phone) => {
  return prisma.user.findFirst({
    where: {
      email,
      password
    },
  });
};

exports.createUser = (firstname,lastname,email, password,phone,gender) => {
  return prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password,
      phone,
      gender
    },
  });
};

exports.updaterole = (userId,newRole) =>{
  return  prisma.user.update({
    where: {
      id: parseInt(userId)
    },
    data: {
      role: newRole
    }
  });
}