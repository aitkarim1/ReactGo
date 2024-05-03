package database

import (
	"log"
	"module/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DBConnUser *gorm.DB

func ConnectUsers() {
	dsn := "root:@tcp(127.0.0.1:3306)/test1?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	log.Println("Connection successful")

	db.AutoMigrate(new(models.Login))

	DBConnUser = db
}
