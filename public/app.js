// notes array will hold all the notes
let notes = [];

// check if local storage has any data in a 'notes' key
let stored = JSON.parse(localStorage.getItem('notes'));
// if so, spread the data into the notes array 
// this prevents the localStorage from being overwritten and reinitialized as an empty array if the page reloads, which would thereby virtually clear the data in localStorage.
if (stored !== null) {
    notes = [...stored];
};

// Select HTML items
const form = document.querySelector('form');
const autoResizeElements = document.querySelectorAll('.auto-resize');
const noteBoard = document.querySelector('#note-board');

// -----------------------------
// FUNCTIONALITY
// -----------------------------

// Here we create the note data by grabbing whatever information is in the form at the time of submission and saving it as an object called noteData
const createNoteData = () => {
    const noteData = {
        id: Date.now(),
        title: document.querySelector('#new-note-title').value,
        content: document.querySelector('#new-note-content').value
    }

    return noteData;
};

// Logic for rendering notes that are saved
const renderNote = (note) => {
  const formWrapper = document.createElement("div");
  formWrapper.classList.add("form-wrapper");

  const newForm = document.createElement("form");

  const title = document.createElement("input");
  newForm.appendChild(title);
  title.value = note.title;

  const textArea = document.createElement("textarea");
  newForm.appendChild(textArea);
  textArea.value = note.content;

  formWrapper.appendChild(newForm);
  noteBoard.appendChild(formWrapper);
};

// Here we send the noteData object to the notes array and to local storage
// Therefore, saveNote() does not need to receive the form data but rather call createNoteData()
// Thus, we can use it to create eventListeners that don't need the form data passed to it, since the data gets created AFTER the event trigger. 
const saveNote = (event) => {
    // prevent page refresh on form submit
    event.preventDefault();
    
    // save noteData to note variable
    const note = createNoteData();
    
    // add note to notes array
    notes.push(note);

    // save the notes array to localstorage
    // I THINK THE PROBLEM IS HERE. Whenever the page loads, localstorage should persist the data in its 'notes' key.
    // But since the notes variable is being initialized at the top of the script, outside this function, then every time the page loads, the array is set to empty. Therefore, setting localStorage here will cause the 'notes' key of the localStorage object to be set to the empty notes array.
       
    localStorage.setItem( 'notes', JSON.stringify(notes) );
       
    renderNote(note)
    // clear the form for new entries
    form.reset();
    console.log('form submitted');
    console.log({localStorage});

};


if (notes) {
    for (let note of notes) {
        renderNote(note)
    }
};

// -----------------------------
// EVENT LISTENERS
// -----------------------------


// run saveNote() whenever form is submitted
// form submissions can happen by clicking the Save button or through keyboard shortcut
form.addEventListener('submit', saveNote);

// Submit form with keyboard shortcut: metaKey + enter
document.addEventListener('keydown', (event) => {
    if ( event.ctrlKey && event.key === 'Enter' ) {
        document.querySelector('#save-note-btn').click()        
    } 
});

// -----------------------------
// UX details
// -----------------------------


// This allows the textarea to automatically resize instead of remaining the same height with a scroll bar
autoResizeElements.forEach(element => {
    element.addEventListener('input', (element) => autoResizeInput(element, '50px'))
});

function autoResizeInput(element, defaultHeight) {
    if (element) {
        // if an element has been passed in, this ternary operator will check if it was created by a dom event or if the element was already in the dom, and either way create a target variable
        const target = element.target ? element.target : element;
        // default height is set in case user deletes content
        target.style.height = defaultHeight;
        // height is changed dynamically to match however much content is in the input
        target.style.height = `${target.scrollHeight}px`;
    }
};
// -----------------------------

