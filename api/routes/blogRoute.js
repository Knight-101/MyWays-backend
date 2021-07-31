const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const Post = require("../models/Hotel");
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
// //GET hotels by state
// router.get("/list/:state", controller.stateFilter);
// //GET hotels by ratings
// router.get("/list/rating/:rating", controller.rateFilter);

// router.post("/book", verify, controller.book);

module.exports = router;
