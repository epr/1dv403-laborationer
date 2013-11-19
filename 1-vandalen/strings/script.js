"use strict";
window.onload = function () {
	var convertString = function (str) {
        if (str !== "") { // om användaren har skrivit något
            var chars = str.split(""); // delar upp det användaren skrev i enskilda tecken
            for (var i = 0; i < chars.length; i++) {
                if ((chars[i] == "a") || (chars[i] == "A")) {
                    chars [i] = "#";
                } else if (chars[i] === chars[i].toLowerCase()) { // om genemen
                    chars[i] = chars[i].toUpperCase();
                } else if (chars[i] === chars[i].toUpperCase()) { // om versal
                    chars[i] = chars[i].toLowerCase();
                }
            }
            return chars.join("");
        } else {
            throw Error("Du har inte skrivit något.");
        }
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function (e) {
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};