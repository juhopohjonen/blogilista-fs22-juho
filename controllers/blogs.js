const blogsRouter = require('express').Router()
const app = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/', (request, response) => {

    const title = request.body.title
    const author = request.body.author
    const url = request.body.url
    const likes = request.body.likes != undefined ? request.body.likes : 0

    if (title === undefined || url === undefined) {
      response.status(400).end()
    }

    else {

      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: likes
      })
    
      blog
        .save()
        .then(result => {
          response.status(201).json(result)
        })
      }
  })

blogsRouter.delete('/:id', async (request, response, next) => {

  const id = request.params.id

  try {
    await Blog.deleteOne({_id: id})
    response.send('ok')
  } catch (e)
  {
    next(e)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

    
  try {
    const newBlog = {
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updatedBlog)
  } catch (e) {
    next(e)
  }




})

module.exports = blogsRouter