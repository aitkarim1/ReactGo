package main

import "module/db"

func main() {

	insert, err := db.DBconnect.Query("INSERT INTO persona VALUE ('ALEX', 23)")
	if err != nil {
		panic(err.Error())
	}
	defer insert.Close()
}
