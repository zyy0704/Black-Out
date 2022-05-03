
var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");
var delButtons = document.getElementsByClassName("Delete");
var shuffleButton = document.getElementById("shuffle");


var loadButton = document.getElementById("load");
var savedBod = document.getElementById("savedSets");
var didStrike = 0;
let notes = [];
let sets = [];

//adding notes using mouse

if(button){
button.addEventListener("click",function(){
	if(input.value.length > 0){
		createTask();
		input.value = "";
		//strikeout();
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
		//strikeout();
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

	// var check = document.createElement("button");
	// check.setAttribute("class","check");
	// var checkAnswer = parent.appendChild(check);
}

function load(){
	var setButton = document.createElement("button");
	setButton.setAttribute("class","chooseSetButton");
	setButton.innerHTML = "hi";
	document.getElementById("savedSets").appendChild(setButton);
}

// strike out task 
// function strikeout(){
// for(var i=0; i < item.length; i++){
// 	item[i].addEventListener("click", function(){
// 		this.classList.toggle("done");
// 	})
// }
// }


//delete task
function deleteTask(){
	for(var i = 0; i < delButtons.length; i++){
		delButtons[i].addEventListener("click", function(){
			if(this.id != "enter"){
				this.parentElement.remove();

			}})}
		// 	if(didStrike == 0){
		// 		this.innerHTML ="&#10003";
		// 	for(var i=0; i < item.length; i++){
		// 		item[i].addEventListener("click", function(){
		// 			this.classList.toggle("done");

		// 		})
		// 	}
		// 	didStrike = 1;
		// 	}else{
		// 		for(var i=0; i < item.length; i++){
		// 		item[i].addEventListener("click", function(){
		// 			this.classList.toggle("undone");

		// 		})
		// 	}
		// 		this.innerHTML = "&#9711";
		// 		didStrike = 0;
		// }

		// })}
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
    			note.id = id;
    		
    	}
    	sets.push(id);
    	localStorage.setItem(id,JSON.stringify(notes));
    	for(var i = 0; i < item.length; i++){
    		item[i].remove();
    	}
    }

    // function tnrFont(){
    // 	var items = ul.children;
    // 	for(i = 0; i < items.length; i++){
    // 		items[i].style.fontFamily = "New Times Roman";
    // 	}
    // }

    // function cnFont(){
    // 	var items = ul.children;
    // 	for(i = 0; i < items.length; i++){
    // 		items[i].style.fontFamily = "Courier New";
    // 	}
    // }

    // function vFont(){
    // 	var items = ul.children;
    // 	for(i = 0; i < items.length; i++){
    // 		items[i].style.fontFamily = "Verdana";
    // 	}
    // }








