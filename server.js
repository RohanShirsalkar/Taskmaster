const experss = require('express');
const app = experss();
const port = 3000;
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const connectDb = require('./db');
const validateToken = require('./middleware/tokenHandler');
const cors = require("cors")

connectDb();
app.use(cors());
app.use(experss.json());
app.use("/task", validateToken, taskRoutes);
app.use("/user", userRoutes);
app.use("/project", validateToken, projectRoutes);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});