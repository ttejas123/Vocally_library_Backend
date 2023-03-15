import jwt from "jsonwebtoken"
import { PrismaClient } from '@prisma/client'
import hashPassword from "../Utils/cryto.mjs";
import { logAuthenticationSuccess, logAuthenticationFailure, logAuthorizationSuccess } from "../logger.mjs";
const prisma = new PrismaClient()
const secretKey = "mysecretkey";

class AuthController {
  constructor(){
  }

  async register(req, res, next) {
    const { email, password } = req.body;
    try {
      const Student = await prisma.student.findFirst({
        where: {
          email: email
        }
      });

      const passwordHash = await hashPassword(password)

      if (!Student || Student.password !== passwordHash) {
        const error = new Error('Student not found');
        error.status = 404;
        throw error;
      }

      const token = jwt.sign({ StudentId: Student.id }, secretKey);
      Student.token = token;
      req.Student = Student;
      logAuthenticationSuccess(Student);
      res.status(201).json(Student)
    } catch (error) {
      logAuthenticationFailure({email}, "User Not Register with this mail or password is wrong!")
      res.status(500).send({ message: 'Error logging in' });
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const Student = await prisma.student.findFirst({
        where: {
          email: email
        }
      });

      const passwordHash = await hashPassword(password)

      if (!Student || Student.password !== passwordHash) {
        const error = new Error('Student not found');
        error.status = 404;
        throw error;
      }

      const token = jwt.sign({ StudentId: Student.id }, secretKey);
      Student.token = token;
      req.Student = Student;
      logAuthenticationSuccess(Student);
      next()
    } catch (error) {
      logAuthenticationFailure({email}, "User Not Register with this mail or password is wrong!")
      res.status(500).send({ message: 'Error logging in' });
    }
  }

  verifyToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
      logAuthenticationFailure({email: ""}, "Unauthorized")
      return res.status(401).send({ message: 'Unauthorized' });
    }

    token = token.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, secretKey);
      req.userId = decoded.userId;
      logAuthorizationSuccess(decoded);
      next();
    } catch (error) {
      logAuthenticationFailure({email: ""}, "Unauthorized")
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }
}

const AuthControllerInstance = new AuthController();

export default AuthControllerInstance;