package routes

import (
	"module/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Get("/", controllers.Ver)
	app.Post("/add", controllers.Registrar)
	app.Put("/:id", controllers.Update)
	app.Delete("/Eleminar/:id", controllers.Delete)
	app.Get("/user/:id", controllers.VerPorId)
	app.Post("/register", controllers.RegisterUser)
	app.Post("/login", controllers.Login)
	app.Get("/userCheck", controllers.UserCheck)
	app.Post("/logout", controllers.Logout)
	app.Get("/GetFile", controllers.GetFile)
	app.Get("/download", controllers.DownloadFile)

}
