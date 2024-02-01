const app = Vue.createApp({
  data() {
    return {
      noteTitle: "",
      noteDescription: "",
      noteText: "",
      notes: localStorage.getItem("notes")
        ? JSON.parse(localStorage.getItem("notes"))
        : [],
      noteId: localStorage.getItem("noteId")
        ? localStorage.getItem("noteId")
        : 1,
      fieldError: false,
      titleError: false,
      textError: false,
      descriptionError: false,
      validFields: false,
      errors: [],
      isDataSaved: false,
    };
  },
  methods: {
    closeNoteDetails() {
      $("#note-details").css("display", "none");
    },
    viewNoteDetails(noteId) {
      $("#note-details").css("display", "flex");
      this.notes.map((note) => {
        if (note.id === noteId) {
          $("#noteTitle").text(":  " + note.noteTitle);
          $("#noteID").text(noteId);
          $("#noteText").text(note.noteText);
          $("#noteDate").text(":  " + note.noteDate);
          $("#noteDescription").text(":  " + note.noteDescription);
        }
      });
    },
    removeTitleError() {
      this.fieldError = false;
      this.titleError = false;
      this.errors = [];
    },
    removeDescriptionError() {
      this.fieldError = false;
      this.descriptionError = false;
      this.errors = [];
    },
    removeTextError() {
      this.fieldError = false;
      this.textError = false;
      this.errors = [];
    },
    saveNote() {
      const bodyCover = $("#bodyCover");

      function reloadPage() {
        window.location.reload();
      }
      function closeForm() {
        bodyCover.removeClass("bodyCoverActive");
        setTimeout(reloadPage(), 3000);
      }
      if (this.noteTitle === "") {
        this.titleError = true;
        const noteError = "Note title is required *";
        this.errors.push(noteError);
        this.fieldError = true;
      }
      if (this.noteText === "") {
        this.textError = true;
        const noteText = "Note text is required *";
        this.errors.push(noteText);
        this.fieldError = true;
      }

      if (this.noteDescription === "") {
        this.descriptionError = true;
        const noteDescription = "Note description is required *";
        this.errors.push(noteDescription);
        this.fieldError = true;
      } else {
        if (
          !this.textError &&
          !this.fieldError &&
          !this.titleError &&
          !this.descriptionError
        ) {
          function padToDigits(num) {
            return num.toString().padStart(2, 0);
          }
          function formatDate(date) {
            return [
              date.getFullYear(),
              padToDigits(date.getMonth() + 1),
              padToDigits(date.getDate()),
            ].join("-");
          }

          const newNote = {
            id: this.noteId,
            noteTitle: this.noteTitle,
            noteDescription: this.noteDescription,
            noteText: this.noteText,
            noteDate: formatDate(new Date()),
          };

          this.notes.push(newNote);
          this.noteTitle = "";
          this.noteText = "";
          this.noteDescription = "";
          this.validFields = true;
          this.noteId = parseInt(this.noteId) + 1;
          localStorage.setItem("noteId", parseInt(this.noteId));
          localStorage.setItem("notes", JSON.stringify(this.notes));
          this.isDataSaved = true;
          setTimeout(closeForm, 4000);
        }
      }
    },
    deteleNote(noteId) {
      this.notes.map((note) => {
        if (note.id === noteId) {
          const currentNotes = this.notes.filter((_note) => {
            return _note.id !== noteId;
          });
          localStorage.setItem("notes", JSON.stringify(currentNotes));
          this.noteId = parseInt(this.noteId - 1);
          localStorage.setItem("noteId", parseInt(this.noteId));
          window.location.reload();
        }
      });
    },
  },
});
app.mount("#afnotes");
