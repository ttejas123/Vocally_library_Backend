import { PrismaClient } from '@prisma/client';
import logger from '../logger.mjs';
const prisma = new PrismaClient();

class BookControllerClass {
    async getAll(req, res) {
        try {
            const book = await prisma.book.findMany({
                include: {
                    students: true
                }
            })
            logger.info("Fetch All Book Data");
            res.status(200).json(book);
        } catch (e) {
            logger.error("Failed to Fetch Book Data from DB");
            res.status(500).json({msg: "Failed to Fetch Data from DB"});
        }
    }

    async getById(req, res) {
        try{
            const { id } = req.params;
            const book = await prisma.book.findUnique({
                where: { id },
                include: {
                    students: true,
                    _count: true
                }
            });
            if (!book) {
                logger.warn(`Book not found: ${id}`);
                return res.status(404).json({ error: 'Book not found' });
            }
            logger.info(`Feched Book: ${id}`);
            res.status(200).json(book);
        } catch (err) {
            logger.error("Failed to fetch Book");
            res.status(500).json({msg: "Failed to fetch Book"})
        }
    }

    async create(req, res) {
        const { name, author } = req.body;
        console.log(req.body)
        try {
            const book = await prisma.book.create({
                data: { name, author },
            });
            logger.info(`New Book is Added to Database with name: ${name}`);
            res.status(201).json(book);
        } catch(e) {
            logger.error("Failed to Add Book");
            res.status(500).json({msg: "Failed to Add Book"})
        }
    }

    async delete(req, res) {
        try{
            const { id } = req.params;
            const bookData = await prisma.book.delete({ where: { id: id } });
            logger.warn(`Deleted Book: ${bookData.name}`);
            res.sendStatus(204);
        } catch(e) {
            logger.error("Failed to Delete Book");
            res.status(500).json({msg: "Failed to Delete Book"})
        }
    }
}

const BookController = new BookControllerClass();

export default BookController;
