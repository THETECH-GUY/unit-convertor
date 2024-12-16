
		
		document.addEventListener("DOMContentLoaded", function() {
		
		updateUnitsDropdown("length");
	});
	
	function updateUnitsDropdown(type) {
		
		const units = {
			length: ['meter', 'kilometer', 'centimeter', 'mile', 'yard'],
			weight: ['kilogram', 'gram', 'ounce', 'pound', 'ton'],
			temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
			};
		
		const unitFrom = document.getElementById('unitFrom');
		const unitTo = document.getElementById('unitTo');
		unitFrom.innerHTML = "";
		unitTo.innerHTML = "";
		units[type].forEach(unit => {
			const option = document.createElement('option');
			option.value = unit;
			option.text = unit;
			unitFrom.add(option);
			const optionTo = document.createElement('option');
			optionTo.value = unit;
			optionTo.text = unit;
			unitTo.add(optionTo);
		});
	}
	function convert() {
		const value = parseFloat(document.getElementById('value').value);
		const conversionType = document.querySelector('input[name="conversionType"]:checked').value;
		const unitFrom = document.getElementById('unitFrom').value;
		const unitTo = document.getElementById('unitTo').value;
		if(unitFrom === unitTo) {
			document.getElementById('result').innerText = "Result: " + value;
			return;
		}
		
       
		const conversionFactors = {
			length: { 
				meter: {
					kilometer: value => value / 1000,
					centimeter: value => value * 100,
					mile: value => value / 1609.344,
					yard: value => value * 1.0936
				},
				kilometer: {
					meter: value => value * 1000,
					centimeter: value => value * 100000,
					mile: value => value / 1.609344,
					yard: value => value * 1093.6133
				},
				centimeter: {
					meter: value => value / 100,
					kilometer: value => value / 100000,
					mile: value => value / 160934.4,
					yard: value => value / 91.44
				},
				mile: {
					meter: value => value * 1609.344,
					kilometer: value => value * 1.609344,
					centimeter: value => value * 160934.4,
					yard: value => value * 1760
				},
				yard: {
					meter: value => value / 1.0936,
					kilometer: value => value / 1093.6133,
					centimeter: value => value * 91.44,
					mile: value => value / 1760
				},
			},
			
			weight: { 
				kilogram: {
					gram: value => value * 1000,
					ounce: value => value * 35.274,
					pound: value => value * 2.205,
					ton: value => value / 1000
				},
				gram: {
					kilogram: value => value / 1000,
					ounce: value => value / 28.35,
					pound: value => value / 453.592,
					ton: value => value / 1e+6
				},
				ounce: {
					kilogram: value => value / 35.274,
					gram: value => value * 28.35,
					pound: value => value / 16,
					ton: value => value / 35274
				},
				pound: {
					kilogram: value => value / 2.205,
					gram: value => value * 453.592,
					ounce: value => value * 16,
					ton: value => value / 2205
				},
				ton: {
					kilogram: value => value * 1000,
					gram: value => value * 1e+6,
					ounce: value => value * 35274,
					pound: value => value * 2205
				},
			},
			
			temperature: { 
				Celsius: {
					Fahrenheit: value => (value * 9 / 5) + 32,
					Kelvin: value => value + 273.15
				},
				Fahrenheit: {
					Celsius: value => (value - 32) * 5 / 9,
					Kelvin: value => (value + 459.67) * 5 / 9
				},
				Kelvin: {
					Celsius: value => value - 273.15,
					Fahrenheit: value => (value * 9 / 5) + 32
				}
			},
		};
		
		const result = conversionFactors[conversionType][unitFrom][unitTo](value);
		const resultElement = document.getElementById('result');
		resultElement.innerText = `Result: ${result.toFixed(10)}`;
	}
	const radioButtons = document.querySelectorAll('input[name="conversionType"]');
	radioButtons.forEach(button => {
		
		button.addEventListener('change', function() {
			
			const selectedType = this.value;
			
			updateUnitsDropdown(selectedType);
		});
	});
