const questions = [ 

    {
        question:"1.Javascript is an _______ language?",
        optionA:"Object-Oriented",
        optionB:"Object-Based",
        optionC:"Procedural",
        optionD:"None of the above",
        correctOption:"optionA"
    },
    {
        question:"2.  Which of the following keywords is used to define a variable in Javascript?",
        optionA:"var",
        optionB:"let",
        optionC:"Both A and B",
        optionD:"None of the above",
        correctOption:"optionC"
    },
    {
        question:"3. Which of the following methods is used to access HTML elements using Javascript?",
        optionA:"getElementById",
        optionB:"getElementsByClassName",
        optionC:"Both A and B",
        optionD:"None of the above",
        correctOption:"optionC"
    },
    {
        question:"4.Which of the following methods can be used to display data in some form using Javascript?",
        optionA:"document.write()",
        optionB:"console.log",
        optionC:"window.alert()",
        optionD:"All of the above",
        correctOption:"optionD"
    },
    {
        question:"5.How can a datatype be declared to be a constant type?",
        optionA:"const",
        optionB:"var",
        optionC:"let",
        optionD:"constant",
        correctOption:"optionA"
    },
    {
        question:"6. What keyword is used to check whether a given property is valid or not?",
        optionA:"in",
        optionB:"is in",
        optionC:"exists",
        optionD:"lies",
        correctOption:"optionA"
    },
    {
        question:"7.When an operator’s value is NULL, the typeof returned by the unary operator is: ",
        optionA:"Boolean",
        optionB:"Undefined",
        optionC:"Object",
        optionD:"Integer",
        correctOption:"optionC"
    },
    {
        question:"8.Which of the following code creates an object?",
        optionA:"var book = Object();",
        optionB:"var book = new Object();",
        optionC:"var book = new OBJECT();",
        optionD:"var book = new Book();",
        correctOption:"optionB"
    },
    {
        question:"9.Which of the following function of String object combines the text of two strings and returns a new string?",
        optionA:"add()",
        optionB:"merge()",
        optionC:"concat()",
        optionD:"append()",
        correctOption:"optionC"
    },
    {
        question:"10.Which of the following are not server-side Javascript objects?",
        optionA:"Date",
        optionB:"FileUpload",
        optionC:"Function",
        optionD:"All of the above",
        correctOption:"optionD"
    },

]


let shuffledQuestions = [] 

function handleQuestions() { 
    
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0


function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]  
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
           
            correctOption = option.labels[0].id
        }
    })
   
   
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
           
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
           
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

   
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}


