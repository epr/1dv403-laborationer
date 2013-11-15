"use strict";
window.onload = function () {
    var min = 1;
    var max = 100;
	var secret = Math.floor(Math.random() * (max-min) + 1) + min;
    var tries = 0;
	var guess = function (number) {
        number = parseFloat(number);
        if ((number >= min) && (number <= max)) {
            tries++;
            if (number === secret) {
                switch (tries) {
                    case 1:
                        return [true, "Grattis du vann! Det hemliga talet var " + secret + " och du behövde 1 gissning för att hitta det."];
                        break;
                    default:
                        return [true, "Grattis du vann! Det hemliga talet var " + secret + " och du behövde " + tries + " gissningar för att hitta det."];
                        break;
                }
            } else if (number < secret) {
                return [false, "Det hemliga talet är högre!"];
            } else if (number > secret) {
                return [false, "Det hemliga talet är lägre!"];
            }
        } else {
            return [false, "Din gissning är utanför intervallet " + min + " - " + max];
        }
	};
	
	// ------------------------------------------------------------------------------



	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function (e) {
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.
		var answer = guess(input.value); // Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if (answer[0] === true) {				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};