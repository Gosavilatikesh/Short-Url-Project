import express from "express";
import generateCode from "../utils/generateCode.js";
import urlModel from "../models/url.model.js";

const router = express.Router();

router.post("/", async function (req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "Please enter a URL",
    });
  }

  if (
    url.startsWith("http://") == false &&
    url.startsWith("https://") == false
  ) {
    return res.status(400).json({
      error: "Please enter a valid URL starting with http:// or https://",
    });
  }

  if (url.length > 2048) {
    return res.status(400).json({
      error: "URL is too long",
    });
  }

  const code = generateCode();

  const newUrl = await urlModel.create({
    originalUrl: url,
    shortCode: code,
  });
  return res.status(201).json({
    message: "URL shortned successfully",
    data: {
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
    },
  });
});

router.get("/", async function (req, res) {
  const urls = await urlModel.find();
  return res.status(200).json({
    message: "URL fetched successfully",
    data: {
      urls,
    },
  });
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params

  const url = await urlModel.findByI(id);
  
  if (!url) {
    return res.status(404).json({
      message: "URL not found",
    });
  }

  await urlModel.findByIdAndDelete(id)

  return res.status(200).json({
    message:"URL deleted successfully"
  })

});

export default router;
