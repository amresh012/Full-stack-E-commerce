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
  const blogs = await Blogs.find().sort({createdAt: 'desc'});
  res.json(blogs);
});

const deleteblogs = asyncHandle(async (req, res) => {
  if (req.body._id) {
    const { _id } = req.body;
    try {
      const deletedBlog = await Blogs.findByIdAndDelete({ _id });
      if(deletedBlog){
        res.json({success: true, message: "Deleted Sucessfully"});
      }
      res.json({success: false, message: "Blog doesn't exist"});
    } catch (error) {
      res.json(error.message);
    }
  } else {
    res.json("invalid Operation");
  }
});
const updateblog = asyncHandle(async (req, res) => {
  if (req.body._id) {
    const { _id } = req.body;
    const dta = {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    }
    try {
      const updateblog = await Blogs.findByIdAndUpdate({_id},dta);
      res.json({message:"Blog updated Sucessfully.",success:true})
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else res.status(500).send("invalid Operation");
});

const getBlog = asyncHandle(async (req, res)=>{
  if(req.params.id){
    const {id} = req.params;
    const blog = await Blogs.findById(id);
    if(blog){
      res.json({
        success: true,
        ...blog._doc
      })
    }
    else{
      res.json({
        success: false,
        message: "Blog doesn't exist."
      })
    }
  }
  else{
    res.json("invalid operation");
  }
})

module.exports = {
  addBlog,
  getallblogs,
  deleteblogs,
  updateblog,
  getBlog
};
