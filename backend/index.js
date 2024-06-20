import express from 'express';
import env from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const port = 3000;
const prisma = new PrismaClient();
env.config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());




async function getCardImage(category) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=${category}&rating=g`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const imageData = await response.json();
  const imageUrl = imageData.data.images.original.url;
  return imageUrl;
}



app.get('/boards/:id/cards', async (req, res) => {
  const cards = await prisma.card.findMany();
  res.json(cards);
});

app.get('/boards', async (req, res) => {
  const boards = await prisma.board.findMany();
  res.json(boards);
});

app.post('/boards/:id/cards', async (req, res) => {
    if (!req.body.message|| !req.body.author || !req.body.imageUrl) {
        return res.status(400).send('Enter all required data.')
    }
    else{
    const { imageUrl, message, author } = req.body
    const newCard = await prisma.board.create({
      data: {
        imageUrl,
        message,
        author,
        boardId: {connect: {id: req.params.id}}
      }
    })
    res.json(newCard)
    }
  })

  app.post('/boards', async (req, res) => {
    const { title, category, author } = req.body
    const image_url = await getCardImage(category)
    try{
    const newBoard = await prisma.board.create({
      data: {
        title,
        category,
        author,
        image_url
      }
    })
    res.json(newBoard)
    } catch (err) {
        console.log(err)
        res.status(500).send({err: 'Internal Server Error'})
    }
});

  app.delete('/boards/:id', async (req, res) => {
    const { id } = req.params
    const deletedBoard = await prisma.board.delete({
      where: { id: Number(id) }
    })
    res.json(deletedBoard)
  })

  app.delete('/boards/:id/cards', async (req, res) => {
    const { id } = req.params
    const deletedCard = await prisma.card.delete({
      where: { id: Number(id) }
    })
    res.json(deletedCard)
  })

  app.get('/boards/search/:query', async (req, res) => {
    const { query } = req.params
    const boards = await prisma.board.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive'
        }
    }
    })
    res.json(boards)
  })


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
