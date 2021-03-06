"use strict";

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////                   
//#region

// app is the function called to start the entire application

let searchResults = [];
function app(people) {
  searchResults = [];
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
  if(searchResults.length == 1){
    mainMenu(searchResults)
  }
  else{
  let searchTrait = prompt("Do you know any of the persons traits? Enter trait here - Gender. DOB. Height. Weight. Eye color. Occupation. Case sensitive");
  switch (searchTrait) {
    case "Gender":
      searchResults = searchByGender(people);
      traitsApp(searchResults)
      break;
    case "DOB":
      searchResults = searchByDOB(people);
      traitsApp(searchResults)
      break;
    case 'Height':
      searchResults = searchByHeight(people);
      traitsApp(searchResults)
      break;
    case 'Weight':
      searchResults = searchByWeight(people);
      traitsApp(searchResults)
      break;
    case 'Eye color':
      searchResults = searchByEyeColor(people);
      traitsApp(searchResults)
      break;
    case 'Occupation':
      searchResults = searchByOccupation(people);
      traitsApp(searchResults)
      break;
    default:
      
      break;
    }
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
      searchResults[0].firstName +
      " " +
      searchResults[0].lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );

  switch (displayOption) {
    case "info":
      displayPerson(searchResults[0])
      break;
    case "family":
      searchBySpouse(searchResults[0], data);
      searchBySiblings(searchResults[0], data);
      searchByParent(searchResults[0], data);
      searchFamily();
      break;
    case "descendants":
      searchByChild(searchResults[0], data);
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


// Search by name function.
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


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


// Search by Traits functions.
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


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
      potentialMatch.height == height
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
      potentialMatch.weight == weight
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


// Search by family and search by descendants function. This was a pair programming effort by Brian King and Codie Fadness.
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


let parents =[];
function searchByParent(person, people){
  parents = [];
  let parentSearch = people.filter(function (potentialMatch){
    if(potentialMatch.id == person.parents[0] || potentialMatch.id == person.parents[1]){
      return true
    }
    else{
      return false
    }
  })
  for(let i = 0; i < parentSearch.length; i++){
      parents = person.firstName + " " + person.lastName + " " + "is the child of ";
      parents += parentSearch[i].firstName + " " + parentSearch[i].lastName + "\n";
      if(person.parents[1] != undefined){
        person += " and " + parentSearch[1].firstName + " " + parentSearch[1].lastName;
      }

  }
  alert(parents);
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


let sibling =[];
let siblings =[];


function searchBySiblings(person, people){
  siblings = [];
  let arrayOfSiblings = people.filter(function (potentialMatch) {
    if((potentialMatch.parents[0] == person.parents[0] || potentialMatch.parents[1] == person.parents[1]) && potentialMatch !== person && potentialMatch.parents.length > 0 && person.parents.length > 0){               
      return true;
    }   
    else {
      return false;
    }
  });
   for(let i = 0; i < arrayOfSiblings.length; i++){
    sibling +=  'Sibling of ' + person.firstName + ' ' + person.lastName + '\n';
    sibling += '-----------------------' + '\n';
    sibling += 'First name: ' + arrayOfSiblings[i].firstName + ' ' + '\n';
    sibling += 'Last name: ' + arrayOfSiblings[i].lastName + '\n';
    sibling += '\n'

    siblings = sibling;
 }
 alert(siblings);

}


//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


let spouse = [];
let theSpouse = [];
function searchBySpouse(person, people){
  theSpouse =[];
  let spouseName = people.filter(function (potentialMatch) {
    if((potentialMatch.currentSpouse == person.id)){               
      return true;
    }   
    else {
      return false;
    }
  });
    for(let i = 0; i < spouseName.length; i++){
      spouse =  'Spouse of ' + person.firstName + ' ' + person.lastName + '\n';
      spouse += '-----------------------' + '\n';
      spouse += 'First name: ' + spouseName[i].firstName + ' ' + '\n';
      spouse += 'Last name: ' + spouseName[i].lastName + '\n';
      spouse += '\n';
      theSpouse = spouse;

    }
    alert(theSpouse);


}


//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


let familyMembers = [];
function searchFamily(){
    familyMembers = prompt("Would you like to view the parents, spouse or siblings again? If yes type the category. If you would like to restart or quit the app type restart/reset or stop/quit")
  switch(familyMembers) {
    case 'parents' || 'Parents' :
      alert(parents);
      sibling =[];
      siblings = [];
      parent = [];
      parents = [];
      spouse = [];
      theSpouse = [];
      return
    case 'spouse' || 'Spouse' :
      alert(theSpouse);
      sibling =[];
      siblings = [];
      parent = [];
      parents = [];
      spouse = [];
      theSpouse = [];
      return
    case 'sibling' || 'Sibling' || 'siblings' || 'Siblings':
      alert(siblings)
      return;
    case 'reset' || 'restart' || 'Reset' || 'Restart' :
      sibling =[];
      siblings = [];
      parent = [];
      parents = [];
      spouse = [];
      theSpouse = [];
      app(data);
      break;
    case 'quit' || 'Quit' || 'stop' || 'Stop' || 'end' || 'End' :
      sibling =[];
      siblings = [];
      parent = [];
      parents = [];
      spouse = [];
      theSpouse = [];
      return
    default :
      sibling =[];
      siblings = [];
      parent = [];
      parents = [];
      spouse = [];
      theSpouse = [];
      return;
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


let child ='';
let children = '';
let descendants = '';
let grandChildren = '';
let grandChild = '';
function searchByChild(person, people) {
  child =[];
  children = [];
  descendants = [];
  grandChildren = [];
  grandChild = [];
  let arrayOfChildren = people.filter(function (potentialMatch) {
    for(let i = 0; i < potentialMatch.parents.length; i++)
    if(potentialMatch.parents[i] == person.id){               
      return true;
    }   
    else {
      return false;
    }

  });
  for(let i = 0; i < arrayOfChildren.length; i++){
    child +=  'Child of ' + person.firstName + ' ' + person.lastName + '\n';
    child += '-----------------------' + '\n';
    child += 'First name: ' + arrayOfChildren[i].firstName + ' ' + '\n';
    child += 'Last name: ' + arrayOfChildren[i].lastName + '\n';
    child += '\n'
    descendants = arrayOfChildren[i];
    children = child;
  }
  alert(children)
  grandChildren = prompt("yes emd reset")
  searchGrandchildren();

  function searchGrandchildren(){
    
    switch(grandChildren) {
    case 'yes' :
      return searchByChild(descendants, data)
    case 'Yes' :
      searchByChild(descendants, data)
      break;
    case 'end' || 'End' || 'stop' || 'Stop' || 'no' || 'No' :
      return  
    case 'reset' || 'restart' || 'Reset' || 'Restart' :
      child =[];
      children = [];
      descendants = [];
      grandChildren = [];
      app(people);
      break;
  }
}
  child =[];
  children = [];
  descendants = [];
  grandChildren = [];
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


// let nobody = ''
// let parent ='';
// let sibling = '';
// let spouse = '';

// function searchByFamily(person, people) {

//   let arrayOfFamily = people.filter(function (potentialMatch) {
//     for(let i = 0; i < 2; i++){
//     if(potentialMatch.id == person.parents[i] || potentialMatch.parents[i] == person.parents[i] || potentialMatch.id == person.currentSpouse){               
//       return true;
//     }   
//     else {
//       return false;
//     }

//     }
//   })  
//     for(let i = 0; i < arrayOfFamily.length; i++){
//       if(arrayOfFamily[i].id == person.parents[0] || arrayOfFamily[i].id == person.parents[1]){
//         parent += arrayOfFamily[i].firstName + ' ' + arrayOfFamily[i].lastName + '\n';
//       }
//       else if(arrayOfFamily[i].id == person.currentSpouse){
//         spouse += arrayOfFamily[i].firstName + ' ' + arrayOfFamily[i].lastName + '\n'
//       }
//       else if(arrayOfFamily[i].id == person.id){
//         nobody += " "
//       }
//       else if(arrayOfFamily[i].parents[i] == person.parents[0] || arrayOfFamily[i].parents[i] == person.parents[1]){
//         sibling += arrayOfFamily[i].firstName + ' ' + arrayOfFamily[i].lastName + '\n'
//       }
//     }
//     alert(`Parent(s): ${parent}
//           Spouse: ${spouse}
//           Sibling(s): ${sibling}`)  
// }






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

// Pair programming effort by Codie Fadness and Brian King. User story 3

// 1. Save matched person/object.
// 2. Prompt user.
// 3. Ask what would they like to view.
// 4. If info: Retrieve matched person.
// 5. Display person's info
// 6. if anything else: Close prompt.

// Pair programming effort by Codie Fadness and Brian King. User story 4

// 1. Save matched person/object.
// 2. Prompt user
// 3. Ask  what they would like to view.
// 4. If descendants: Retrieve children
//    a. Return objects with matching parents/ ID keyword pairs.
// 5. Display names of children
//    a. Display the first and last names of objects that have parents keyword equal to the matched object's ID keyword.
// 6. if anything else: Close prompt.

// Pair programming effort by Codie Fadness and Brian King. User story 5

// 1. Save matched person/object.
// 2. Prompt user
// 3. Ask what they would like to view.
// 4. If family: retrieve all family members
// 5. Display names of family members and their relation
// 6. if anything else: Close prompt.



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
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";

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

