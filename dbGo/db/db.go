package db

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

var DBconnect, DBerr = sql.Open("mysql", "root:@tcp(localhost)/test")
