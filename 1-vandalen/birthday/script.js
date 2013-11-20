"use strict";
window.onload = function () {
	var birthday = function (date) {
        var inputArray = date.split("-"); // skapar en array av användarens inmatning
        if ((inputArray.length === 3) && // verifierar att formatet är ÅÅÅÅ-MM-DD
            (inputArray[0].length === 4) &&
            (inputArray[0] > 999) && // det är ok att kolla när historiska personer eller tidsresenärer från framtiden fyller år
            (inputArray[1].length === 2) &&
            (inputArray[1] > 0) &&
            (inputArray[1] < 13) &&
            (inputArray[1].split(".").length === 1) && // godkänner inte t.ex. 2000-1.-30
            (inputArray[2].length === 2) &&
            (inputArray[2] > 0) &&
            (inputArray[2] < 32) &&
            (inputArray[2].split(".").length === 1)) {
            var inputDate = new Date(inputArray[0], // använder födelseåret för att kunna kontrollera antalet dager i månaden
                                     inputArray[1] - 1, // månader är nollbaserade because logic
                                     inputArray[2]);
            if (inputDate.getDate() == inputArray[2]) { // tar vara på att datumet slår runt om dagen inte finns i månaden för att verifiera att det fanns så många dager i månaden
                var birthdayYear = new Date().getFullYear(), difference = 0; // sätter födelsedagsåret till nuvarande år
                do {
                    inputDate.setFullYear(birthdayYear++, inputArray[1] - 1, inputArray[2]); // ändrar året till kommande födelsedag och ökar året ifall loopen går igen
                    if (inputDate.getDate() == inputArray[2]) { // kollar om det är skottår i år
                        difference = Math.ceil((inputDate.getTime() - new Date().getTime()) / 86400000); // jag rundar uppåt för att det är så jag tänker på datumskillnader
                        if (difference >= 0) { // om födelsedagen inte redan har varit i år
                            return difference;
                        }
                    }
                } while (true); // går vidare till nästa år om födelsedagen redan har varit eller om användaren inte har någon födelsedag i år
            } else {
                throw new Error("Det fanns inte " + inputArray[2] + " dagar i den månaden.");
            }
        } else {
            throw new Error("Du måste skriva ett datum med formatet ÅÅÅÅ-MM-DD.");
        }
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"), // Referens till DOM-noden med id="#value"
	    input = document.querySelector("#string"),
	    submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function (e) {
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove("error");

		try {
			var answer = birthday(input.value), message; // Läser in texten från textrutan och skickar till funktionen "convertString"
			switch (answer) {
            case 0:
                message = "Grattis på födelsedagen!";
				break;
            case 1:
                message = "Du fyller år imorgon!";
				break;
            default:
                message = "Du fyller år om " + answer + " dagar";
				break;
			}

			p.innerHTML = message;
		} catch (error) {
			p.classList.add("error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};