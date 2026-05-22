import { visitModel } from "../models/visitModel.js";

export const createVisit = async (req, res) => {
  try {
    const { entryId, phone, visitDate, visitTime } = req.body;

    const visit = await visitModel.create({
      entry: entryId,
      selectedBy: req.userId,
      phone,
      visitDate,
      visitTime,
    });

    return res.status(201).json({
      success: true,
      message: "Visit created",
      visit,
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
    const visits = await visitModel
      .find()
      .populate("entry")
      .populate("selectedBy", "name email")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,

      count: visits.length,

      visits,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

