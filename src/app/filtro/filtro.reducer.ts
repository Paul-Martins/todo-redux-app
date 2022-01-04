import { Action, createReducer, on } from "@ngrx/store";
import { filtrosValidos, setFiltro } from "./filtro.actions";

export const estadoInicial:filtrosValidos = 'todos';    

const _filtroReducer = createReducer<filtrosValidos , Action>(estadoInicial,
    on(setFiltro, (_state , {filtro}) => filtro)
);

export function filtroReducer(state:filtrosValidos | undefined , action:Action){
    return _filtroReducer(state , action);
}