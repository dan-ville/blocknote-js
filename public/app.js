// notes array will hold all the notes
let notes = [];

// check if local storage has any data in a 'notes' key
let stored = JSON.parse(localStorage.getItem('notes'));
// if so, spread the data into the notes array 
// this prevents the localStorage from being overwritten and reinitialized as an empty array if the page reloads, which would thereby virtually clear the data in localStorage.
if (stored !== null) {
    notes = [...stored];
}

const form = document.querySelector('form');
const autoResizeElements = document.querySelectorAll('.auto-resize')

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
}

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
       
    // clear the form for new entries
    form.reset();
    console.log('form submitted');
    console.log({localStorage});

}

// -----------------------------
// EVENT LISTENERS
// -----------------------------


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
// -----------------------------


// This allows the textarea to automatically resize instead of remaining the same height with a scroll bar
autoResizeElements.forEach(element => {
    element.addEventListener('input', autoResize)
})

function autoResize() {
    this.style.height = this.scrollHeight + "px";
}
// -----------------------------

