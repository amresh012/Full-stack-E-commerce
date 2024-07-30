const asyncHandle = require("express-async-handler");
const Blogs = require("../models/blogModel");
const addBlog = asyncHandle(async (req, res) => {
  const blog = req.body;
  const alreadyavail = await Blogs.findOne({ title: blog.title });
  if (alreadyavail) {
    try {
      const updateblog = await Blogs.findOneAndUpdate(
        { title: blog.title },
        blog
      );
      res.json(updateblog);
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  } else {
    try {
      const newblog = await Blogs.create(blog);
      res.json(newblog);
    } catch (error) {
      if (error.message.includes("duplicate")) {
        res
          .status(500)
          .send(
            `Entered ${
              error.message.split("{")[1].split(":")[0]
            } is already registered`
          );
      } else {
        res.status(500).send(error.message);
      }
    }
  }
});

const getallblogs = asyncHandle(async (req, res) => {
  const blogs = await Blogs.find();
  res.json(blogs);
});

const deleteblogs = asyncHandle(async (req, res) => {
  if (req.body._id) {
    const { _id } = req.body;
    try {
      await Blogs.findByIdAndDelete({ _id });
      res.json("Deleted Sucessfully");
    } catch (error) {
      res.json(error.message);
    }
  } else {
    res.json("invalid Operation");
  }
});
const updateblog = asyncHandle(async (req, res) => {
  console.log(req.body)
  if (req.body._id) {
    const { _id } = req.body;
    const dta = {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    }
    try {
      const updateblog = await Blogs.findByIdAndUpdate({_id},dta)
      res.json({message:"Blog is updated Sucessfully.",data:updateblog,sucsess:true})
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else res.status(500).send("invalid Operation");
});

module.exports = {
  addBlog,
  getallblogs,
  deleteblogs,
  updateblog,
};
