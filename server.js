// const dns = require("dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");

// const app = express();

// /* MODELS */

// const ApplyForm = require("./models/ApplyForm");
// const CandidateProfile = require("./models/CandidateProfile");
// const CompanyProfile = require("./models/CompanyProfile");
// const InterviewForm = require("./models/InterviewForm");
// const JobPost = require("./models/JobPost");

// app.use(express.json());
// app.use(cors());

// connectDB();

// /* HOME */

// app.get("/", (req, res) => {
//   res.send("LearnGo API Running");
// });

// /* ================================================= */
// /* ================= APPLY FORM API ================= */
// /* ================================================= */

// app.get("/api/ApplyForm", async (req, res) => {
//   const forms = await ApplyForm.find();
//   res.json(forms);
// });

// app.post("/api/ApplyForm", async (req, res) => {
//   const newForm = new ApplyForm(req.body);
//   await newForm.save();
//   res.json(newForm);
// });

// app.delete("/api/ApplyForm/:id", async (req, res) => {
//   await ApplyForm.findByIdAndDelete(req.params.id);
//   res.json({ message: "Application Deleted" });
// });

// /* ================================================= */
// /* ============ CANDIDATE PROFILE API ============== */
// /* ================================================= */

// app.get("/api/CandidateProfile", async (req, res) => {
//   const candidates = await CandidateProfile.find();
//   res.json(candidates);
// });

// app.post("/api/CandidateProfile", async (req, res) => {
//   const candidate = new CandidateProfile(req.body);
//   await candidate.save();
//   res.json(candidate);
// });

// app.delete("/api/CandidateProfile/:id", async (req, res) => {
//   await CandidateProfile.findByIdAndDelete(req.params.id);
//   res.json({ message: "Candidate Deleted" });
// });

// /* ================================================= */
// /* ============ COMPANY PROFILE API ================ */
// /* ================================================= */

// app.get("/api/CompanyProfile", async (req, res) => {
//   const companies = await CompanyProfile.find();
//   res.json(companies);
// });

// app.post("/api/CompanyProfile", async (req, res) => {
//   const company = new CompanyProfile(req.body);
//   await company.save();
//   res.json(company);
// });

// app.delete("/api/CompanyProfile/:id", async (req, res) => {
//   await CompanyProfile.findByIdAndDelete(req.params.id);
//   res.json({ message: "Company Deleted" });
// });

// /* ================================================= */
// /* ============ INTERVIEW FORM API ================= */
// /* ================================================= */

// app.get("/api/InterviewForm", async (req, res) => {
//   const interviews = await InterviewForm.find();
//   res.json(interviews);
// });

// app.post("/api/InterviewForm", async (req, res) => {
//   const interview = new InterviewForm(req.body);
//   await interview.save();
//   res.json(interview);
// });

// app.delete("/api/InterviewForm/:id", async (req, res) => {
//   await InterviewForm.findByIdAndDelete(req.params.id);
//   res.json({ message: "Interview Deleted" });
// });

// /* ================================================= */
// /* ================= JOB POST API ================== */
// /* ================================================= */

// app.get("/api/JobPost", async (req, res) => {
//   const jobs = await JobPost.find();
//   res.json(jobs);
// });

// app.post("/api/JobPost", async (req, res) => {
//   const job = new JobPost(req.body);
//   await job.save();
//   res.json(job);
// });

// app.delete("/api/JobPost/:id", async (req, res) => {
//   await JobPost.findByIdAndDelete(req.params.id);
//   res.json({ message: "Job Deleted" });
// });

// /* ================= SERVER ================= */

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

/* MODELS */
const User = require("./models/RegisterComp");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const ApplyForm = require("./models/ApplyForm");
const CandidateProfile = require("./models/CandidateProfile");
const CompanyProfile = require("./models/CompanyProfile");
const InterviewForm = require("./models/InterviewForm");
const JobPost = require("./models/JobPost");
const ContactFeedback = require("./models/ContactFeedback");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

