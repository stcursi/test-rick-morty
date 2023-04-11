import { Routes, Route } from 'react-router-dom';
import './App.css';
import { CharactersScreen } from './screens/character/characterScreen.component';
import { EpisodesScreen } from './screens/episodes/episodesScreen.component';
import { HomeScreen } from './screens/home/homeScreen.component';

function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/episodes" element={<EpisodesScreen />} />
       </Routes>
    </>
 );
  return (
    <div className="container">
      <CharactersScreen />
    </div>
  );
}

export default App;
