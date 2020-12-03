let nTitle = $(".note-title");
let nText = $(".note-textarea");
let noteButtonSave = $(".save-note");
let newNoteButton = $(".new-note");
let aListOfNotes = $(".list-container .list-group");



// object 

let currentNotes = {};

let fetchNote = () => {


  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });


};

let storeNotes = (note) => {


  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });


};

let getRidOfNote = (id) => {


  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });


};

let renderTheNotes = () => {
  noteButtonSave.hide();

  if (currentNotes.id) {
    nTitle.attr("readonly", true);
    nText.attr("readonly", true);
    nTitle.val(currentNotes.title);
    nText.val(currentNotes.text);
  } else {
    nTitle.attr("readonly", false);
    nText.attr("readonly", false);
    nTitle.val("");
    nText.val("");
  }
};


let handleNoteSave = function () {
  let newNote = {
    title: nTitle.val(),
    text: nText.val(),
     
  };

  storeNotes(newNote).then(() => {
    getAndRenderNotes();
    renderTheNotes();
  });
};



let eliminateNoteHandle = function (event) {

  event.stopPropagation();
  let note = $(this).parent(".list-group-item").data();
  if (currentNotes.id === note.id) {
    currentNotes = {};
  }
  
  getRidOfNote(note.id).then(() => {
    getAndRenderNotes();
    renderTheNotes();
  });


};

let NoteViewHandle = function () {

  currentNotes = $(this).data();
  renderTheNotes();

};

let handleNewNoteView = function () {

  currentNotes = {};
  renderTheNotes();

};

let renderButtonHandle = function () {

  if (!nTitle.val().trim() || !nText.val().trim()) {
    noteButtonSave.hide();
  } else {
    noteButtonSave.show();
  }

};



let renderNoteList = (notes) => {


  aListOfNotes.empty();

  let noteListItems = [];

  let createsList = (text, withDeleteButton = true) => {
    let $li = $("<li class='list-group-item'>");
    let $span = $("<span>").text(text);
    $li.append($span);

    if (withDeleteButton) {
      let $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }
    return $li;
  };

  if (notes.length === 0) {
    noteListItems.push(createsList("No saved Notes", false));
  }

  notes.forEach((note) => {
    let $li = createsList(note.title).data(note);
    noteListItems.push($li);
  });

  aListOfNotes.append(noteListItems);


};

let getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};

// 

noteButtonSave.on("click", handleNoteSave);

aListOfNotes.on("click", ".list-group-item", NoteViewHandle);

newNoteButton.on("click", handleNewNoteView);

aListOfNotes.on("click", ".delete-note", eliminateNoteHandle);

nTitle.on("keyup", renderButtonHandle);

nText.on("keyup", renderButtonHandle);

getAndRenderNotes();
