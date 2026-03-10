const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

/* MODELS */

const ApplyForm = require("./models/ApplyForm");
const CandidateProfile = require("./models/CandidateProfile");
const CompanyProfile = require("./models/CompanyProfile");
const InterviewForm = require("./models/InterviewForm");
const JobPost = require("./models/JobPost");

app.use(express.json());
app.use(cors());

connectDB();

/* HOME */

app.get("/", (req, res) => {
  res.send("LearnGo API Running");
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

app.delete("/api/ApplyForm/:id", async (req, res) => {
  await ApplyForm.findByIdAndDelete(req.params.id);
  res.json({ message: "Application Deleted" });
});

/* ================================================= */
/* ============ CANDIDATE PROFILE API ============== */
/* ================================================= */

app.get("/api/CandidateProfile", async (req, res) => {
  const candidates = await CandidateProfile.find();
  res.json(candidates);
});

app.post("/api/CandidateProfile", async (req, res) => {
  const candidate = new CandidateProfile(req.body);
  await candidate.save();
  res.json(candidate);
});

app.delete("/api/CandidateProfile/:id", async (req, res) => {
  await CandidateProfile.findByIdAndDelete(req.params.id);
  res.json({ message: "Candidate Deleted" });
});

/* ================================================= */
/* ============ COMPANY PROFILE API ================ */
/* ================================================= */

app.get("/api/CompanyProfile", async (req, res) => {
  const companies = await CompanyProfile.find();
  res.json(companies);
});

app.post("/api/CompanyProfile", async (req, res) => {
  const company = new CompanyProfile(req.body);
  await company.save();
  res.json(company);
});

app.delete("/api/CompanyProfile/:id", async (req, res) => {
  await CompanyProfile.findByIdAndDelete(req.params.id);
  res.json({ message: "Company Deleted" });
});

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

app.delete("/api/JobPost/:id", async (req, res) => {
  await JobPost.findByIdAndDelete(req.params.id);
  res.json({ message: "Job Deleted" });
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
