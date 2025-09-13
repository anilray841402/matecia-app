import { MaterialAdda } from "../../models/exhibitor/index.js";

const updateMaterialAdda = async (req, res) => {
  const productSubmissionId = req.params.id;

  const {
    brandName,
    productCategory,
    innovationType,
    productInnovation,
    productSuperior,
    products,
    oldProductImg,
    status,
  } = req.body;

  if (!productSubmissionId) {
    return res.status(400).json({
      success: false,
      message: "Invalid Product ID",
    });
  }

  // ✅ **Check if products old Image exist and are valid JSON**
  let parsedOldProductImg = [];
  if (oldProductImg) {
    try {
      parsedOldProductImg = JSON.parse(oldProductImg);

      if (!Array.isArray(parsedOldProductImg)) {
        throw new Error("Products old Image must be an array");
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid products old Image format. Expected a JSON array.",
      });
    }
  }

  // 🗂️ **Map product images with the file paths from multer**
  const productFiles = [1, 2, 3, 4, 5].map((index) =>
    req.files?.[`productImg${index}`]?.[0]?.filename ??
    parsedOldProductImg?.[index - 1]?.productImg ??
    null
  );

  // ✅ **Check if products exist and are valid JSON**
  let parsedProducts = [];
  if (products) {
    try {
      parsedProducts = JSON.parse(products);

      if (!Array.isArray(parsedProducts)) {
        throw new Error("Products must be an array");
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid products format. Expected a JSON array.",
      });
    }
  }


  // 🗂️ **Attach the file paths to the product array if available**
  const updatedProducts = parsedProducts.map((product, index) => {
    if (productFiles[index]) {
      return { ...product, productImg: productFiles[index] };
    }
    return product;
  });

  try {
    // 📝 **Update only the fields that are provided, don't overwrite the entire object**
    const updateData = {
      brandName,
      productCategory,
      innovationType,
      productInnovation,
      productSuperior,
      status,
    };

    if (updatedProducts.length > 0) {
      updateData.products = updatedProducts;
    }

    const updated = await MaterialAdda.findByIdAndUpdate(
      productSubmissionId,
      updateData,
      { new: true }
    );

    if (!updated) {
      console.log("No data found for the given ID");
      return res.status(404).json({
        success: false,
        message: "Data not found for the given ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: updated, // Send back the updated object for confirmation
    });
  } catch (error) {
    console.error("Error updating MaterialAdda:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while updating the data",
      error: error.message,
    });
  }
};

export default updateMaterialAdda;
