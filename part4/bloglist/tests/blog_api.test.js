const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

test('there is a blog from Michael Chan', async () => {
  const response = await api.get('/api/blogs')
  const authors = response.body.map(r => r.author)

  expect(authors).toContain('Michael Chan')
})

test('unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(value => {
    expect(value.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'React patterns 2',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 6,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)

  const titles = response.body.map(r => r.title)
  expect(titles).toContain(newBlog.title)
})

test('missing likes defaults to 0', async () => {
  const newBlog = {
    title: 'React Patterns 3',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)

  expect(response.body[initialBlogs.length].likes).toBe(0)
})

test('missing title or url', async () => {
  const missingTitle = {
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 9
  }

  const missingUrl = {
    title: 'Missing Title',
    author: 'Michael Chan',
    likes: 9,
  }

  await api
    .post('/api/blogs')
    .send(missingTitle)
    .expect(400)

  let response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)

  await api
    .post('/api/blogs')
    .send(missingUrl)
    .expect(400)

  response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('deleting a blog', async () => {
  await api
    .delete('/api/blogs/5a422a851b54a676234d17f7')
    .expect(204)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length - 1)

  const ids = response.body.map(r => r.id)
  expect(ids).not.toContain('5a422a851b54a676234d17f7')
})

test('updating a blog title', async () => {
  let response = await api
    .put('/api/blogs/5a422a851b54a676234d17f7')
    .send({
      title: 'blah'
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.title).toBe('blah')

  response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)

  response.body.forEach(value => {
    if(value.id === '5a422a851b54a676234d17f7') {
      expect(value.title).toBe('blah')
    }
  })
})

test('updating a blog author', async () => {
  let response = await api
    .put('/api/blogs/5a422a851b54a676234d17f7')
    .send({
      author: 'blah'
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.author).toBe('blah')

  response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)

  response.body.forEach(value => {
    if(value.id === '5a422a851b54a676234d17f7') {
      expect(value.author).toBe('blah')
    }
  })
})

test('updating a blog url', async () => {
  let response = await api
    .put('/api/blogs/5a422a851b54a676234d17f7')
    .send({
      url: 'blah'
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.url).toBe('blah')

  response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)

  response.body.forEach(value => {
    if(value.id === '5a422a851b54a676234d17f7') {
      expect(value.url).toBe('blah')
    }
  })
})

test('updating a blog likes', async () => {
  let response = await api
    .put('/api/blogs/5a422a851b54a676234d17f7')
    .send({
      likes: 244
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(244)

  response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)

  response.body.forEach(value => {
    if(value.id === '5a422a851b54a676234d17f7') {
      expect(value.likes).toBe(244)
    }
  })
})

afterAll(() => {
  mongoose.connection.close()
})