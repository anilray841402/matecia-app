import User from "../../models/user.model.js";


const getVendors = async (req, res) => {

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
        $match: { role: 'vendor' } // Filter only users with role 'user'
      },
      {
        $lookup: {
          from: 'vendordetails',       
          localField: '_id',              
          foreignField: 'userId',          
          as: 'details'                   
        }
      },
      {
        $unwind: {
          path: '$details',
          preserveNullAndEmptyArrays: true // keep users even if they don't have details
        }
      },
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

export default getVendors;
