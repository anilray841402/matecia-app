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
        $match: { role: 'user' } 
      },
      {
        $lookup: {
          from: 'exhibitordetails',        
          localField: '_id',               
          foreignField: 'userId',          
          as: 'details'                 
        }
      },
      {
        $lookup: {
          from: 'boothdesigns',        
          localField: '_id',           
          foreignField: 'userId',         
          as: 'boothdesign'           
        }
      },
      {
        $lookup: {
          from: 'powerorders',        
          localField: '_id',               
          foreignField: 'userId',         
          as: 'powerorder'            
        }
      },
      {
        $unwind: {
          path: '$details',
          preserveNullAndEmptyArrays: true 
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
