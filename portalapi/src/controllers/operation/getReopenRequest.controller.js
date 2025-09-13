import { ReOpenRequest } from "../../models/exhibitor/index.js";

const getReopenRequest = async (req, res) => {

  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {

    const reopen = await ReOpenRequest.aggregate([
      {
        $match: { status: 2 }
      },
      {
        $lookup: {
          from: 'exhibitordetails',        // exact collection name in MongoDB (should be lowercase)
          localField: 'userId',               // field in users collection
          foreignField: 'userId',          // field in exhibitordetails collection
          as: 'details'                    // alias for joined data
        }
      },
      {
        $unwind: {
          path: '$details',
          preserveNullAndEmptyArrays: true // keep users even if they don't have details
        }
      },
    ]);

    if (!reopen) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully here",
      data: reopen,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching data",
      error: error.message,
    });
  }

};

export default getReopenRequest;
