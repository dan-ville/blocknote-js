const notes = [];
const form = document.querySelector('form')

const saveNote = (event) => {
    // prevent page refresh on form submit
    event.preventDefault();

    // create a note object
    const note = {
        id: Date.now(),
        title: document.querySelector('#new-note-title').value,
        content: document.querySelector('#new-note-content').value
    }
    // add note to notes array
    notes.push(note);
    console.log(notes);
    // set notes array to local storage
    window.localStorage.setItem('notes', JSON.stringify(notes));
    // clear the form for new entries
    form.reset();
    console.log('form submitted')
}

// run saveNote() whenever form is submitted
// form submissions can happen by clicking the Save button or through keyboard shortcut
form.addEventListener('submit', saveNote)

// Submit form with keyboard shortcut: metaKey + enter
document.addEventListener('keydown', (event) => {
    
    // if ( event.metaKey && event.key === 'Enter' ) {
    //     // PROBLEM: FORM DATA IS NOT BEING PASSED IN, LOCAL STORAGE THUS NOT UPDATED
    //     form.submit();
    //     // document.querySelector('#save-note-btn').click()
    // }
   
})

console.log(notes)
console.log(window.localStorage)