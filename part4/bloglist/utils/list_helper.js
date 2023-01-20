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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}