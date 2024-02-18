const { BlogPost, Comment, User } = require('../../models');

const addPost = async (req, res) => {
  try {
    const { title, contents } = req.body;
    const userId = req.session.user_id;

    // create a new blog post for current User
    const blogPostData = await BlogPost.create({ title, contents, UserId: userId });

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(400).json(err);
  }
};

const viewPost = async (req, res) => {
  try {
    const postId = req.params.id;

    // find a blog post for specific user and any of their comments
    const blogPostData = await BlogPost.findByPk(postId, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(400).json(err);
  }
};

const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.session.user_id;
    const postId = req.params.postId;

    // create a new comment for the specific user and blog post
    const commentData = await Comment.create({ text, UserId: userId, BlogPostId: postId });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { addPost, viewPost, addComment };
