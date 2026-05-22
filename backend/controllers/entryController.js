import { entryModel } from "../models/entryModel.js";

export const createEntry = async (req, res) => {
  try {
    const { pharmacy, contact, person, status, remark, area } = req.body;
    const entry = await entryModel.create({
      pharmacy,
      contact,
      person,
      status,
      remarks: [
        {
          text: remark,
        },
      ],
      area,
      user: req.userId,
    });
    return res.status(201).json({
      success: true,
      message: "Entry created successfully",
      entry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const getEntries = async (req, res) => {
  try {
    const entries = await entryModel
      .find({
        user: req.userId,
      })
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: entries.length,
      entries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;
    const entry = await entryModel.findOne({
      _id: id,
      user: req.userId,
    });
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found or unauthorized",
      });
    }
    entry.status = status || entry.status;
    if (remark && remark.trim()) {
      entry.remarks.unshift({ text: remark });
      entry.remarks = entry.remarks.slice(0, 4);
    }
    const updatedEntry = await entry.save();
    return res.status(200).json({
      success: true,
      message: "Entry updated successfully",
      updatedEntry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
