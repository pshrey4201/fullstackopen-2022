const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(element => {
    sum += element.likes
  })
  return sum
}

const favoriteBlog = (blogs) => {
  var favorite = null
  blogs.forEach(element => {
    if(favorite === null) {
      favorite = element
    } else {
      if(favorite.likes < element.likes) {
        favorite = element
      }
    }
  })
  return favorite
}

const mostBlogs = (blogs) => {
  var authors = {}
  var topAuthor = null
  blogs.forEach(element => {
    if(element.author in authors) {
      authors[element.author] += 1
    } else {
      authors[element.author] = 1
    }
  })

  Object.entries(authors).forEach(([key, value]) => {
    if(topAuthor === null) {
      topAuthor = {
        author: key,
        blogs: value
      }
    } else {
      if(topAuthor.blogs < value) {
        topAuthor = {
          author: key,
          blogs: value
        }
      }
    }
  })

  return topAuthor
}

const mostLikes = (blogs) => {
  var authors = {}
  var mostLiked = null
  blogs.forEach(element => {
    if(element.author in authors) {
      authors[element.author] += element.likes
    } else {
      authors[element.author] = element.likes
    }
  })

  Object.entries(authors).forEach(([key, value]) => {
    if(mostLiked === null) {
      mostLiked = {
        author: key,
        likes: value
      }
    } else {
      if(mostLiked.likes < value) {
        mostLiked = {
          author: key,
          likes: value
        }
      }
    }
  })
  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}