import { Action, createReducer, on } from "@ngrx/store";
import { Todo } from "./models/todo.model";
import * as actions from "./todo.actions";

export const estadoInicial:Array<Todo> = [
    new Todo('Dormir'),
    new Todo('Seguir durmiendo'),
    new Todo('No despertarse'),
];

const _todoReducer = createReducer(estadoInicial,
    on(actions.crear , (state , {texto}) => [ ...state , new Todo(texto) ] ),
    on(actions.toggle , (state , {id}) => state.map( todo => id !== todo.id ? todo : { ...todo , completado: ! todo.completado } ) ),
    on(actions.editar , (state , {id , texto}) => state.map( todo => id !== todo.id ? todo : { ...todo , texto } ) ),
    on(actions.borrar , (state , {id}) => state.filter( todo => id !== todo.id ) ),
    on(actions.toggleAll , (state , {completar}) => state.map( todo => ({ ...todo , completado: completar }) ) ),
    on(actions.borrarAll , (state) => state.filter( todo => ! todo.completado ) )
);

export function todoReducer(state: Array<Todo> | undefined , action: Action) {
    return _todoReducer(state , action);
};