const ErrorUtil = require('../utils/errorUtil');
const RomanNumeralService = require("../services/romanService");

exports.convertToRoman = (req, res, next) => {
    try {
        const { query } = req.query;

        // Validate input: must exist and be a number
        if (!query || isNaN(query)) {
            return res.status(400).json(ErrorUtil.createErrorResponse(
                400,
                "Invalid input. Please provide a valid integer (1-3999).",
                "INVALID_INPUT",
                "Ensure you provide a number between 1 and 3999 in the query parameter."
            ));
        }

        const number = parseInt(query, 10);

        // Validate range (1-3999)
        if (number < 1 || number > 3999) {
            return res.status(400).json(ErrorUtil.createErrorResponse(
                400,
                "Number out of range. Please enter a number between 1 and 3999.",
                "OUT_OF_RANGE",
                "Use a number in the valid range (1-3999)."
            ));
        }

        // Convert to Roman numeral
        const romanNumeral = RomanNumeralService.convertToRoman(number);
        res.status(200).json({ input: query, output: romanNumeral });

    } catch (error) {
        next(error);
    }
};

