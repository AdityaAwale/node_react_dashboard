import User from "../db/models/user.js";

const getAllUsers = async (req, res) => {};
const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(200).json(userExist);

    const newUser = await User.create({
      name,
      email,
      avatar,
    });
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getUserById = async (req, res) => {};
const updateUserById = async (req, res) => {};

export { getAllUsers, createUser, getUserById, updateUserById };
