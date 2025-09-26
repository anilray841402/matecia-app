import { BoothDesign } from "../../models/exhibitor/index.js";



const getBoothDesign = async (req, res) => {

  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {

    const boothDesign = await BoothDesign.aggregate([
      {
        $lookup: {
          from: 'exhibitordetails',     
          localField: 'userId',              
          foreignField: 'userId',        
          as: 'details'                   
        }
      },
      {
        $unwind: {
          path: '$details',
          preserveNullAndEmptyArrays: true 
        }
      },
    ]);

    if (!boothDesign) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully here",
      data: boothDesign,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching data",
      error: error.message,
    });
  }

};

export default getBoothDesign;
