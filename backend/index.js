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
  const imageUrl = data.data.images.original.url;
  return imageUrl;
}
