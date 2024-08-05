const userService = require('../services/user-service');

exports.updateUserRole = async (req, res, next) => {
  try {
    const { userId, newRole } = req.body;

    if (!userId || !newRole) {
      return res.status(400).json({ error: "userId and newRole are required" });
    }

    if (typeof newRole !== "string") {
      return res.status(400).json({ error: "Invalid input" });
    }

    await userService.updaterole(userId,newRole)

    res.json({ message: "User role updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.gatAllusers = async (req,res,next) =>{

  try {
    const  users = await userService.getAllUsers();
    res.json(users)
  } catch (err) {
    next (err)
  }
}