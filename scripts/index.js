var settings = {
  key: "C",
  type: "maj",
  numberOfString: 6,
  numberOfFrets: 15,
  tuning: ["Standart", "E", "A", "D", "G", "B", "E"],
};

const predefinedinstruments = {
  guitar: {
    numberOfStrings: 6,
    numberOfFrets: 15,
    tunings: [
      ["Standart", "E", "A", "D", "G", "B", "E"],
      ["Open A", "E", "A", "C#", "E", "A", "E"],
      ["Open B", "B", "F#", "B", "F#", "B", "D#"],
      ["Open C", "C", "G", "C", "G", "C", "E"],
      ["Open D", "D", "A", "D", "F#", "A", "D"],
      ["Open E", "E", "B", "E", "G#", "B", "E"],
      ["Open F", "E", "A", "C", "F", "C", "F"],
      ["Open G", "D", "G", "D", "G", "B", "D"],


      ["Drop D", "D", "A", "D", "G", "B", "E"],
      ["Drop C♯/Drop D♭", "C#", "G#", "C#", "F#", "A#", "D#"],
      ["Drop C", "C", "G", "C", "F", "A", "D"],
      ["Drop B", "B", "F#", "B", "E", "G#", "C#"],
      ["Drop A♯/Drop B♭", "A#", "F", "A#", "D#", "G", "C"],
      ["Drop A", "A", "E", "A", "D", "F#", "B"],
      ["Drop G♯/Drop A♭", "G#", "D#", "G#", "C#", "F", "A#"],
      ["Drop G", "G", "D", "G", "C", "E", "A"],
      ["Drop F♯/Drop G♭", "F#", "C#", "F#", "B", "D#", "G#"],
      ["Drop F", "F", "C", "F", "A#", "D", "G"],
      ["Drop E", "E", "B", "E", "A", "C#", "F#"],
      ["Drop D♯/Drop E♭", "D#", "A#", "D#", "G#", "C", "F"],

            
      ["Cross-note A", "E", "A", "E", "A", "C", "E"],
      ["Cross-note C", "C", "G", "C", "G", "C", "Eb"],
      ["Cross-note D", "D", "A", "D", "F", "A", "D"],
      ["Cross-note E", "E", "B", "E", "G", "B", "E"],
      ["Cross-note F", "F", "Ab", "C", "F", "C", "F"],
      ["Cross-note G", "D", "G", "D", "G", "Bb", "D"],
      
      ["E♭ tuning", "Eb", "Ab", "Db", "Gb", "Bb", "Eb"],
      ["D tuning", "D", "G", "C", "F", "A", "D"],
      ["C♯/D♭ tuning", "C#", "F#", "B", "E", "G#", "C#"],
      ["C tuning", "C", "F", "Bb", "Eb", "G", "C"],
      ["B tuning", "B", "E", "A", "D", "Gb", "B"],
      ["A♯/B♭ tuning", "A#", "D#", "G#", "C#", "F", "A#"],
      ["A tuning", "A", "D", "G", "C", "E", "A"],
      ["G♯/A♭ tuning", "G#", "C#", "F#", "B", "D#", "G#"],
      ["G tuning", "G", "C", "F", "A#", "D", "G"],
      ["F♯/G♭ tuning", "F#", "B", "E", "A", "C#", "F#"],
      ["F tuning", "F", "A#", "D#", "G#", "C", "F"],


    ],
  },
  ukulele: {
    numberOfStrings: 4,
    numberOfFrets: 10,
    tunings: [
      ["standart", "G", "C", "E", "A"],
      ["D-Tuning", "A", "D", "F#", "B"],
      ["Slack-Key Tuning", "G", "C", "E", "G"],
      ["Slide Tuning", "G", "C", "E", "Bb"],
    ],
  },
};
const tones = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];



window.onload = (event) => {
  loadingPageAnimationPrepare();
  loadChordsFromAPI();
  checkForSelectorOverflow();
};



function checkForSelectorOverflow(){
    console.log("chockFotSelecorOvwerflow");
    keySelector = document.getElementById("keySelector");
    typeSelector = document.getElementById("typeSelector");

    if(isOverflown(keySelector) || isOverflown(typeChange)){
        keySelector.children[0].style = "margin-left: calc(50vw - 37px);";
        typeSelector.children[0].style = "margin-left: calc(50vw - 37px);";
    }
}




//change chord key
function keyChange(element_id) {
  console.log("Function: keyChange");
  console.log("Arguments: " + element_id);
  document
    .getElementsByClassName("keyButtonSelected")[0]
    .classList.remove("keyButtonSelected");
  document.getElementById(element_id).classList.add("keyButtonSelected");

  settings.key = element_id;
  loadingPageAnimationPrepare();
  loadChordsFromAPI();
}

