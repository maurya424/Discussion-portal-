document.addEventListener('DOMContentLoaded', function () {
    const rightDiv = document.querySelector('.Right');
    const userCommentDiv = document.querySelector('.usercomment');
    const newQuestionButton = document.getElementById('questionsearch');
    const outputDiv = document.querySelector('.Left .Output');
    const responseDiv = document.querySelector('.Response');
    let currentQuestionButton = null;

    rightDiv.style.display = 'block';
    userCommentDiv.style.display = 'none';

    function loadQuestions() {
        const savedQuestions = localStorage.getItem('questions');
        if (savedQuestions) {
            const questions = JSON.parse(savedQuestions);
            questions.forEach(question => {
                const newButton = createQuestionButton(question.subject, question.text);
                outputDiv.appendChild(newButton);
            });
        }
    }

    function saveQuestions() {
        const questionButtons = outputDiv.querySelectorAll('button');
        const questions = Array.from(questionButtons).map(button => {
            return {
                subject: button.dataset.subject,
                text: button.dataset.text
            };
        });
        localStorage.setItem('questions', JSON.stringify(questions));
    }

   
    function createQuestionButton(subject, text) {
        const newButton = document.createElement('button');
        const formattedText = text.replace(/\n/g, '<br>');
        newButton.innerHTML = `<strong>Subject:</strong> ${subject}<br><strong>Question:</strong><br>${formattedText}`;
        newButton.dataset.subject = subject;
        newButton.dataset.text = text;
        newButton.addEventListener('click', function () {
            rightDiv.style.display = 'none';
            userCommentDiv.style.display = 'block';

            document.querySelector('.selectedQuestion').innerHTML = newButton.innerHTML;

            currentQuestionButton = newButton;

            responseDiv.innerHTML = '';
        });
        return newButton;
    }

    
    document.getElementById('submit').addEventListener('click', function () {
        const subject = document.getElementById('subject').value;
        const question = document.getElementById('Question').value;

        if (!subject.trim() || !question.trim()) {
            alert('Please enter both subject and question.');
            return;
        }

        const newButton = createQuestionButton(subject, question);

        outputDiv.appendChild(newButton);
        saveQuestions(); 

        document.getElementById('subject').value = '';
        document.getElementById('Question').value = '';
    });

    document.getElementById('search').addEventListener('input', function () {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const questionButtons = outputDiv.querySelectorAll('button');

        questionButtons.forEach(function (button) {
            if (button.textContent.toLowerCase().includes(searchTerm)) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
    });

    newQuestionButton.addEventListener('click', function () {
        rightDiv.style.display = 'block';
        userCommentDiv.style.display = 'none';
    });

    
    document.getElementById('preSubmit').addEventListener('click', function () {
        const name = document.getElementById('EnterName').value;
        const comment = document.getElementById('EnterComment').value;

        if (!name.trim() || !comment.trim()) {
            alert('Please enter both name and comment.');
            return;
        }

        const responseEntry = document.createElement('div');
        responseEntry.innerHTML = `<strong>Name:</strong> ${name}<br><strong>Comment:</strong><br>${comment.replace(/\n/g, '<br>')}`;
        responseEntry.style.border = '1px solid #ccc';
        responseEntry.style.padding = '5px';
        responseEntry.style.marginBottom = '5px';
        responseEntry.style.borderRadius = '5px';
        responseEntry.style.backgroundColor = '#f9f9f9';

        responseDiv.appendChild(responseEntry);
        document.getElementById('EnterName').value = '';
        document.getElementById('EnterComment').value = '';
    });

    document.getElementById('Resolve').addEventListener('click', function () {
        if (currentQuestionButton) {
            outputDiv.removeChild(currentQuestionButton);
            saveQuestions(); 

            userCommentDiv.style.display = 'none';
            rightDiv.style.display = 'block';

            document.querySelector('.selectedQuestion').innerHTML = '';
            responseDiv.innerHTML = '';

            currentQuestionButton = null;
        }
    });

    
    loadQuestions();
});
