"use strict";
window.onload = function () {
	var birthday = function (date) {
        var inputArray = date.split("-");
        if ((inputArray.length === 3) && (inputArray[0].length === 4) && (inputArray[1].length === 2) && (inputArray[1] > 0) && (inputArray[1] < 13) && (inputArray[2].length === 2) && (inputArray[2] > 0) && (inputArray[2] < 32)) {
            var inputDate = new Date(inputArray[0], inputArray[1] - 1, inputArray[2]); // använder födelseåret för att kunna kontrollera antalet dager i måndaen
            if (inputDate.getDate() == inputArray[2]) { // tar vara på att datumet slår runt om dagen inte finns i månaden
                inputDate.setFullYear(new Date().getFullYear()); // nu när datumet är korrekt byts året till till nvarande år
                var difference = Math.ceil((inputDate.getTime() - new Date().getTime()) / 86400000); // jag rundar uppåt för att det är så jag tänker på datumskillnader
                if (difference < 0) { // om födelsedagen redan har varit i år
                    inputDate.setFullYear(inputDate.getFullYear() + 1); // byter år till nästa år
                    difference = Math.ceil((inputDate.getTime() - new Date().getTime()) / 86400000);
                }
                return difference;
            } else {
                throw Error("Det fanns inte så många dagar i den månaden.");
            }
        } else {
            throw Error("Du måste skriva ett datum med formatet ÅÅÅÅ-MM-DD.");
        }
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};