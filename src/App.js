import React from 'react';
import NewStoryPage from './NewStories/newStories';
import SearchPage from './SearchPage/search';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<NewStoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/*" element={<NewStoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
