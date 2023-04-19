import logo from './logo.svg';
import './App.css';
import AudioList from './components/AudioList';
import Player from './components/AudioLists';






function App() {
  return (
    <>
      <div className="App">
        <h1>Audio List </h1>
      </div>


      {/* <Player /> */}
      <AudioList />


    </>
  );
}

export default App;
