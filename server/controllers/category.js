import Category from "../models/Category.js";

/* CREATE */
export const createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const categories = await Category.find({ name: name });
    if (categories.length > 0)
      return res
        .status(401)
        .json({ message: "Category with this name already exists." });
    const newCategory = new Category({
      name,
      icon,
    });
    await newCategory.save();
    const category = await Category.find();
    res.status(201).json(category);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    category.delete();
    res.status(200).json(category);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
