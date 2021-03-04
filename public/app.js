// notes array will hold all the notes
let notes = [];

// grab any data from local storage and saved in a 'notes' key
let stored = JSON.parse(localStorage.getItem('notes'));
// if there is any data, spread the data into the notes array 
if (stored !== null) {
    notes = [...stored];
    // this prevents the localStorage from being overwritten and reinitialized as an empty array if the page reloads, which would thereby virtually clear the data in localStorage.
};

// Select HTML items
const form = document.querySelector('form');
const autoResizeElements = document.querySelectorAll('.auto-resize');
const noteBoard = document.querySelector('#note-board');

// -----------------------------
// FUNCTIONALITY
// -----------------------------

// Here we create the note data by grabbing whatever information is in the form at the time of submission and saving it as an object called noteData.
// This function gets called in the saveNote() 
const createNoteData = () => {
    const noteData = {
        id: Date.now(),
        title: document.querySelector('#new-note-title').value,
        content: document.querySelector('#new-note-content').value
    }

    return noteData;
};

// Logic for rendering notes that are saved
// This function gets called in saveNote()
const renderNote = (note) => {
// Create the dom elements needed for every note 
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
    // add note to notes array and localstorage
    notes.push(note);
    localStorage.setItem( 'notes', JSON.stringify(notes) );
    // NOTE: rendering should probably not happen inside this function    
    renderNote(note);
    // clear the form for new entries
    form.reset();
};

// 
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

