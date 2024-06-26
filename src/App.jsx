import { Provider } from "react-redux";
import Todo from "./app/components/Todo";
import store from "./app/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}

export default App;
