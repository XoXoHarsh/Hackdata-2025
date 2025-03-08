import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Item } from "../models/item.model.js";
import { User } from "../models/user.model.js";
import fs from "fs";

const addItem = async (req, res) => {
  try {
    const filePath = req.file?.path;

    if (!filePath) {
      return res.status(400).json(new ApiError(400, "No file path received"));
    }

    const new_item = new Item({
      name: req.file.filename,
      owner: req.user._id,
      path: filePath,
    });

    const result = await new_item.save();
    if (!result) {
      return res
        .status(400)
        .json(new ApiError(400, "item not added to database"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, result, " item added successfully"));
  } catch (error) {
    console.error("error while adding item: ", error);

    return res
      .status(500)
      .json(
        new ApiError(500, "Internal Server Error occured while adding item")
      );
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user._id });
    return res
      .status(200)
      .json(new ApiResponse(200, items, "Items fetched successfully"));
  } catch (error) {
    console.error("error while fetching items: ", error);

    return res
      .status(500)
      .json(
        new ApiError(500, "Internal Server Error occurred while fetching items")
      );
  }
};

const deleteItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    const itemToDelete = await Item.findById(itemId);

    if (!itemToDelete) {
      return res
        .status(404)
        .json(new ApiError(404, `Item with id ${itemId} not found`));
    }

    fs.unlinkSync(itemToDelete.path);

    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res
        .status(404)
        .json(new ApiError(404, `Item with id ${itemId} not found`));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, deletedItem, "Item deleted successfully"));
  } catch (error) {
    console.error("error while deleting item: ", error);

    return res
      .status(500)
      .json(
        new ApiError(500, "Internal Server Error occurred while deleting item")
      );
  }
};

export { addItem, getItems, deleteItem };
