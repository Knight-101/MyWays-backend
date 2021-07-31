const Blog = require("../models/Blog");
const User = require("../models/User");

exports.getBlogs = async (req, res, next) => {
  try {
    await Blog.find()
      .then((blogs) => {
        res.status(200).json(blogs);
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.createBlog = async (req, res, next) => {
  await User.findOne({ email: req.userEmail })
    .then(async (currentUser) => {
      if (currentUser.permission) {
        const blog = new Blog({
          Title: req.body.newBlog.Title,
          Image: req.body.newBlog.Image,
          Content: req.body.newBlog.Content,
        });
        try {
          await blog.save();

          res.json({ ok: 1 });
        } catch (err) {
          console.log(err);
          res.status(400).send(err);
        }
      } else {
        res.json({ ok: 0 });
      }
      if (!currentUser) {
        res.send("User not found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteBlog = async (req, res, next) => {
  Blog.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
      res.json({ ok: 0, error: err });
    } else {
      res.json({ ok: 1 });
    }
  });
};

exports.getBlogById = async (req, res, next) => {
  await Blog.findOne({ _id: req.params.id })
    .then(async (blog) => {
      if (blog) {
        res.json({ ok: 1, blog: blog });
      } else {
        res.json({ ok: 0 });
        console.log();
      }
      if (!blog) {
        res.send("Blog doesnot exist");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