/* ================= MIDDLEWARE ================= */
// ✅ VERIFY TOKEN MIDDLEWARE
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader); // DEBUG

  if (!authHeader) {
    return res.status(401).json({ message: "No token header" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secretkey");

    console.log("DECODED USER:", decoded); // DEBUG

    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

const uploadsDir = path.join(__dirname, "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use("/uploads", express.static(uploadsDir));
app.use((req, res, next) => {
  console.log("API HIT:", req.method, req.url);
  next();
});

connectDB();

/* HOME */
app.get("/", (req, res) => {
  res.send("JOBSEEK API Running");
});

/* ================================================= */
/* ================= APPLY FORM API ================= */
/* ================================================= */

app.get("/api/ApplyForm", async (req, res) => {
  const forms = await ApplyForm.find();
  res.json(forms);
});

app.post("/api/ApplyForm", async (req, res) => {
  const newForm = new ApplyForm(req.body);
  await newForm.save();
  res.json(newForm);
});

// ✅ UPDATE
app.put("/api/ApplyForm/:id", async (req, res) => {
  try {
    const updated = await ApplyForm.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/ApplyForm/:id", async (req, res) => {
  await ApplyForm.findByIdAndDelete(req.params.id);
  res.json({ message: "Application Deleted" });
});

/* ================================================= */
/* ================= CONTACT US API ================ */
/* ================================================= */

app.post("/api/contactfeedback", async (req, res) => {
  try {
    const feedback = await ContactFeedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/contactfeedback", async (req, res) => {
  try {
    const feedback = await ContactFeedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/contactfeedback/:id", async (req, res) => {
  try {
    const updated = await ContactFeedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/contactfeedback/:id", async (req, res) => {
  try {
    await ContactFeedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================================================= */
/* ============ CANDIDATE PROFILE API ============== */
/* ================================================= */

// app.get("/api/CandidateProfile", async (req, res) => {
//   const candidates = await CandidateProfile.find();
//   res.json(candidates);
// });

// app.post("/api/CandidateProfile", async (req, res) => {
//   const candidate = new CandidateProfile(req.body);
//   await candidate.save();
//   res.json(candidate);
// });

// // ✅ UPDATE
// app.put("/api/CandidateProfile/:id", async (req, res) => {
//   try {
//     const updated = await CandidateProfile.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true },
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.delete("/api/CandidateProfile/:id", async (req, res) => {
//   await CandidateProfile.findByIdAndDelete(req.params.id);
//   res.json({ message: "Candidate Deleted" });
// });

/* ================================================= */
/* ============ COMPANY PROFILE API ================ */
/* ================================================= */

// app.get("/api/CompanyProfile", async (req, res) => {
//   const companies = await CompanyProfile.find();
//   res.json(companies);
// });

// app.post("/api/CompanyProfile", async (req, res) => {
//   console.log("REQ BODY:", req.body);
//   const company = new CompanyProfile(req.body);
//   await company.save();
//   res.json(company);
// });

// // ✅ UPDATE
// app.put("/api/CompanyProfile/:id", async (req, res) => {
//   try {
//     const updated = await CompanyProfile.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true },
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.delete("/api/CompanyProfile/:id", async (req, res) => {
//   await CompanyProfile.findByIdAndDelete(req.params.id);
//   res.json({ message: "Company Deleted" });
// });

/* ================================================= */
/* ============ INTERVIEW FORM API ================= */
/* ================================================= */

app.get("/api/InterviewForm", async (req, res) => {
  const interviews = await InterviewForm.find();
  res.json(interviews);
});

app.post("/api/InterviewForm", async (req, res) => {
  const interview = new InterviewForm(req.body);
  await interview.save();
  res.json(interview);
});

// ✅ UPDATE
app.put("/api/InterviewForm/:id", async (req, res) => {
  try {
    const updated = await InterviewForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/InterviewForm/:id", async (req, res) => {
  await InterviewForm.findByIdAndDelete(req.params.id);
  res.json({ message: "Interview Deleted" });
});

/* ================================================= */
/* ================= JOB POST API ================== */
/* ================================================= */

app.get("/api/JobPost", async (req, res) => {
  const jobs = await JobPost.find();
  res.json(jobs);
});

app.post("/api/JobPost", async (req, res) => {
  const job = new JobPost(req.body);
  await job.save();
  res.json(job);
});

// ✅ UPDATE
app.put("/api/JobPost/:id", async (req, res) => {
  try {
    const updated = await JobPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/JobPost/:id", async (req, res) => {
  await JobPost.findByIdAndDelete(req.params.id);
  res.json({ message: "Job Deleted" });
});

/* ================================================= */
/* ================= AUTH API ======================= */
/* ================================================= */

// ✅ REGISTER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role, phone, dob, website } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (role === "jobseeker") {
      await CandidateProfile.create({
        userId: user._id,
        phone,
        dob,
      });
    }
    if (role === "recruiter") {
      await CompanyProfile.create({
        companyId: user._id,
        website,
      });
    }

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });
    console.log("FOUND USER:", user);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ================= CANDIDATE PROFILE ROUTES ================= */

app.post(
  "/api/candidateprofile",
  verifyToken,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "documents", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("USER:", req.user);
    console.log("BODY: ", req.body);
    try {
      const existingProfile = await CandidateProfile.findOne({
        userId: req.user.id,
      });

      const payload = {
        ...req.body,
        resume: req.files?.resume?.[0]?.filename || req.body.resume || "",
        documents:
          req.files?.documents?.[0]?.filename || req.body.documents || "",
      };

      if (existingProfile) {
        const updatedProfile = await CandidateProfile.findOneAndUpdate(
          { userId: req.user.id },
          payload,
          { new: true },
        );

        return res.json(updatedProfile);
      }

      const profile = new CandidateProfile({
        ...payload,
        userId: req.user.id,
      });

      await profile.save();

      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// view own profile
app.get("/api/candidateprofile", verifyToken, async (req, res) => {
  try {
    console.log("FTECH PROFILE - USER:", req.user.id);
    const profile = await CandidateProfile.findOne({
      userId: req.user.id,
    });

    console.log("FETCHED PROFILE:", profile);
    res.json(profile);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET profile by companyId (URL param)
app.get("/api/candidateprofile/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("FETCH PROFILE BY ID:", userId);

    const profile = await CandidateProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Candidate profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// edit own profile
app.put(
  "/api/candidateprofile/:userId",
  verifyToken,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "documents", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (String(req.user.id) !== String(req.params.userId)) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const existingProfile = await CandidateProfile.findOne({
        userId: req.params.userId,
      });

      const payload = {
        ...req.body,
        resume:
          req.files?.resume?.[0]?.filename ||
          req.body.resume ||
          existingProfile?.resume ||
          "",
        documents:
          req.files?.documents?.[0]?.filename ||
          req.body.documents ||
          existingProfile?.documents ||
          "",
      };

      const updated = await CandidateProfile.findOneAndUpdate(
        { userId: req.params.userId },
        payload,
        { new: true, upsert: false },
      );
      res.json(updated);
    } catch (error) {
      res.status(500).json(error);
    }
  },
);

// delete own profile
app.delete("/api/candidateprofile/:userId", verifyToken, async (req, res) => {
  try {
    await CandidateProfile.deleteOne({ userId: req.user.id });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

/* ================= COMPANY PROFILE ROUTES ================= */

// add profile
// app.post("/api/companyprofile", verifyToken, async (req, res) => {
//   try {
//     console.log("🔥 USER:", req.user);
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     let profile = await CompanyProfile.findOne({
//       companyId: req.user.id,
//     });

//     if (profile) {
//       profile = await CompanyProfile.findOneAndUpdate(
//         { companyId: req.user.id },
//         { ...req.body, companyId: req.user.id }, // 🔥 FIX
//         { new: true },
//       );
//     } else {
//       profile = new CompanyProfile({
//         ...req.body,
//         companyId: req.user.id, // 🔥 ENSURE THIS ALWAYS EXISTS
//         status: "pending",
//       });

//       await profile.save();
//     }

//     res.json(profile);
//   } catch (error) {
//     console.log("ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

app.post("/api/companyprofile", verifyToken, async (req, res) => {
  try {
    const existingProfile = await CompanyProfile.findOne({
      companyId: req.user.id,
    });

    if (existingProfile) {
      const updatedProfile = await CompanyProfile.findOneAndUpdate(
        { companyId: req.user.id },
        req.body,
        { new: true },
      );

      return res.json(updatedProfile);
    }

    const profile = new CompanyProfile({
      ...req.body,
      companyId: req.user.id,
    });

    await profile.save();

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// view own profile
app.get("/api/companyprofile", verifyToken, async (req, res) => {
  try {
    console.log("FTECH PROFILE - USER:", req.user.id);
    const profile = await CompanyProfile.findOne({
      companyId: req.user.id,
    });

    console.log("FETCHED PROFILE:", profile);
    res.json(profile);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET profile by companyId (URL param)
app.get("/api/companyprofile/:companyId", verifyToken, async (req, res) => {
  try {
    const { companyId } = req.params;

    console.log("FETCH PROFILE BY ID:", companyId);

    if (String(req.user.id) !== String(companyId)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const profile = await CompanyProfile.findOne({ companyId });

    if (!profile) {
      return res.status(404).json({ message: "Company profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// edit own profile
app.put("/api/companyprofile/:companyId", verifyToken, async (req, res) => {
  try {
    if (String(req.user.id) !== String(req.params.companyId)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await CompanyProfile.findOneAndUpdate(
      { companyId: req.params.companyId },
      req.body,
      { new: true, upsert: false },
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete own profile
app.delete("/api/companyprofile/:companyId", verifyToken, async (req, res) => {
  try {
    if (String(req.user.id) !== String(req.params.companyId)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await CompanyProfile.deleteOne({ companyId: req.user.id });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// admin views all candidate profiles
app.get("/api/admin/candidateprofiles", async (req, res) => {
  try {
    const profiles = await CandidateProfile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// admin views all company profiles
app.get("/api/admin/companyprofiles", async (req, res) => {
  try {
    const profiles = await CompanyProfile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// company views candidate profiles, optionally filtered by qualification/skills
app.get("/api/company/candidateprofiles", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const search = (req.query.search || "").trim();
    const filter = search
      ? {
          $or: [
            { qualification: { $regex: search, $options: "i" } },
            { skills: { $regex: search, $options: "i" } },
            { experience: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const profiles = await CandidateProfile.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    const normalizedProfiles = await Promise.all(
      profiles.map(async (profile) => {
        const latestApplication = await ApplyForm.findOne({
          userId: profile.userId,
        })
          .sort({ createdAt: -1 })
          .lean();

        const profileResumePath = profile.resume
          ? path.join(uploadsDir, profile.resume)
          : "";
        const profileDocumentPath = profile.documents
          ? path.join(uploadsDir, profile.documents)
          : "";
        const applicationResumePath = latestApplication?.uploadRes
          ? path.join(uploadsDir, latestApplication.uploadRes)
          : "";
        const applicationDocumentPath = latestApplication?.anyDoc
          ? path.join(uploadsDir, latestApplication.anyDoc)
          : "";

        const resolvedResume = fs.existsSync(profileResumePath)
          ? profile.resume
          : fs.existsSync(applicationResumePath)
            ? latestApplication.uploadRes
            : "";

        const resolvedDocument = fs.existsSync(profileDocumentPath)
          ? profile.documents
          : fs.existsSync(applicationDocumentPath)
            ? latestApplication.anyDoc
            : "";

        return {
          ...profile,
          resume: resolvedResume || profile.resume || "",
          documents: resolvedDocument || profile.documents || "",
          resumeUrl: resolvedResume ? `/uploads/${resolvedResume}` : "",
          documentUrl: resolvedDocument ? `/uploads/${resolvedDocument}` : "",
        };
      }),
    );

    res.json(normalizedProfiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// admin views registered candidates
app.get("/api/admin/candidateregisters", async (req, res) => {
  try {
    const users = await User.find({ role: "jobseeker" })
      .sort({ createdAt: -1 })
      .lean();

    const rows = await Promise.all(
      users.map(async (user) => {
        const profile = await CandidateProfile.findOne({
          userId: user._id,
        }).lean();

        return {
          _id: user._id,
          fname: user.name || profile?.fname || "",
          email: user.email || profile?.email || "",
          phone: profile?.phone || "",
          dob: profile?.dob || "",
          password: user.password || "",
          repasswd: "",
        };
      }),
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// admin views registered companies
app.get("/api/admin/companyregisters", async (req, res) => {
  try {
    const users = await User.find({ role: "recruiter" })
      .sort({ createdAt: -1 })
      .lean();

    const rows = await Promise.all(
      users.map(async (user) => {
        const profile = await CompanyProfile.findOne({
          companyId: user._id,
        }).lean();

        return {
          _id: user._id,
          cname: profile?.cname || user.name || "",
          cemail: profile?.cemail || user.email || "",
          website: profile?.website || "",
          cpassword: user.password || "",
          repasswd: "",
        };
      }),
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= JOB ROUTES ================= */

/* ================= JOB ROUTES ================= */

const getCompanyName = async (companyId) => {
  const companyProfile = await CompanyProfile.findOne({ companyId });
  if (companyProfile?.cname) {
    return companyProfile.cname;
  }

  const recruiter = await User.findById(companyId);
  return recruiter?.name || "";
};

// company adds job -> always pending first
app.post("/api/jobs", verifyToken, async (req, res) => {
  try {
    const companyName = await getCompanyName(req.user.id);

    const job = new JobPost({
      ...req.body,
      companyId: req.user.id,
      company: req.body.company || companyName,
      status: "pending",
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.log("CREATE JOB ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// company sees its own jobs with their current status
app.get("/api/jobs/company", verifyToken, async (req, res) => {
  try {
    const companyJobs = await JobPost.find({ companyId: req.user.id })
      .sort({
        createdAt: -1,
      })
      .lean();

    const companyName = await getCompanyName(req.user.id);
    const hydratedJobs = companyJobs.map((job) => ({
      ...job,
      company: job.company || companyName,
    }));

    res.json(hydratedJobs);
  } catch (error) {
    console.log("FETCH COMPANY JOBS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// company updates its own job -> goes back to pending
app.put("/api/jobs/:jid", verifyToken, async (req, res) => {
  try {
    const companyName = await getCompanyName(req.user.id);

    const updatedJob = await JobPost.findOneAndUpdate(
      { _jid: req.params.jid, companyId: req.user.id },
      {
        ...req.body,
        company: req.body.company || companyName,
        status: "pending",
      },
      { new: true },
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (error) {
    console.log("UPDATE JOB ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// company deletes its own job
app.delete("/api/jobs/:jid", verifyToken, async (req, res) => {
  try {
    const deletedJob = await JobPost.findOneAndDelete({
      _jid: req.params.jid,
      companyId: req.user.id,
    });

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log("DELETE JOB ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// admin sees all jobs, including pending/rejected/approved
app.get("/api/jobs/admin/all", async (req, res) => {
  try {
    const allJobs = await JobPost.find().sort({ createdAt: -1 }).lean();

    const hydratedJobs = await Promise.all(
      allJobs.map(async (job) => ({
        ...job,
        company: job.company || (await getCompanyName(job.companyId)),
      })),
    );

    res.json(hydratedJobs);
  } catch (error) {
    console.log("FETCH ALL JOBS FOR ADMIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// admin approves / rejects
// this is left open because your admin page is using a frontend-only hardcoded login.
// later, if you add real admin auth, protect this route properly.
app.put("/api/jobs/admin/:jid", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedJob = await JobPost.findOneAndUpdate(
      { _jid: req.params.jid },
      { status },
      { new: true },
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (error) {
    console.log("ADMIN UPDATE JOB STATUS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// candidates/jobseekers see only approved jobs
// app.get("/api/jobs", async (req, res) => {
//   try {
//     const approvedJobs = await JobPost.find({ status: "approved" })
//       .sort({
//         createdAt: -1,
//       })
//       .lean();

//     const hydratedJobs = await Promise.all(
//       approvedJobs.map(async (job) => ({
//         ...job,
//         company: job.company || (await getCompanyName(job.companyId)),
//       })),
//     );

//     res.json(hydratedJobs);
//   } catch (error) {
//     console.log("FETCH APPROVED JOBS ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

app.get("/api/jobs", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const approvedJobs = await JobPost.find({
      status: "approved",
      lastDate: { $gte: today },
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    const hydratedJobs = await Promise.all(
      approvedJobs.map(async (job) => ({
        ...job,
        company: job.company || (await getCompanyName(job.companyId)),
      })),
    );

    res.json(hydratedJobs);
  } catch (error) {
    console.log("FETCH APPROVED JOBS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/* ================= APPLICATION ROUTES ================= */

// candidate applies
app.post(
  "/api/applications",
  upload.fields([
    { name: "Resume", maxCount: 1 },
    { name: "AnyOtherDocument", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const data = req.body;
      if (!data.jobId || !data.companyId || !data.userId) {
        return res.status(400).json({
          message: "Job ID, Company ID and Candidate ID are required",
        });
      }

      const appData = new ApplyForm({
        ...data,
        userId: data.userId,
        companyId: data.companyId,
        jobId: data.jobId,
        uploadRes: req.files?.Resume ? req.files.Resume[0].filename : "",
        anyDoc: req.files?.AnyOtherDocument
          ? req.files.AnyOtherDocument[0].filename
          : "",
      });

      const saved = await appData.save();
      res.json(saved);
    } catch (error) {
      console.log("Application Error:", error);
      res.status(500).json(error);
    }
  },
);

// company views only applications on its jobs
app.get("/api/applications/company", verifyToken, async (req, res) => {
  try {
    const apps = await ApplyForm.find({
      companyId: req.user.id,
    }).sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json(error);
  }
});

// candidate views own applications and current status
app.get("/api/applications/candidate/my", verifyToken, async (req, res) => {
  try {
    const apps = await ApplyForm.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json(error);
  }
});

// fetch one application for company interview scheduling
app.get("/api/applications/:id", verifyToken, async (req, res) => {
  try {
    const appData = await ApplyForm.findById(req.params.id);

    if (!appData) {
      return res.status(404).json({ message: "Application not found" });
    }

    const isOwner =
      String(appData.companyId) === String(req.user.id) ||
      String(appData.userId) === String(req.user.id);

    if (!isOwner) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(appData);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/api/applications/status/:id", verifyToken, async (req, res) => {
  try {
    const appData = await ApplyForm.findById(req.params.id);

    if (!appData) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (String(appData.companyId) !== String(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const nextStatus = req.body.status;
    if (!["pending", "selected", "rejected"].includes(nextStatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await ApplyForm.findByIdAndUpdate(
      req.params.id,
      { status: nextStatus },
      { new: true },
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* ================= CANDIDATE PROFILE ROUTES ================= */

app.get("/api/candidateprofile/:candidateId", async (req, res) => {
  try {
    const profile = await CandidateProfile.findOne({
      userId: req.params.candidateId,
    });
    res.json(profile);
  } catch (error) {
    console.log("Candidate Profile Error:", error);
    res.status(500).json(error);
  }
});

/* ================= INTERVIEW ================= */

app.post("/api/interview", verifyToken, async (req, res) => {
  try {
    const application = await ApplyForm.findById(req.body.applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (String(application.companyId) !== String(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const payload = {
      companyId: req.user.id,
      userId: application.userId,
      jobId: application.jobId,
      applicationId: application._id,
      cname: req.body.cname || application.cname,
      intDate: req.body.intDate,
      intTime: req.body.intTime,
      intPlace: req.body.intPlace,
      candidateName:
        req.body.candidateName || `${application.fname} ${application.lname}`,
      apPos: req.body.apPos || application.apPos,
      selection: req.body.selection || "selected",
      interviewResult: "pending",
      remarks: "",
    };

    const existingInterview = await InterviewForm.findOne({
      applicationId: application._id,
    });

    const interview = await InterviewForm.findOneAndUpdate(
      { applicationId: application._id },
      {
        ...payload,
        interviewResult: existingInterview?.interviewResult || "pending",
        remarks: existingInterview?.remarks || "",
      },
      { new: true, upsert: true },
    );

    await ApplyForm.findByIdAndUpdate(application._id, { status: "selected" });

    res.json(interview);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get(
  "/api/interview/application/:applicationId",
  verifyToken,
  async (req, res) => {
    try {
      const interview = await InterviewForm.findOne({
        applicationId: req.params.applicationId,
      });

      if (!interview) {
        return res.status(404).json({ message: "Interview not found" });
      }

      if (String(interview.companyId) !== String(req.user.id)) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      res.json(interview);
    } catch (error) {
      res.status(500).json(error);
    }
  },
);

app.put(
  "/api/interview/:applicationId/result",
  verifyToken,
  async (req, res) => {
    try {
      const interview = await InterviewForm.findOne({
        applicationId: req.params.applicationId,
      });

      if (!interview) {
        return res.status(404).json({ message: "Interview not found" });
      }

      if (String(interview.companyId) !== String(req.user.id)) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const nextResult = req.body.interviewResult || "pending";

      if (!["pending", "selected", "rejected"].includes(nextResult)) {
        return res.status(400).json({ message: "Invalid interview result" });
      }

      const updatedInterview = await InterviewForm.findOneAndUpdate(
        { applicationId: req.params.applicationId },
        {
          interviewResult: nextResult,
          remarks: req.body.remarks || "",
        },
        { new: true },
      );

      res.json(updatedInterview);
    } catch (error) {
      res.status(500).json(error);
    }
  },
);

app.get("/api/interview/candidate", verifyToken, async (req, res) => {
  try {
    const interviews = await InterviewForm.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(interviews);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
