import { Pipe, PipeTransform } from '@angular/core';
import { filtrosValidos } from '../../filtro/filtro.actions';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {

  transform(todos: Array<Todo>, filtro: filtrosValidos): Array<Todo> {

    switch(filtro){
      case 'completados':
        return todos.filter( todo => todo.completado);
      case 'pendientes':
        return todos.filter( todo => ! todo.completado);
      default:
        return todos;
    }

    return [];
  }

}
