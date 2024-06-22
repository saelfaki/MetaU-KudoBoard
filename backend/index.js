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


app.get('/boards/:id/:category/cards/:id/comments', async (req, res) => {
  const cardId = req.params.cardId;

  const comments = await prisma.comment.findMany({
    where: { cardId: parseInt(cardId) },
  });
  console.log(comments)
  res.json(comments);
});

app.post('/boards/:id/:category/cards/:cardId/comments', async (req, res) => {
  console.log(req)
  const cardId = req.params.cardId;
  const comment = req.body.comment;
  const newComment = await prisma.comment.create({
    data: {
      message: comment,
      card: { connect: { id: parseInt(cardId) } }
    },
  });
  res.json(newComment);
});



app.get('/boards/:id/cards', async (req, res) => {
  const boardId  = req.params.id
  const cards = await prisma.card.findMany({where: {boardID: parseInt(boardId)}})
  console.log("were inside of cards");
  res.json(cards);
});

app.get('/boards', async (req, res) => {
  const boards = await prisma.board.findMany();
  res.json(boards);
});

app.post('/boards/:id/cards', async (req, res) => {
    if (!req.body.message) {
        return res.status(400).send('Enter all required data.')
    }
    else{
      const { message, author, boardId, likeCount } = req.body
      const cardBoard = await prisma.board.findUnique({
        where: {id: parseInt(boardId)},
      })
    const image_url = await getCardImage(category)
    const newCard = await prisma.card.create({
      data: {
        image_url,
        message,
        author,
        board: {connect:{id: parseInt(boardId)}},
        likeCount: 0
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
    const boardId  = req.params.id
    console.log(boardId);
    const deleteCards = await prisma.card.deleteMany({where: {boardID: parseInt(boardId)}})
    const deletedBoard = await prisma.board.delete({
      where: { id: parseInt(boardId) }
    })
    res.json(deletedBoard)
  })

  app.delete('/boards/:id/cards/:cardId', async (req, res) => {
    const cardId  = parseInt(req.params.cardId)
    await prisma.comment.deleteMany({where: {cardId}})
    const deletedCard = await prisma.card.delete({
      where: { id: parseInt(cardId) }
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
