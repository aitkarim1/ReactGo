package models

type Login struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Name     string `json:"name" gorm:"not null;column:name;size:255"`
	Email    string `json:"email" gorm:"unique;not null; column:email;size:255"`
	Password []byte `json:"password" gorm:"not null;column:password;size:255"`
}
