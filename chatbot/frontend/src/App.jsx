import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="main-layout">
        <Chatbot
          botName={"Chatbot"}
          botIcon={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5G_lXK5cROdWBjbkK6h3rghuHW1pcfFwDfg&s"}
          botColor={"green"}
        />
    </div>
  );
}

export default App;