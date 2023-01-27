"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
body_parser_1.json;
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, body_parser_1.json)());
app.use('/todos', todos_1.default);
const port = process.env.PORT;
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
