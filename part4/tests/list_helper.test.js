const listHelper = require('../utils/list_helper')
const blogsList = require('./blog_list')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
});

describe('Total likes', () => {
  test('when list has zweo blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogsList.zeroBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogsList.oneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogsList.manyBlogs)
    expect(result).toBe(36)
  })
})

describe('Most liked blog', () => {
  test('which one of blogs is most liked', () => {
    const result = listHelper.favoriteBlog(blogsList.manyBlogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})
