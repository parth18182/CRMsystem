import { entryModel } from "../models/entryModel.js";
import { visitModel } from "../models/visitModel.js";

export const getAllEntries = async (req, res) => {
  try {
    const entries = await entryModel
      .find()
      .populate("user", "name email")
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

export const getAllVisits = async (req, res) => {
  try {
    const visits = await visitModel.find().populate("entry", "pharmacy area status").populate("selectedBy", "name email").sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: visits.length,
      visits,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const updateVisitStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { visitStatus } = req.body;
    const updatedVisit = await visitModel
      .findByIdAndUpdate(id, { visitStatus },
        {
          new: true,
        })
      .populate("entry")
      .populate("selectedBy", "name");
    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found",
      });
    }
    return res.status(200).json({
      success: true,
      visit: updatedVisit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
