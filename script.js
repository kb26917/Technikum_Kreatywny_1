// A personality quiz

// This is an array of objects that stores the personality trait that is prompted to the user and the weight for each prompt. 
// If a personality trait is considered more introverted, it will have a negative weight.
// If a personlity trait is considered more extroverted, it will have a positive weight.

var questions = [
{
	question: 'Wymyślasz scenariusze fantastyczne przed snem?',
	weight: 1,
	class: 'group0'
},
{
	question: 'Często improwizujesz',
	weight: 1,
	class: 'group1'
},
{
	question: 'Jesteś osobą kreatywną',
	weight: 1,
	class: 'group2'
},
{
	question: 'Jesteś introwertykiem',
	weight: -1,
	class: 'group3'
},
{
	question: 'Nie prowadzasz aktywnego trybu życia',
	weight: -1,
	class: 'group4'
},
{
	question: 'Chcesz zarabiać duże pieniądze',
	weight: -1,
	class: 'group5'
},
{
	question: 'Jesteś innowacyjny',
	weight: 1,
	class: 'group6'
},
{
	question: 'Często improwizujesz',
	weight: 1,
	class: 'group7'
}
]

// This array stores all of the possible values and the weight associated with the value. 
// The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
var question_values = [

{
	value: 'Tak',
	class: 'btn-default btn-agree',
    weight: 4
	
}, 
    {
	value: 'Nie',
	class: 'btn-default btn-disagree',
    weight: -4
	
},
{
	value: 'Nie wiem', 
	class: 'btn-default',
    weight: 0
	
}
]

// For each prompt, create a list item to be inserted in the list group
function createQuestionItems() {

	for (var i = 0; i < questions.length; i++) {
		var question_li = document.createElement('li');
		var question_p = document.createElement('p');
		var question_text = document.createTextNode(questions[i].question);

		question_li.setAttribute('class', 'list-group-item question');
		question_p.appendChild(question_text);
		question_li.appendChild(question_p);

		document.getElementById('quiz').appendChild(question_li);
	}
}

// For each possible value, create a button for each to be inserted into each li of the quiz

function createValueButtons() {
	for (var li_index = 0; li_index < questions.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';

		for (var i = 0; i < question_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';

			var button = document.createElement('button');
			var button_text = document.createTextNode(question_values[i].value);
			button.className = 'group' + li_index + ' value-btn btn ' + question_values[i].class;
			button.appendChild(button_text);

			btn_group.appendChild(button);
			group.appendChild(btn_group);

			document.getElementsByClassName('question')[li_index].appendChild(group);
		}
	}
}

createQuestionItems();
createValueButtons();

// Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
// Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
var total = 0;

// Get the weight associated to group number
function findQuestionWeight(questions, group) {
	var weight = 0;

	for (var i = 0; i < questions.length; i++) {
		if (questions[i].class === group) {
			weight = questions[i].weight;
		}
	}

	return weight;
}

// Get the weight associated to the value
function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}

	return weight;
}

// When user clicks a value to agree/disagree with the prompt, display to the user what they selected
$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	// console.log(classList);
	var classArr = classList.split(" ");
	// console.log(classArr);
	var this_group = classArr[0];
	// console.log(this_group);

	// If button is already selected, de-select it when clicked and subtract any previously added values to the total
	// Otherwise, de-select any selected buttons in group and select the one just clicked
	// And subtract deselected weighted value and add the newly selected weighted value to the total
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		total -= (findQuestionWeight(questions, this_group) * findValueWeight(questions_values, $(this).text()));
	} else {
		// $('[class='thisgroup).prop('checked', false);
		total -= (findQuestionWeight(questions, this_group) * findValueWeight(question_values, $('.'+this_group+'.active').text()));
		// console.log($('.'+this_group+'.active').text());
		$('.'+this_group).removeClass('active');

		// console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
		// $(this).prop('checked', true);
		$(this).addClass('active');
		total += (findQuestionWeight(questions, this_group) * findValueWeight(question_values, $(this).text()));
	}

	console.log(total);
})



$('#submit-btn').click(function () {
	// After clicking submit, add up the totals from answers
	// For each group, find the value that is active
	$('.results').removeClass('hide');
	$('.results').addClass('show');
	
	if(total < 0) {
		// document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
		// console.log(document.getElementById('intro-bar').style.width);
		// document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
		document.getElementById('results').innerHTML = '<b>Tu jest rezultat z total < 0';
	} else if(total > 0) {
		document.getElementById('results').innerHTML = '<b>Tu jest rezultat z total > 0';
	} else {
		document.getElementById('results').innerHTML = '<b>Tu jest rezultat z total = 0'
	}

	// Hide the quiz after they submit their results
	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
})

// Refresh the screen to show a new quiz if they click the retake quiz button
$('#retake-btn').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})