//change chord type
function typeChange(element_id) {
  console.log("Function: typeChange");
  console.log("Arguments: " + element_id);
  if (element_id == "more") {
    openModal();
  } else {
    if (document.getElementsByClassName("typeButtonSelected")[0]) {
      document
        .getElementsByClassName("typeButtonSelected")[0]
        .classList.remove("typeButtonSelected");
    }
    if (element_id.startsWith("modal_")) {
      element_id = element_id.substring(6);
    } else {
      document.getElementById(element_id).classList.add("typeButtonSelected");
    }
    console.log(element_id);

    settings.type = element_id;

    closeModal();
    loadingPageAnimationPrepare();
    loadChordsFromAPI();
    //chordDiagramGenerate();
  }
}

//open other chord types modal
function openModal() {
  console.log("Function: openModal");
  document.getElementById("typeModal").style.display = "flex";

  document.body.style.overflow = "hidden";

  listMoreTypes();
}
//close other chord types modal
function closeModal() {
  console.log("Function: closeModal");
  document.getElementById("typeModal").style.display = "none";
  document.body.style.overflow = "auto";
}

function moreTypesSearch(element) {
  deselectMoreTypesLetters();
  let searchTerm = element.value;
  let foundIndexes = [];
  let foundIndexesTypeIndexes = [];
  for (i = 0; i < allChordsArray.length; i++) {
    let nestedArray = allChordsArray[i];
    for (k = 0; k < nestedArray.length; k++) {
      if (nestedArray[k].includes(searchTerm)) {
        foundIndexes.push(i);
        foundIndexesTypeIndexes.push(k);
        break;
      }
    }
  }
  console.log(foundIndexes);
  listMoreTypes(foundIndexes, foundIndexesTypeIndexes);
}

function moreTypesTypeSearch(element) {
  deselectMoreTypesLetters();
  let type = element.innerHTML;
  document.getElementById("moreTypesSerach").value = "";
  element.classList.add("alphabetLetterActive");

  let foundIndexes = [];

  console.log(foundIndexes);
  listMoreTypes(foundIndexes);
}

function deselectMoreTypesLetters() {
  let letters = document.getElementsByClassName("alphabetLetterActive");
  for (i = 0; i < letters.length; i++) {
    letters[i].className = "alphabetLetter";
  }
}

function listMoreTypes(indexes, typeIndexes) {
  let container = document.getElementById("chordSelectorTypesContainer");
  container.innerHTML = "";

  let insertedItems = 0;
  for (i = 0; i < allChordsArray.length; i++) {
    if (indexes) {
      if (!indexes.includes(i)) {
        continue;
      }
    }

    let typeName = allChordsArray[i][0];

    let type = document.createElement("div");
    type.className = "chordSelectorType";
    type.onclick = function () {
      closeModal();
      typeChange(this.id);
    };
    type.id = "modal_" + typeName;
    type.innerHTML = typeName;
    if (indexes && typeIndexes) {
      let foundName =
        allChordsArray[indexes[insertedItems]][typeIndexes[insertedItems]];
      if (foundName != typeName) {
        let alternativeName =
          '<div class="alternativeChordName"> (' + foundName + ")</div>";
        type.innerHTML = type.innerHTML + alternativeName;
      }
    }
    container.appendChild(type);
    insertedItems++;
  }
}

