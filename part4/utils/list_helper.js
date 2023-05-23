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
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
