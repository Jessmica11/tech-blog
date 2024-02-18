// require the related models
const { BlogPost, User } = require('../../models');

const getHomepage = async (req, res) => {
  try {
    // Retrieve a list of recent blog posts with associated users
    const recentBlogPosts = await BlogPost.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json(recentBlogPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getHomepage };