//open dialog for more options
function openMoreSettings() {
  //delete instrument container
  let instrumentSelector = document.getElementById("instrumentSelector");
  instrumentSelector.style.display = "none";

  //get container element
  let container = document.getElementById("moreSettingsContainer");
  container.innerHTML = "";

  //create grid element for options
  let formGrid = document.createElement("div");
  formGrid.className = "moreSettingGrid";

  //back bttn container
  let backBttnContainer = document.createElement("div");
  backBttnContainer.className = "instrumentSettingsBackBttnContainer";

  //back bttn
  let backBttn = document.createElement("div");
  backBttn.innerHTML = "< basic settings";
  backBttn.className = "instrumentSettingsBackBttn";
  backBttn.onclick = function () {
    closeMoreSettings();
  };
  backBttnContainer.appendChild(backBttn);
  formGrid.appendChild(backBttnContainer);

  //number of strings
  let numberOfStringsContainer = document.createElement("div");
  numberOfStringsContainer.className = "rangeSelectorContainer";

  let numberOfStringText = document.createElement("div");
      numberOfStringText.innerHTML = "Number of strings -";
      numberOfStringText.className = "grid-item";
      numberOfStringsContainer.appendChild(numberOfStringText);

let numberOfStringsDisplayNumber = document.createElement("span");
  numberOfStringsDisplayNumber.innerHTML = "6";
  numberOfStringsDisplayNumber.id = "numberOfStringsDisplayNumber";
  numberOfStringsDisplayNumber.className = "numberDisplay";
  numberOfStringsContainer.appendChild(numberOfStringsDisplayNumber);


  let numberOfStringsInput = document.createElement("input");
  numberOfStringsInput.type = "range";
  numberOfStringsInput.min = 3;
  numberOfStringsInput.max = 16;
  numberOfStringsInput.value = 6;
  numberOfStringsInput.className = "rangeSelector";
  numberOfStringsInput.oninput = function(){
    changeNumberOfStrings(this);
  }
  numberOfStringsContainer.appendChild(numberOfStringsInput);
  formGrid.appendChild(numberOfStringsContainer);





  //number of frets
  let numberOfFretsContainer = document.createElement("div");
  numberOfFretsContainer.className = "rangeSelectorContainer";

  let numberOfFretsText = document.createElement("div");
  numberOfFretsText.innerHTML = "Number of frets -";
  numberOfFretsText.className = "grid-item";
  numberOfFretsContainer.appendChild(numberOfFretsText);

let numberOfFretsDisplayNumber = document.createElement("span");
  numberOfFretsDisplayNumber.innerHTML = "15";
  numberOfFretsDisplayNumber.id = "numberOfFretsDisplayNumber";
  numberOfFretsDisplayNumber.className = "numberDisplay";
  numberOfFretsContainer.appendChild(numberOfFretsDisplayNumber);

  let numberOfFretsInput = document.createElement("input");
  numberOfFretsInput.type = "range";
  numberOfFretsInput.min = 3;
  numberOfFretsInput.max = 50;
  numberOfFretsInput.value = 15;
  numberOfFretsInput.id = "numberOfFretsInput";
  numberOfFretsInput.className = "rangeSelector";
  numberOfFretsInput.oninput = function(){
    changeNumberOfFrets(this);
  }
  numberOfFretsContainer.appendChild(numberOfFretsInput);
  formGrid.appendChild(numberOfFretsContainer);



  //custom tuning
  let customTuning = document.createElement("div");
  customTuning.innerHTML = "String tuning:";
  customTuning.className = "grid-item";
  formGrid.appendChild(customTuning);

  let customTuningContainer = document.createElement("div");
  customTuningContainer.id = "customTuningContainer";
  customTuningContainer.className = "customTuningContainer";
  formGrid.appendChild(customTuningContainer);

  let searchButton = document.createElement("input");
  searchButton.classList.add("searchbutton");
  searchButton.type = "button";
  searchButton.onclick = function () {
    loadingPageAnimationPrepare();
    loadChordsFromAPI();
  };
  searchButton.value = "search";

  formGrid.appendChild(searchButton);
  container.appendChild(formGrid);

  //create custom tuning dialog
  openCustomTuning();
}

//close dialog for more options
function closeMoreSettings() {
  let instrumentSelector = document.getElementById("instrumentSelector");
  instrumentSelector.style.display = "flex";

  let container = document.getElementById("moreSettingsContainer");
  container.innerHTML = "";

  instrumentChange();
  instrumentTuningChange();
}

//called by changing value in number of strings input
function changeNumberOfStrings(changed_element) {

  let newValue = changed_element.value;

  //display selected number
  document.getElementById("numberOfStringsDisplayNumber").innerHTML = newValue;

  //edit value in settings
  settings.numberOfString = parseInt(newValue);

  //add / remove values to tuning array
  if (settings.tuning.length < newValue) {
    let biggerBy = newValue - settings.tuning.length;
    for (i = 0; i < biggerBy; i++) {
      settings.tuning.push("C");
    }
  } else {
    let smallerBy = settings.tuning.length - newValue;
    settings.tuning.splice(newValue - 1, smallerBy);
  }

  settings.tuning.length = newValue;

  //regenerate tuning dialog
  checkForMaxValues();
  openCustomTuning();
  
}

//called by changing value in number of frets input
function changeNumberOfFrets(changed_element) {

  let newValue = changed_element.value;

    //edit value in settings
    settings.numberOfFrets = parseInt(newValue);

    document.getElementById("numberOfFretsDisplayNumber").innerHTML = newValue;
    checkForMaxValues();
}

