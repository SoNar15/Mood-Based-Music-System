// controllers/photoController.js
export const handlePhotoUpload = (req, res) => {
  // ML model will analyze later
  console.log("📸 Photo analysis requested.");
  res.json({ mood: "happy" }); // dummy
};
