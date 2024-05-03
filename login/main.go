package main

import (
	"log"

	"module/database"
	"module/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()
	database.ConnectUsers()
	app := fiber.New()

	app.Static("/static", "./static") // para poder ver imagenes apartir del enlace

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000/",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowCredentials: true,
	}))

	routes.Setup(app)

	log.Fatal(app.Listen(":4000"))
}
