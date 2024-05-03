package database

import (
	"model/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	connection, err := gorm.Open(mysql.Open("root:@tcp(127.0.0.1:3306)/test2?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{})

	if err != nil {
		panic("No se puede connectar")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})
}
