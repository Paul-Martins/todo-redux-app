import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as actions from '../todo.actions'

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  txtInput: FormControl

  constructor(private store: Store) {
    this.txtInput = new FormControl('' , Validators.required)
  }

  ngOnInit(): void {
  }

  agregar(): void {

    if(this.txtInput.valid){
      const {value: texto} = this.txtInput;
      this.store.dispatch(actions.crear({texto}));
      this.txtInput.reset()
    }

  }

}
