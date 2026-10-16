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

// EXAMPLE 1: REAL-TIME CLOCK WITH CLEANUP
// import RealTimeClock from './components/RealTimeClock';

// function App() {
//   return (
//     <main>
//       <RealTimeClock />
//     </main>
//   );
// }

// export default App;

// EXAMPLE 2: WINDOW RESIZE AND SCROLL TRACKER
// import WindowTracker from './components/WindowTracker';

// function App() {
//     return (
//         <WindowTracker />
//     );
// }

// export default App;

// EXAMPLE 3: DATA FETCHING WITH LOADING STATES
// import UserProfile from "./components/UserProfile";

// function App() {
//   return (
//     <div>
//       <UserProfile userId={1} />
//     </div>
//   );
// }

// export default App;

// EXERCISE 1: LIVE CHAT SIMULATOR
// import React from 'react';
// import LiveChatSimulator from './components/LiveChatSimulator';

// function App() {
//   return (
//     <div style={{ padding: '20px' }}>
//       <LiveChatSimulator />
//     </div>
//   );
// }

// export default App;

// EXERCISE 2: SYSTEM MONITOR DASHBOARD
// import React from 'react';
// import SystemMonitor from './components/SystemMonitor'; 
// function App() {
//   return (
//     <div className="App">
//       <SystemMonitor />
//     </div>
//   );
// }

// export default App;

// EXAMPLE 1: USER MANAGEMENT SYSTEM
// import UserManagement from "./components/UserManagement";

// function App() {
//     return (
//         <UserManagement />
//     );
// }

// export default App;

// EXERCISE 1: NEWS AGGREGATOR
import NewsAggregator from "./components/NewsAggregator";

// function App() {
//   return (
//     <div>
//       <h1>News Aggregator</h1>

//       <NewsAggregator />
//     </div>
//   );
// }

// export default App;

// EXERCISE 2: WEATHER FORECAST APP
// import WeatherApp from "./components/WeatherApp";

// function App() {
//   return (
//     <div>
//       <WeatherApp />
//     </div>
//   );
// }

// export default App;