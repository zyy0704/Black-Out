
var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var a = document.querySelector("a");
var item = document.getElementsByTagName("li");
var delButtons = document.getElementsByClassName("Delete");
var shuffleButton = document.getElementById("shuffle");


var loadButton = document.getElementById("load");
var savedBod = document.getElementById("savedSets");
var dropdown = document.getElementById("dropdown-content");
var dropdownDelete = document.getElementById("dropdown-delete");
var didStrike = 0;
let notes = [];
let sets = [];

// while(sets.length > 0){
// 	localStorage.setItem("set",JSON.stringify(sets));
// }

if(performance.navigation.type == performance.navigation.TYPE_RELOAD){

	var JSONset = localStorage.getItem("set");
	sets = JSON.parse(JSONset);
	console.log(sets);
	if(sets.length > 0){
		for(var i = 0; i < sets.length; i++){
			console.log(sets[i]);
			createDropDown(sets[i].toString(),dropdown);
			createDropDown(sets[i].toString(),dropdownDelete);
		}
	}
}

//adding notes using mouse

if(button){
	button.addEventListener("click",function(){
		if(input.value.length > 0){
			createTask();
			input.value = "";
			highlightSelection();
			deleteTask();

		} 
	})
}

//adding notes by enter key
if(input){
	input.addEventListener("keypress",function(event){
		if(input.value.length > 0 && event.code==="Enter"){
			createTask();
			input.value = "";
			deleteTask();

		} 
	})
}

//creating note
function createTask(){
	var li = document.createElement("li");
	li.setAttribute("class","note");
	let note = {
		id:"",
		text: input.value
	}
	console.log(notes);
	notes.push(note);
	addDelete(li);
	li.appendChild(document.createTextNode(input.value));
	ul.appendChild(li);
	addAnswerBox(li);
}


//adding delete button when adding notes
function addDelete(parent){
	del = document.createElement("button")
	del.setAttribute("class","Delete");
	var buttonElem = parent.appendChild(del);
	buttonElem.innerHTML = "&#9711";
}

//adding answer box when adding notes
function addAnswerBox(parent){
	var input = document.createElement("input");
	input.setAttribute("class","input");
	var answerElem = parent.appendChild(input);
}


//delete note
function deleteTask(){
	for(var i = 0; i < delButtons.length; i++){
		delButtons[i].addEventListener("click", function(){
			if(this.id != "enter"){
				this.parentElement.remove();

			}})}
	}

//highlight function
function highlightSelection() {
	var selected;

	if (window.getSelection)
		selected = window.getSelection();
        // else if (typeof document.selection != "undefined")
        //     selected = document.selection;

        var range = selected.getRangeAt(0);

        if (range && !selected.isCollapsed) {
        	if (selected.anchorNode.parentNode == selected.focusNode.parentNode) {
        		var span = document.createElement('span');
        		span.className = 'highlight';
        		range.surroundContents(span);
        		span.addEventListener("mouseover",function(){
        			span.classList.toggle("removeHighlight");
        		})

        		span.addEventListener("mouseout",function(){
        			span.classList.toggle("removeHighlight");
        		})
        	}
        }

    }

//shuffle function
function shuffle(){
	var ul = document.querySelector('ul');
	for (var i = ul.children.length; i >= 0; i--) {
		ul.appendChild(ul.children[Math.random() * i | 0]);
	}
}

//save option
function save(){
	if(notes.length > 0){
		let id = prompt("Name Your Study Set!");
		for(var i = 0; i < notes.length; i++){
			let note = notes[i];
			if(note.id == ""){
				note.id = id;
			}
			
		}

		sets.push(id);
		localStorage.setItem("set",JSON.stringify(sets));

		var notesById = [];
		for(var i = 0; i < notes.length; i++){
			if(notes[i].id == id){
				notesById.push(notes[i]);
			}
		}
		localStorage.setItem(id,JSON.stringify(notesById));


		clearPage(item);
		createDropDown(id,dropdown);
		createDropDown(id,dropdownDelete);
	}
}

function createDropDown(x,y){
	var setName = document.createElement("a");
	var setText = document.createTextNode(x);
	setName.setAttribute('href',"#");
	setName.setAttribute("class",x);
	setName.appendChild(setText);
	y.appendChild(setName);
	setName.addEventListener("click", function(){
		clearPage(item);
		displaySet(x,y);
	})

}

function displaySet(x,y){
	var JSONset = localStorage.getItem(x);
	var notes = JSON.parse(JSONset);
	if(y == dropdown){
		for(var i = 0; i < notes.length; i++){
			loadNote(notes[i].text);
		}
	} else{
		deleteNote(x);
		
	}

}

function loadNote(x){
	var li = document.createElement("li");
	li.setAttribute("class","note");
	addDelete(li);
	li.appendChild(document.createTextNode(x));
	ul.appendChild(li);
	addAnswerBox(li);
}

function deleteNote(x){
	const index = sets.indexOf(x);
	console.log(index);
	if(index > -1){
		sets.splice(index,1);
	}
	console.log(x);
	var setToDelete = document.getElementsByClassName(x);
	console.log(setToDelete[0]);
	setToDelete[0].parentNode.removeChild(setToDelete[0]);
	setToDelete[0].parentNode.removeChild(setToDelete[0]);
	localStorage.removeItem("set");
	localStorage.removeItem(x);
	localStorage.setItem("set",JSON.stringify(sets));
	console.log(sets)
}

function clearPage(x){
	while(x.length > 0){
		var i = 0;
		x[i].parentNode.removeChild(x[i]);
		i++;
	}
}







