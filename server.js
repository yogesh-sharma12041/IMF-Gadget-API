import express from 'express'
import 'dotenv/config'
import gadgetsRoutes from "./Routes/gadgetsRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())

// API Route
app.use(express.json());
app.use("/gadgets", gadgetsRoutes);
app.use("/auth", authRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to IMF Gadget API");
  });
  

app.listen(PORT, () => {
    console.log(`Server is started on PORT ${PORT}`)
})