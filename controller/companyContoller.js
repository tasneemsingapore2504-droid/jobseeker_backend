// const CompanyProfile = require("../models/CompanyProfile");

// // ================= CREATE / UPDATE =================
// exports.saveCompanyProfile = async (req, res) => {
//   try {
//     console.log("REQ.USER:", req.user); // 🔥 debug

//     const companyId = req.user.id;

//     const profile = await CompanyProfile.findOneAndUpdate(
//       { companyId },
//       {
//         ...req.body,
//         companyId,
//         status: "pending",
//       },
//       {
//         new: true,
//         upsert: true,
//       },
//     );

//     res.status(200).json({
//       message: "Profile saved successfully",
//       profile,
//     });
//   } catch (error) {
//     console.log("Save Profile Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ================= GET =================
// exports.getMyCompanyProfile = async (req, res) => {
//   try {
//     const profile = await CompanyProfile.findOne({
//       companyId: req.user.id,
//     });

//     res.status(200).json(profile);
//   } catch (error) {
//     console.log("Get Profile Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ================= DELETE =================
// exports.deleteCompanyProfile = async (req, res) => {
//   try {
//     await CompanyProfile.deleteOne({
//       companyId: req.user.id,
//     });

//     res.status(200).json({
//       message: "Profile deleted",
//     });
//   } catch (error) {
//     console.log("Delete Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
