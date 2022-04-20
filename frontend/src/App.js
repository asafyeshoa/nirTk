import logo from './assets/lendlord.png'
import './Style/App.css';
import DataTable from "./Components/DataTable"


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width={'200px'} alt={'logo'} />
      </header>
        <main className="App-content" >
            <DataTable/>
        </main>
    </div>
  );
}

export default App;
