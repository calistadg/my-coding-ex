// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navigation from './components/Navigation'
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import Overview from './pages/Overview';
// import Settings from './pages/Settings';
// import Admin from './pages/Admin';
// import ProtectedRoute from './pages/ProtectedRoute';

// function App() {
//   const isAuthenticated = true; // Change to true to allow access

//   return (
//     <div className="App">
//       <Router>
//         <Navigation />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard/*" element={<Dashboard />}>
//             <Route path="overview" element={<Overview />} />
//             <Route path="settings" element={<Settings />} />
//           </Route>
//           <Route path="/admin" element={
//             <ProtectedRoute isAuthenticated={ isAuthenticated }>
//               <Admin />
//             </ProtectedRoute>
//           } />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

// INTERACTIVE BUTTON COMPONENT
// import React from 'react';
// import InteractiveButton from './components/InteractiveButton';

// function App() {
//   return (
//     <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
//       <h1>Example 1: Interactive Button Component</h1>

//       <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '20px' }}>
//         {/* State 1: Normal */}
//         <div>
//           <InteractiveButton />
//           <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
//             <li>Default event</li>
//             <li>No hover, no click</li>
//           </ul>
//         </div>

//         {/* State 2: Hovered */}
//         <div>
//           <InteractiveButton />
//           <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
//             <li>onMouseEnter (true)</li>
//             <li>onMouseLeave (false)</li>
//           </ul>
//         </div>

//         {/* State 3: Pressed */}
//         <div>
//           <InteractiveButton />
//           <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
//             <li>onMouseDown (true)</li>
//             <li>onMouseUp (false)</li>
//             <li>onClick (clickCount)</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// KEYBOARD EVENT HANDLING
// import { useState } from 'react';
// import KeyboardDemo from './components/KeyboardEventHandl'; // Adjust the import path based on your folder structure

// function App() {
//   return (
//     <div>
//       <KeyboardDemo />
//     </div>
//   );
// }

// export default App;

// FORM HANDLING WITH VALIDATION
// import ContactForm from './components/ContactForm';

// export default function App() {
//   return (
//     <div className="App">
//       <ContactForm />
//     </div>
//   );
// }

// EVENT DELEGATION AND DYNAMICS LISTS
// import DynamicList from './components/DynamicList';

// function App() {
//   return (
//     <div>
//       <h1>Dynamic List Example</h1>
//       <DynamicList />
//     </div>
//   );
// }

// export default App;

//EXERCISE 1:
// import React from 'react';
// import ImageGallery from './EXERCISES/ImageGallery'; // Ensure correct path to ImageGallery file

// export default function App() {
//   return (
//     <div>
//       <ImageGallery />
//     </div>
//   );
// }

//EXERCISE 2:
// import React from 'react';
// import SearchFilter from './EXERCISES/SearchFilter';

// export default function App() {
//   return (
//     <div>
//       <SearchFilter />
//     </div>
//   );
// }

//MINI-PROJECT:
// import React from 'react';
// import QuizApp from './EXERCISES/QuizApp'; 
// export default function App() {
//   return (
//     <div>
//       <QuizApp />
//     </div>
//   );
// }


// 4.5 CONDITIONAL RENDERING & DYNAMIC LISTS
// MULTI-STATE DASHBOARD
// import MultiStateDashboard from './pages/Multi-State-Dashboard';
// import './App.css'; 

// function App() {
//   return (
//     <div className="App">
//       <MultiStateDashboard />
//     </div>
//   );
// }

// export default App;

// ADVANCED PRODUCT FILTER AND SORT
// import ProductCatalog from './pages/ProductCatalog'; 
// function App() {
//   return (
//     <div className="App">
//       <ProductCatalog />
//     </div>
//   );
// }

// export default App;

// NESTED COMMENTS SYSTEM
// import React from 'react';
// import CommentsSystem from './components/CommentsSystem';
// function App() {
//   return (
//     <div className="App">
//       <h1>Nested Comments Demo</h1>
//       <CommentsSystem />
//     </div>
//   );
// }

// export default App;

// WHETHER DASHBOARD
// import React from 'react';
// import WeatherDashboard from './EXERCISES/WeatherDashboard';

// function App() {
//   return (
//     <div className="App">
//       <WeatherDashboard />
//     </div>
//   );
// }

// export default App;

// TASK MANAGEMENT
import React from 'react';
import TaskManagement from './EXERCISES/TaskManagement';

function App() {
  return (
    <div className="App">
      <TaskManagement />
    </div>
  );
}

export default App;