import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useEffect } from 'react';
import { getFilteredTodos } from './services/todos';
import { todosSlice } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos().then(res => {
      dispatch(todosSlice.actions.SET(res));
    });
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!!todos.length ? (
                <TodoList todos={getFilteredTodos(todos, query, status)} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {!!currentTodo && <TodoModal />}
    </>
  );
};
