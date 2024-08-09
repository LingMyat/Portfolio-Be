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

app.get("/skills", async (req, res) => {
    try {
        const data = await prisma.skill.findMany();

        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
const port   = process.env.PORT || 8000;

const server = app.listen(
    port, () => console.log("Express API started")
);

const gracefulShutdown = async () => {
    await prisma.$disconnect();
    server.close(() => {
        console.log("Portfolio 101 API closed.");
        process.exit(0);
    });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);