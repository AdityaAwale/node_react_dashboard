import mongoose from "mongoose";
import Property from "../db/models/property.js";
import User from "../db/models/user.js";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    propertyType = "",
  } = req.query;

  const query = {};
  if (propertyType) {
    query.propertyType = propertyType;
  }
  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }
  try {
    const count = await Property.countDocuments({ query });
    const properties = await Property.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getPropertyDetails = async (req, res) => {
  const { id } = req.params;
  const propertyExists = await Property.findOne({ _id: id }).populate(
    "creator"
  );

  if (propertyExists) {
    return res.status(200).json(propertyExists);
  } else {
    return res.status(404).json({ message: "Property not found" });
  }
};
const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoURL = await cloudinary.uploader.upload(photo);

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoURL.url,
      creator: user._id,
    });
    user.properties.push(newProperty._id);
    await user.save({ session });

    await session.commitTransaction();

    return res.status(201).json({ message: "Property created successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, propertyType, location, price, photo, email } =
      req.body;
    const photoURL = await cloudinary.uploader.upload(photo);

    await Property.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        propertyType,
        location,
        price,
        photo: photoURL.url || photo,
      }
    );
    return res.status(200).json({ message: "Property updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    const propertyToDelete = await Property.findById({ _id: id })
      .session(session)
      .populate("creator");
    if (!propertyToDelete) throw new Error("Property not found");
    propertyToDelete.deleteOne({ session });
    propertyToDelete.creator.properties.pull(propertyToDelete);

    await propertyToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Property deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  getAllProperties,
  getPropertyDetails,
  createProperty,
  updateProperty,
  deleteProperty,
};
