import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;

  @ViewChild('inputFisico') txtInputFisico!: ElementRef;

  checkCompletado!: FormControl;
  txtInput!: FormControl;

  editando: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto , Validators.required);
    this.checkCompletado.valueChanges
      .subscribe( valor => {
        const {id} = this.todo;
        this.store.dispatch(actions.toggle({id}));
      })
  }

  editar(): void {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout( () => this.txtInputFisico.nativeElement.select() , 1 );
  }

  terminarEdicion(): void {

    this.editando = false;

    if( this.txtInput.valid && this.txtInput.value !== this.todo.texto){
      const {id} = this.todo;
      const {value: texto} = this.txtInput;
      this.store.dispatch(actions.editar({id , texto}));
    }
  }

  borrar(): void {
    const {id} = this.todo;
    this.store.dispatch(actions.borrar({id}))
  }

}
