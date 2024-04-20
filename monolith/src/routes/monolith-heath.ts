import express, { Router, Request, Response, NextFunction } from "express";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    console.log("Hello");
    res.json({ message: 'list found !!' }); // Sending a response to the client
});

export { router };
