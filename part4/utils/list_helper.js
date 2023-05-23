const _ = require('lodash')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, post) => sum + post.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  const favorite = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  const countAuthors = _.countBy(blogs, "author")
  const author = Object.keys(countAuthors).reduce((a, b) => {
    return countAuthors[a] > countAuthors[b] ? a : b
  })

  return {
    author: author,
    blogs: countAuthors[author]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
