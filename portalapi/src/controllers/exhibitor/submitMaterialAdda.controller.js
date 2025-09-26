import { MaterialAdda } from "../../models/exhibitor/index.js";

const submitMaterialAdda = async (req, res) => {
  const {
    brandName,
    productCategory,
    innovationType,
    productInnovation,
    productSuperior,
    products,
    status,
  } = req.body;

  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }


  if (!brandName || !productCategory || !innovationType) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  const productFiles = [
    req.files['productImg1']?.[0]?.filename ?? null,
    req.files['productImg2']?.[0]?.filename ?? null,
    req.files['productImg3']?.[0]?.filename ?? null,
    req.files['productImg4']?.[0]?.filename ?? null,
    req.files['productImg5']?.[0]?.filename ?? null,
  ];


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
        message: "Invalid products format",
      });
    }
  }

  const updatedProducts = parsedProducts.map((product, index) => {
    if (productFiles[index]) {
      return { ...product, productImg: productFiles[index] };
    }
    return product;
  });

  try {
    const materialAddaProduct = await MaterialAdda.create({
      userId,
      brandName,
      productCategory,
      innovationType,
      productInnovation,
      productSuperior,
      products: updatedProducts,
      status,
    });

    if (!materialAddaProduct) {
      return res.status(404).json({
        success: false,
        message: "Data not submitted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data submitted successfully.",
      data: materialAddaProduct,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting data.",
      error: error.message,
    });
  }
};

export default submitMaterialAdda;
