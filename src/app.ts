import express from "express";
import productRoutes from "./api/v1/routes/productRoutes";

const app = express();

app.use(express.json());
app.use("/api/v1", productRoutes);

// global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;