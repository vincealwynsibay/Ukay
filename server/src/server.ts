import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`[server] Server listing on port http://localhost:${PORT}/`);
});
