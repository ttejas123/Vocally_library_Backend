import { PrismaClient } from '@prisma/client';
import logger from '../logger.mjs';
import hashPassword from '../Utils/cryto.mjs';
const prisma = new PrismaClient();

class StudentController {
  // Get all students
  async getAll(req, res) {
    try {
        const students = await prisma.student.findMany({
            include:{
                books: true
            }
        });
        logger.info("Fetch All Student Data");
        res.status(200).json(students);
    } catch (e) {
        logger.error("Failed to Fetch Student Data from DB");
        res.status(500).json({msg: "Failed to Fetch Data from DB"});
    }
  }

  // Get a specific student by ID
  async getById(req, res) {
    const id = req.params.id;
    try{
        const student = await prisma.student.findUnique({
            where: { id },
            include: {
                books: true
            }
        });
        if (student) {
            logger.info("Fetch All Student Data");
            res.status(200).json(student);
        } else {
            logger.warn(`Student with ID ${id} not found`);
            res.status(404).json({ msg: `Student with ID ${id} not found` });
        }
    } catch(e) {
        logger.error("Failed to retrive desier Student!");
        res.status(500).json({msg: "Failed to retrive desier Student!"});
    }
  }

  // Create a new student
  async create(req, res, next) {
    const { name, email, password } = req.body;
    try {

        const passwordHash = await hashPassword(password)
        const Student = await prisma.student.create({
                data:{
                    email: email,
                    name: name,
                    password: passwordHash
                }
        })
        logger.info(`New Student is Register with email: ${email}`);
        next();
    } catch(e) {
        logger.error("Failed to Register Student");
        res.status(500).json({msg: "Failed to Register Student"})
    }
  }

  // Update an existing student
  async update(req, res) {
    try{
      const id = req.params.id;
      const { name, email } = req.body;
      const student = await prisma.student.update({
        where: { id },
        data: { name, email }
      });
      console.log(student)
      if (student) {
        logger.info(`Fetched Student with ID ${id}`);
        res.json(student);
      } else {
        logger.warn(`Student with ID ${id} not found`);
        res.status(404).json({ message: `Student with ID ${id} not found` });
      }
    } catch (e) {
      logger.error("Failed to Update Student Account");
      res.status(500).json({msg: "Failed to Updated Student Account"})
    }
  }

  // Delete an existing student
  async delete(req, res) {
    try{
        const { id } = req.params;
        const StudentAccountData = await prisma.student.delete({ where: { id: id } });
        logger.warn(`Deleted Student: ${StudentAccountData.name}`);
        res.sendStatus(204);
    } catch(e) {
        logger.error("Failed to Delete Student Account");
        res.status(500).json({msg: "Failed to Delete Student Account"})
    }
  }

  // Add book to the existing student
  async pushBooktoStudentAccount(req, res) {
    const id = req.params.id;
    const bookId = req.body.bookId;
    try{
        const book = await prisma.book.findUnique({
            where: {
                id: bookId
            }
        })

        if(!book) {
            logger.warn("Incorrect Book Id is Provided");
            return res.status(404).json({msg: "Incorrect Book iD is Provided"});
        }

        const studentBooks = await prisma.student.findFirst({
            where: { id },
            select:{
                books: true
            }
        });
        const preBooks = studentBooks.books.map((val, index) => {
            return {id: val.id}
        })

        const student = await prisma.student.update({
            where: { id },
            data: {
                books: {
                    set: [...preBooks, {id: bookId}]
                }
            },
            include: {
                books: true
            }
        });
        logger.info(`New Book Add to Student Account: ${student.email}`);
        res.status(200).json({student})
    } catch(e) {
        logger.error(`Failed to Add book to Student Account ${id}`);
        res.status(500).json({msg: "Failed to Add Book to the Student account"})
    }
  }

  //remove book from student book list
  async removeBookfromStudentAccount(req, res) {
    const id = req.params.id;
    const bookId = req.body.bookId;
    try{
        const book = await prisma.book.findUnique({
            where: {
                id: bookId
            }
        })

        if(!book) {
            logger.warn("Incorrect Book Id is Provided");
            return res.status(404).json({msg: "Incorrect Book iD is Provided"});
        }

        const studentBooks = await prisma.student.findFirst({
            where: { id },
            select:{
                books: true
            }
        });

        const filterListOfBooks = [];
        studentBooks.books.map((val, index) => {
            if(val.id !== bookId){
                filterListOfBooks.push({
                  id: val.id
                })
            }
        })

        const student = await prisma.student.update({
            where: { id },
            data: {
                books: {
                    set: [...filterListOfBooks]
                }
            },
            include: {
                books: true
            }
        });
        logger.info(`Book is Successfully removed from Student Account: ${student.email}`);
        res.status(200).json({student})
    } catch(e) {
        logger.error(`Failed to remove book to Student Account ${id}`);
        res.status(500).json({msg: "Failed to remove Book to the Student account"})
    }
  }
}

const studentController = new StudentController();

export default studentController;