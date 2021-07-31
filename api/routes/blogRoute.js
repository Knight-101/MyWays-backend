const express = require("express");
const router = express.Router();
const User = require("../models/User");
const controller = require("../controllers/blog.controller");
const verify = require("../verifyToken");

//GET all blogs
router.get("/list", controller.getBlogs);
//GET blog by id
router.get("/:id", controller.getBlogById);
// create blog
router.post("/createblog", verify, controller.createBlog);
// delete blog
router.delete("/deleteblog/:id", verify, controller.deleteBlog);

module.exports = router;