//check for max values of max string and frets
function checkForMaxValues(){
  let numberOfStrings = settings.numberOfString;
  let numberOfFrets = settings.numberOfFrets;

  let fretdisplay = document.getElementById("numberOfFretsDisplayNumber");
  let fretinput = document.getElementById("numberOfFretsInput");

  if(numberOfStrings <= 10){
    return null;
  }

  if(numberOfStrings <= 12){
    if(numberOfFrets > 30){
      settings.numberOfFrets = 30;
        fretdisplay.innerHTML = 30;
        fretinput.value = 30;
    }
  }

  if(numberOfStrings == 13){
    if(numberOfFrets > 15){
      settings.numberOfFrets = 15;
        fretdisplay.innerHTML = 15;
        fretinput.value = 15;
    } 
  }

  if(numberOfStrings == 14 || numberOfStrings == 15){
    if(numberOfFrets > 12){
      settings.numberOfFrets = 12;
        fretdisplay.innerHTML = 12;
        fretinput.value = 12;
    } 
  }

  if(numberOfStrings == 16){
    if(numberOfFrets > 10){
      settings.numberOfFrets = 10;
        fretdisplay.innerHTML = 10;
        fretinput.value = 10;
    } 
  }
}


//create custom tuning dialog
function openCustomTuning() {

  //get container
  let customTuningContainer = document.getElementById("customTuningContainer");
  customTuningContainer.innerHTML = "";

  //loop through all strings
  let numberOfStrings = settings.numberOfString;
  for (i = 0; i < numberOfStrings; i++) {
    let stringContainer = document.createElement("div");
    stringContainer.className = "custom-tuning-string-container";

    let text = document.createElement("div");
    text.innerHTML = i + 1;

    let stringInput = document.createElement("select");
    stringInput.type = "number";
    stringInput.id = "stringInput_" + i;
    stringInput.max;
    stringInput.oninput = function () {
      changeTuning(this);
    };

    for (x = 0; x < tones.length; x++) {
      let option = document.createElement("option");
      option.value = tones[x];
      option.text = tones[x];
      //check if option is set in settings
      if (settings.tuning[i] == tones[x]) {
        console.log(true);
        option.selected = true;
      }

      stringInput.appendChild(option);
    }
    stringContainer.appendChild(text);
    stringContainer.appendChild(stringInput);

    customTuningContainer.appendChild(stringContainer);
  }
}

//change tuning (IN MORE OPTIONS DIALOGE)
function changeTuning(changed_element) {
  let element_id = changed_element.id;
  let splittedArray = element_id.split("_");
  let tuningId = splittedArray[1];
  settings.tuning[tuningId] = changed_element.value;
}

//change pre defined instrument
function instrumentChange() {
  console.log("instrumentChange");

  let instrument = document.getElementById("instrumentSelectElement").value;

  settings.numberOfString = predefinedinstruments[instrument].numberOfStrings;
  settings.numberOfFrets = predefinedinstruments[instrument].numberOfFrets;
  settings.tuning = predefinedinstruments[instrument].tunings[0];
  loadChordsFromAPI();
  //tuningsGenerate(instrument);
}

//generate buttons with predefined tunings
function tuningsGenerate() {
  console.log("tuningsGenerate");

  let instrumentTunings = document.getElementById("instrumentTunings");
  //instrumentTunings.innerHTML = "";


  instrumentTunings.appendChild(tuningSelect);
  loadChordsFromAPI();
}

function instrumentTuningChange(element) {
  let tuning_id = element.id.split("_")[1];

  let instrument = document.getElementById("instrumentSelectElement").value;
  settings.tuning = predefinedinstruments[instrument].tunings[tuning_id];
  //console.log(settings.tuning);


  document.getElementById("instrumentModal").style.display = "none"; 

  document.getElementById("instrumentTunings").value = predefinedinstruments[instrument].tunings[tuning_id][0];

  loadChordsFromAPI();
}



function openOtherTuningModal(){

  document.getElementById("instrumentModal").style.display = "flex";

  //select for tunings
  let tuningSelect = document.getElementById("tuningSelector");
  tuningSelect.innerHTML = "";


  let instrument = document.getElementById("instrumentSelectElement").value;
  let instrumentSetting = predefinedinstruments[instrument];

  for (i = 0; i < instrumentSetting.tunings.length; i++) {
    let tuningOption = document.createElement("div");
    tuningOption.id = "tuningSelect_" + i;
    tuningOption.className = "instrumentChange";
    tuningOption.onclick = function(){
      instrumentTuningChange(this);
    }

    //if tuning is currently Selected

    if(arraysEqual(settings.tuning, instrumentSetting.tunings[i])){
        tuningOption.classList.add("activeInstrumentChange")
    }
    let tuningArray = instrumentSetting.tunings[i];

    //innerText
    let nameContainer = document.createElement("span");
    nameContainer.innerHTML = tuningArray[0];
    tuningOption.appendChild(nameContainer);



    let tuningContainer = document.createElement("span");

    let tuningString = "";
    for (x = 1; x < tuningArray.length; x++) {
      tuningString = tuningString + " " + tuningArray[x];
    }

    tuningString = tuningString.substring(1, tuningString.length);
    tuningContainer.innerHTML = tuningString;
    tuningOption.appendChild(tuningContainer);
    tuningSelect.appendChild(tuningOption);
  }



}


