import User from "../../models/user.model.js";


const getExhibitors = async (req, res) => {

  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {

    const exhibitors = await User.aggregate([
      {
        $match: { role: 'user' } // Filter only users with role 'user'
      },
      {
        $lookup: {
          from: 'exhibitordetails',        // exact collection name in MongoDB (should be lowercase)
          localField: '_id',               // field in users collection
          foreignField: 'userId',          // field in exhibitordetails collection
          as: 'details'                    // alias for joined data
        }
      },
      {
        $lookup: {
          from: 'boothdesigns',        // exact collection name in MongoDB (should be lowercase)
          localField: '_id',               // field in users collection
          foreignField: 'userId',          // field in exhibitordetails collection
          as: 'boothdesign'                    // alias for joined data
        }
      },
      {
        $lookup: {
          from: 'powerorders',        // exact collection name in MongoDB (should be lowercase)
          localField: '_id',               // field in users collection
          foreignField: 'userId',          // field in exhibitordetails collection
          as: 'powerorder'                    // alias for joined data
        }
      },
      {
        $unwind: {
          path: '$details',
          preserveNullAndEmptyArrays: true // keep users even if they don't have details
        }
      },
      {
        $unwind: {
          path: '$boothdesign',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$powerorder',
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    if (!exhibitors) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully here",
      data: exhibitors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching data",
      error: error.message,
    });
  }

};

export default getExhibitors;
