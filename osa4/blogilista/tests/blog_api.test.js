const assert = require('node:assert')
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  }
]

const newBlogs = [
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('returning blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('identifier named as id', async () => {
    const response = await api.get('/api/blogs')

    assert(response.body[0].id)
  })
})

describe('adding blogs', () => {
  test('a valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogs[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    const titles = response.body.map(blog => blog.title)
    assert(titles.includes('Canonical string reduction'))
  })

  test('blog without likes is added with likes = 0', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogs[1])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body.find(blog => blog.title === newBlogs[1].title)
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('blog without title or url is not added', async () => {
    await api
      .post('/api/blogs')
      .send({ author: 'Edsger W. Dijkstra' })
      .expect(400)
  })
})

describe('deleting blogs', () => {
  test('blog is deleted', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)
    
    const titles = blogsAtEnd.body.map(blog => blog.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

describe('updating blogs', () => {
  test('update succeeds with 200 if id valid', async () => {
    const response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]

    const updatedBlog = {
      likes: 100
    }

    const putResponse = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(putResponse.body.likes, 100)
  })

  test('update fails with 404 if blog does not exist', async () => {
    const validNonexistingId = new mongoose.Types.ObjectId().toString()

    const updatedBlog = {
      likes: 5
    }

    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .send(updatedBlog)
      .expect(404)
  })
})

after(async () => {
  console.log('Closing MongoDB connection...')
  await mongoose.connection.close()
  console.log('MongoDB connection closed')
})