import AuthControllerInstance from "../Controller/auth.controllers.mjs";
import studentController from "../Controller/student.controllers.mjs";
import express from "express";

class studentRoutesClass {
    constructor(router){
        this.router = router; 
        this.router.get("/", AuthControllerInstance.verifyToken, studentController.getAll);
        this.router.get("/:id", AuthControllerInstance.verifyToken, studentController.getById);
        this.router.post("/", studentController.create, AuthControllerInstance.register);
        this.router.post("/login", AuthControllerInstance.login, (req, res)=> {res.status(200).json(req.Student)});
        this.router.post("/:id", AuthControllerInstance.verifyToken, studentController.pushBooktoStudentAccount);
        this.router.put("/:id", AuthControllerInstance.verifyToken, studentController.removeBookfromStudentAccount);
        this.router.patch("/:id", AuthControllerInstance.verifyToken, studentController.update);
        this.router.delete("/:id", AuthControllerInstance.verifyToken, studentController.delete);
    }
}

const StudentRoutes = new studentRoutesClass(express.Router());

export default StudentRoutes.router;