import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  toggle: Boolean = true;
  time = new Date()
  title: string;
  description: string;
  notesData;
  notesList: any = undefined;
  presentNote: any = undefined;
  searchNoteValue: string;
  disableSave: boolean;
  searchData: any[];

  filteredList: any[] = undefined;
  data: any[];
  @ViewChild('f') notesForm : NgForm

  constructor() { }

  ngOnInit(): void {
    this.notesList = JSON.parse(localStorage.getItem('notes'))
  }

  searchNote(){       
    this.filteredList = this.notesList.filter((item) => {    
      return item.title.toLowerCase().includes(this.searchNoteValue.toLowerCase()) || item.description.toLowerCase().includes(this.searchNoteValue.toLowerCase())
    })

    this.filteredList.sort((a, b) =>  (a.title < b.title) ? -1 : ((b.title < a.title) ? 1 : 0))
   
    if(this.searchNoteValue === ''){
      this.notesList = JSON.parse(localStorage.getItem('notes'))
    }
  }

  saveNote(){ 

    this.notesData = {
      title: this.notesForm.value.title,
      description: this.notesForm.value.description,
      time: this.time,
      id: Date.now()
    }
    
    let notes = []

    if(localStorage.getItem('notes')){
      notes = JSON.parse(localStorage.getItem('notes'));
      notes = [this.notesData, ...notes]
    }
    else{
      notes = [this.notesData]
    }   
    

    if(this.presentNote){
      this.notesList = this.notesList.filter((item) => {
         return item.id !== this.presentNote.id
      })
      
      let data = [{title: this.notesForm.value.title, description: this.notesForm.value.description, time: new Date(), id: Date.now()}, ...this.notesList]
      localStorage.setItem('notes', JSON.stringify(data))

    }
    else{
      localStorage.setItem('notes', JSON.stringify(notes))
    }

    this.notesList = JSON.parse(localStorage.getItem('notes'))

    this.filteredList = JSON.parse(localStorage.getItem('notes'))   

    this.presentNote = undefined;

    this.notesForm.resetForm()
    
  }

  viewNote(note){
    this.presentNote = note   
    this.notesForm.form.patchValue({title: note.title, description: note.description})    
  }

  deleteNote(){    
    let notes=[]
    notes = JSON.parse(localStorage.getItem('notes'))
    notes = notes.filter((item) => {
      return item.id !== this.presentNote.id
    })

    localStorage.setItem('notes', JSON.stringify(notes))
    this.notesList = JSON.parse(localStorage.getItem('notes'))
    this.filteredList = JSON.parse(localStorage.getItem('notes'))   
    this.notesForm.resetForm()
  }

  clearData(){
    this.notesForm.resetForm()
    this.presentNote = undefined;
  }

}
