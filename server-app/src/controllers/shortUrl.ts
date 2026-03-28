import express from "express";
import { urlModel } from "../model/shortUrl";

const normalizeFullUrl = (input: string): string | null => {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const u = new URL(withProtocol);
    if (!u.hostname) return null;
    return u.href;
  } catch {
    return null;
  }
};

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const raw = req.body?.fullUrl;
    if (typeof raw !== "string") {
      res.status(400).json({ message: "fullUrl is required" });
      return;
    }
    const fullUrl = normalizeFullUrl(raw);
    if (!fullUrl) {
      res.status(400).json({ message: "Invalid URL" });
      return;
    }
    const existing = await urlModel.findOne({ fullUrl });
    if (existing) {
      res.status(200).json(existing);
      return;
    }
    const shortUrl = await urlModel.create({ fullUrl });
    res.status(201).json(shortUrl);
  } catch (error) {
    console.error("createUrl:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await urlModel.find().sort({ createdAt: -1 });
    if (shortUrls.length === 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(shortUrls);
  } catch (error) {
    console.error("getAllUrl:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) {
      res.status(404).json({ message: "Short URL not found" });
      return;
    }
    shortUrl.clicks += 1;
    await shortUrl.save();
    res.redirect(shortUrl.fullUrl);
  } catch (error) {
    console.error("getUrl:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deleted = await urlModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "URL not found" });
      return;
    }
    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error("deleteUrl:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
