const express = require("express");
const app = express();

const prisma = require("./utils/prismaClient");

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

const { projectRouter } = require('./routes/project');
app.use("/projects", projectRouter);

const { ItemRouter } = require('./routes/item');
app.use("/items", ItemRouter);

app.get("/", (req,res) => res.json('Work on progress'));

app.get("/skills", async (req, res) => {
    try {
        const data = await prisma.skill.findMany();

        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

const port   = process.env.PORT || 8000;

app.listen(
    port, () => console.log("Express API started")
);

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

export default app;