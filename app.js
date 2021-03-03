const notes = [];
const form = document.querySelector('form');
const autoResizeElements = document.querySelectorAll('.auto-resize')

// Here we create the note data
const createNoteData = () => {
    const noteData = {
        id: Date.now(),
        title: document.querySelector('#new-note-title').value,
        content: document.querySelector('#new-note-content').value
    }

    return noteData;
}

// Here we extract the note data
// Therefore, saveNote() does not need to receive the form data but rather call createNoteData()
// Thus, we can use it to create eventListeners that don't need the form data passed to it, since the data gets created AFTER the event trigger. 
const saveNote = (event) => {
    // // prevent page refresh on form submit
    event.preventDefault();
    // save noteData to note variable
    const note = createNoteData();
    // add note to notes array
    notes.push(note);
    // set notes array to local storage
    if ( localStorage.getItem('notes') !== null ) {    
        localStorage.setItem( 'notes', JSON.stringify(notes) );
    }   
    // clear the form for new entries
    form.reset();
    console.log('form submitted')
}

// run saveNote() whenever form is submitted
// form submissions can happen by clicking the Save button or through keyboard shortcut
form.addEventListener('submit', saveNote)

// Submit form with keyboard shortcut: metaKey + enter
document.addEventListener('keydown', (event) => {
    if ( event.ctrlKey && event.key === 'Enter' ) {
        document.querySelector('#save-note-btn').click()        
    } 
})

// -----------------------------
// UX details

// This allows the textarea to automatically resize instead of remaining the same height with a scroll bar
autoResizeElements.forEach(element => {
    element.addEventListener('input', autoResizeHeight)
})

function autoResizeHeight() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
  this.style.borderColor = "green";
}

// -----------------------------