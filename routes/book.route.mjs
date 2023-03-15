import AuthControllerInstance from "../Controller/auth.controllers.mjs";
import BookController from "../Controller/book.controllers.mjs";
import express from "express";

class studentRoutesClass {
    constructor(router){
        this.router = router; 
        this.router.get("/", AuthControllerInstance.verifyToken, BookController.getAll);
        this.router.get("/:id", AuthControllerInstance.verifyToken, BookController.getById);
        this.router.post("/", AuthControllerInstance.verifyToken, BookController.create);
        this.router.delete("/:id", AuthControllerInstance.verifyToken, BookController.delete);
    }
}

const StudentRoutes = new studentRoutesClass(express.Router());

export default StudentRoutes.router;