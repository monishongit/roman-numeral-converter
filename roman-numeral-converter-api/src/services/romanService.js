class RomanNumeralService {
    /**
     * Converts an integer to corresponding Roman numeral representation. 
     * 
     * Follows the standard Roman numeral rules. Converts the integer by 
     * iterating through predefined numeral values and appending 
     * corresponding Roman numeral symbols.
     * 
     * Reference 1: https://en.wikipedia.org/wiki/Roman_numerals
     * Reference 2: https://www.rapidtables.com/convert/number/how-number-to-roman-numerals.html
     * 
     * Supports numbers in the range 1-3999.
     * 
     * @param {number} numberToConvert - The integer to be converted (must be between 1 and 3999).
     * @returns {string} - The corresponding Roman numeral representation of the given number.
     */
    static convertToRoman(numberToConvert) {
        // Map of decimal values to their corresponding Roman numeral symbols
        const decimalToRomanMap = new Map([
            [1000, "M"],  // 1000 -> M
            [900, "CM"],  // 900 -> CM
            [500, "D"],   // 500 -> D
            [400, "CD"],  // 400 -> CD
            [100, "C"],   // 100 -> C
            [90, "XC"],   // 90 -> XC
            [50, "L"],    // 50 -> L
            [40, "XL"],   // 40 -> XL
            [10, "X"],    // 10 -> X
            [9, "IX"],    // 9 -> IX
            [5, "V"],     // 5 -> V
            [4, "IV"],    // 4 -> IV
            [1, "I"]      // 1 -> I
        ]);

        let romanNumeral = '';

        // Iterate through the map entries (key-value pairs of decimal to Roman numeral)
        for (let [decimal, symbol] of decimalToRomanMap) {
            // Continue subtracting the decimal value from numberToConvert while it's greater or equal
            while (numberToConvert >= decimal) {
                // Reduce numberToConvert by the decimal value
                numberToConvert -= decimal;
                // Append the corresponding Roman numeral symbol
                romanNumeral += symbol;
            }
        }

        return romanNumeral;
    }
}

module.exports = RomanNumeralService;