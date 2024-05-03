package main

import (
	"errors"
	"fmt"
)

func main() {

	// fmt.Println("Holaa goo")
	// nombre := "karim"
	// fmt.Println("Mi nombre es: " + nombre)

	// var num int = 12
	// num3, num2 := 3, 14
	// fmt.Println(num + num2 + num3)

	// fmt.Printf("su nombre es: %v y tiene %v años.\n Tipo de numero: %T", nombre, num, num)

	// Escribe("karim")

	result, rest, err := Division(9, 0)
	// fmt.Printf("El resultado: %v, y el resto %v", result, rest)
	// if err != nil {
	// 	fmt.Println(err.Error())
	// } else if rest == 0 {
	// 	fmt.Printf("El resultado de la division es: %v", result)
	// } else {
	// 	fmt.Printf("El resultado de la division es: %v, y el resto es: %v", result, rest)
	// }

	switch {
	case err != nil:
		fmt.Println(err.Error())
	case rest == 0:
		fmt.Printf("El resultado de la division es: %v", result)
	default:
		fmt.Printf("El resultado de la division es: %v, y el resto es: %v", result, rest)
	}

}

// func Escribe(nombre string) {
// 	fmt.Println(nombre)
// }

func Division(numenador int, denominador int) (int, int, error) {
	var err error
	if denominador == 0 {
		err = errors.New("No se puede dividir entre cero")
		return 0, 0, err
	}
	resultado := numenador / denominador
	resto := numenador % denominador
	return resultado, resto, err
}
