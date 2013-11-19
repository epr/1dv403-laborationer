"use strict";
window.onload = function () {
    var min = 1, max = 100,
        secret = Math.floor(Math.random() * (max - min) + 1) + min,
        tries = 0,
        guess = function (number) {
            number = +number;
            if ((number >= min) && (number <= max)) { // om gissningern är inom intervallet
                tries++; // räkna gissningen
                if (number === secret) { // om det är rätt gissat
                    switch (tries) { // singular/plural
                    case 1:
                        return [true, "Grattis du vann! Det hemliga talet var " + secret + " och du behövde 1 gissning för att hitta det."];
                    default:
                        return [true, "Grattis du vann! Det hemliga talet var " + secret + " och du behövde " + tries + " gissningar för att hitta det."];
                    }
                } else if (number < secret) {
                    return [false, "Det hemliga talet är högre! Antal gissningar: " + tries];
                } else if (number > secret) {
                    return [false, "Det hemliga talet är lägre! Antal gissningar: " + tries];
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