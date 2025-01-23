const mongoose = require(`mongoose`);
const express = require(`express`);
const { getModeForUsageLocation } = require("typescript");
const JobModel = require("../../model/JobModel");

const JobRouter = express.Router();

JobRouter.get("/", async (req, res) => {
  console.log(`api hit to fetch data`);
  try {
    const fetchedJobs = await JobModel.find();
    return res
      .status(200)
      .json({ message: "Successfully fetched Jobs", data: fetchedJobs });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch Jobs", errMessage: err.message });
  }
});

JobRouter.post("/", async (req, res) => {
  // on the frontend we are making sure entire data is posted to the backend
  const data = req.body;
  try {
    if (!data) {
      return res.status(404).json({ message: "Missing Data to Add Job Post" });
    }
    const newJob = new JobModel(data);
    const newJobAdded = await newJob.save();
    res
      .status(200)
      .json({ message: "Job Posted Successfully", JobPosting: newJobAdded });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to Post Job", errMessage: err.message });
  }
});

JobRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Failed to Provide _id" });
    }
    const deletedJob = await JobModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to delete", errMessage: err.message });
  }
});

module.exports = { JobRouter };
