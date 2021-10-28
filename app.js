"use strict";

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////                   
//#region

// app is the function called to start the entire application
let searchResults;
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      traitsApp(people);
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}
// The below traitsApp function was a pair programming effort by Brian King and Codie Fadness.
function traitsApp(people){
  let searchTrait = prompt("Do you know any of the persons traits? Enter trait here - Gender. DOB. Height. Weight. Eye color. Occupation. Case sensitive");
  switch (searchTrait) {
    case "Gender":
      searchResults = searchByGender(people);
      break;
    case "DOB":
      searchResults = searchByDOB(people);
      break;
    case 'Height':
      searchResults = searchByHeight(people);
      break;
    case 'Weight':
      searchResults = searchByWeight(people);
      break;
    case 'Eye color':
      searchResults = searchByEyeColor(people);
      break;
    case 'Occupation':
      searchResults = searchByOccupation(people);
      break;
    default:
      traitsApp(people); // restart app
      break;
  }
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor(
    "Found " +
      person.firstName +
      " " +
      person.lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );

  switch (displayOption) {
    case "info":
      // TODO: get person's info
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.

// The below searchBy functions were a pair programming effort by Codie Fadness and Brian King



function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if(
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {                   
      return true;
    } else {
      return false;
    }
  });
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

function searchByEyeColor(people) {
  let eyeColor = promptFor("What is the person's eye color?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if(
      potentialMatch.eyeColor === eyeColor
    ) {                   
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByGender(people) {
  let gender = promptFor("What is the person's gender?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if(
      potentialMatch.gender === gender
    ) {                   
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByDOB(people) {
  let dob = promptFor("What is the person's date of birth M/DD/YYYY?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if(
      potentialMatch.dob === dob
    ) {                   
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByHeight(people) {
  let height = promptFor("What is the person's height in inches?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if(
      potentialMatch.height === height
    ) {                   
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByWeight(people) {
  let weight = promptFor("What is the person's weight in pounds?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if(
      potentialMatch.weight === weight
    ) {                   
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByOccupation(people) {
  let occupation = promptFor("What is the person's occupation?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if(
      potentialMatch.occupation === occupation
    ) {                   
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.


// Pair programming effort by Codie Fadness and Brian King. User story 1

// 1. prompt the user.
// 2. Ask user for a trait. (weight, height, eye color)
// 3. parse data to seperate that trait from each object.
// 4. Ask user the specific trait details. (weight in lbs, height in inches)
// 5. return people matching user's input (weight:130lbs, height:75in);
// 6. repeat step 2,3,4,5 until only one match appears
// 7. return matching person

// Pair programming effort by Codie Fadness and Brian King. User story 2

// 1. If initial search finds multiple people, save those results
// 2. reprompt search by trait function, and get user input
// 3. save results from step 2
// 4. reprompt until five traits have been searched for, or only a single match is found

//TODO: add other trait filter functions here.

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  let response;
  do {
    response = prompt(question).trim();
    isValid = valid(response);
  } while (response === "" || isValid === false);
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {}

//#endregion
