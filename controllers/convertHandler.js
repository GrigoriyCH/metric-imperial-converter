function ConvertHandler() {

  // Extracts the numerical value from the input
  this.getNum = function(input) {
    let result;
    let fractionCount = (input.match(/\//g) || []).length;
    
    if (fractionCount > 1) {
      return "invalid number";
    }
    
    let match = input.match(/^[\d/.]+/); 
    if (match) {
      result = eval(match[0]);
    } else {
      result = 1;
    }
    
    return result;
  };
  

  // Extracts the unit from the input
  this.getUnit = function(input) {
    let result;
    let match = input.match(/[a-zA-Z]+$/); // Matches unit at the end
    if (match) {
      result = match[0].toLowerCase();
      if (!["gal", "l", "mi", "km", "lbs", "kg"].includes(result)) {
        return "invalid unit";
      }
    } else {
      return "invalid unit";
    }
    return result === "l" ? "L" : result; // Return "L" as uppercase for liters
  };

  // Maps the input unit to its corresponding output unit
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs"
    };
    return unitMap[initUnit] || "invalid unit";
  };

  // Converts the input unit to its full spelled-out name
  this.spellOutUnit = function(unit) {
    const spellMap = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms"
    };
    return spellMap[unit] || "invalid unit";
  };

  // Performs the conversion based on the initial number and unit
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = "invalid unit";
    }
    return parseFloat(result.toFixed(5)); // Return with 5 decimal precision
  };

  // Returns a formatted string showing the conversion result
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;