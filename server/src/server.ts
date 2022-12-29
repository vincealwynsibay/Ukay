import app from "./app";
import { connectDB } from "./utils/db";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`[server] Server listing on port http://localhost:${PORT}/`);
});
