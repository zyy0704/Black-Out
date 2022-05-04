
var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");
var delButtons = document.getElementsByClassName("Delete");
var shuffleButton = document.getElementById("shuffle");


var loadButton = document.getElementById("load");
var savedBod = document.getElementById("savedSets");
var dropdown = document.getElementById("dropdown-content");
var didStrike = 0;
let notes = [];
let sets = [];

while(sets.length > 0){
	localStorage.setItem("set",JSON.stringify(sets));
}

if(performance.navigation.type == performance.navigation.TYPE_RELOAD){
	var JSONset = localStorage.getItem("set");
	sets = JSON.parse(JSONset);
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

function loadNote(x){
	var li = document.createElement("li");
	li.setAttribute("class","note");
	addDelete(li);
	li.appendChild(document.createTextNode(x));
	ul.appendChild(li);
	addAnswerBox(li);
}

//adding delete button when adding tasks
function addDelete(parent){
	del = document.createElement("button")
	del.setAttribute("class","Delete");
	var buttonElem = parent.appendChild(del);
	buttonElem.innerHTML = "&#9711";
}

function addAnswerBox(parent){
	var input = document.createElement("input");
	input.setAttribute("class","input");
	var answerElem = parent.appendChild(input);
}


//delete task
function deleteTask(){
	for(var i = 0; i < delButtons.length; i++){
		delButtons[i].addEventListener("click", function(){
			if(this.id != "enter"){
				this.parentElement.remove();

			}})}
	}

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

    function shuffle(){
    	var ul = document.querySelector('ul');
    	for (var i = ul.children.length; i >= 0; i--) {
    		ul.appendChild(ul.children[Math.random() * i | 0]);
    	}
    }

    function save(){
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
    	for(var i = 0; i < item.length; i++){
    		item[i].remove();
    	}
    	createDropDown(id);
    }


    function createDropDown(x){
    	var setName = document.createElement("a");
    	var setText = document.createTextNode(x);
    	setName.setAttribute('href',"javascript:void(0)");
    	setName.appendChild(setText);
    	dropdown.appendChild(setName);
    	setName.addEventListener("click", function(){
    		displaySet(x);
    	})

    }

    function displaySet(x){
    	clearPage();
    	var JSONset = localStorage.getItem(x);
    	var notes = JSON.parse(JSONset);
    	for(var i = 0; i < notes.length; i++){
    		loadNote(notes[i].text);
    	}

    }

    function clearPage(){
    	for(var i = 0; i < item.length; i++){
    		item[i].remove();
    	}
    }







