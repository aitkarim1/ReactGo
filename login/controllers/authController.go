package controllers

import (
	"log"
	"module/database"
	"module/models"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
)

func Registrar(c *fiber.Ctx) error {
	data := new(models.User)
	if err := c.BodyParser(data); err != nil { //&data sin la opcion de file upload
		return err
	}

	// file uploading
	file, err := c.FormFile("file")

	if err != nil {
		log.Println(err)
	}
	if file.Size > 0 {
		filename := "./static/uploads/" + file.Filename
		if err := c.SaveFile(file, filename); err != nil {
			log.Println(err)
		}
		data.File = filename //Añadir a la bd en el campo de File
	}

	database.DBConn.Create(data)
	return c.JSON(data)
}

func Ver(c *fiber.Ctx) error {
	db := database.DBConn
	var data []models.User
	db.Find(&data)

	return c.JSON(data)
}

func Update(c *fiber.Ctx) error {
	id := c.Params("id")
	var data models.User
	database.DBConn.First(&data, id)

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	result := database.DBConn.Save(data)

	if result.Error != nil {
		log.Println("Fallo al guardar datos")
	}

	return c.JSON(data)
}

func Delete(c *fiber.Ctx) error {
	id := c.Params("id")
	var data models.User
	database.DBConn.First(&data, id)

	// delete image
	filename := data.File
	os.Remove(filename)

	result := database.DBConn.Delete(data)

	if result.Error != nil {
		log.Println("Fallo al eleminar datos")
	}

	return c.JSON(fiber.Map{
		"message": "Usuario eliminado correctamente",
	})
}

func VerPorId(c *fiber.Ctx) error {
	id := c.Params("id")
	var data models.User
	database.DBConn.First(&data, id)

	return c.JSON(data)
}

func GetFile(c *fiber.Ctx) error {
	// Define la ruta al archivo, ajusta el nombre de archivo según sea necesario
	filePath := filepath.Join("static", "uploads", "RAC_basic_sample_project.ifc")

	// Lee el contenido del archivo usando os.ReadFile
	data, err := os.ReadFile(filePath)
	if err != nil {
		// Manejo de error en caso de que el archivo no pueda ser leído
		return c.Status(fiber.StatusNotFound).SendString("File not found")
	}

	// Envía el contenido del archivo como respuesta
	return c.SendString(string(data))
}

func DownloadFile(c *fiber.Ctx) error {
	// Define la ruta completa al archivo
	filePath := filepath.Join("static", "uploads", "RAC_basic_sample_project.ifc")

	// Comprueba si el archivo existe
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		// Si el archivo no existe, devuelve un error 404
		return c.Status(fiber.StatusNotFound).SendString("File not found")
	}

	// Utiliza SendFile para enviar el archivo como una descarga
	return c.Download(filePath)
}


