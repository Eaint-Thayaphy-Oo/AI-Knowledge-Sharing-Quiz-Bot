import "./App.css";
import CreateRoom from "./pages/CreateRoom";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <div className="app-container">
        <h1>Welcome to the Quiz Game</h1>
        <CreateRoom />
      </div>
    </>
  );
}

export default App;
