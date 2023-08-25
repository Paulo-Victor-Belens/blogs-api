const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategorySchema = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  }, {
    timestamps: false,
    tableName: 'PostCategory',
    underscored: true,    
  });

  PostCategorySchema.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategorySchema,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategorySchema,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategorySchema;
};

module.exports = PostCategorySchema;