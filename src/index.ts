import fastify from "fastify"

const PORT = 3000

const server = fastify()

server
	.listen({
		port: PORT,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log("Server running")
	})
