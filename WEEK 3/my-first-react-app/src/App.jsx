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

// // export default App

// Example
// function App() {
//   return (
//     <div>
//       <p> Hello world</p>
//     </div>

//   )
// }

// export default App

// EXAMPLE 2

// import JSXExample from './components/JSXExample'
// import UserCard from './components/UserCard'
// function App () {
//   return (
//     <div>
//         <JSXExample />
//         <JSXExample></JSXExample>
//       <header>
//       <h1>Welcome to React!</h1>
//       <p>This is my first React component</p>
//       <p>Current time: {new Date().toLocaleTimeString()}</p>
//       </header>
//     </div>
//   )
// }

// export default App

// EXAMPLE 3
// import UserCard from './components/UserCard'

// function App() {
//   return (
//     <div>
//       <h1>User Card</h1>

//       <UserCard 
//         name="Calista" 
//         email="Calista@example.com" 
//         role="Frontend Developer" 

//       />
//     </div>
//   );
// }

// export default App;

// EXAMPLE 4

// import React from 'react';
// import UserCard from './components/UserCard';

// function App() {
//   // 1. Define your array of data
//   const users = [
//     { id: 1, name: 'Calista', email: 'Calista@example.com', role: 'Frontend Developer' },
//     { id: 2, name: 'Alex', email: 'Alex@example.com', role: 'Backend Developer' },
//     { id: 3, name: 'Sarah', email: 'Sarah@example.com', role: 'UI/UX Designer' }
//   ];

//   return (
//     <div>
//       <h1>User Directory</h1>

//       {/* 2. Map over the array to render each UserCard */}
//       {users.map((user) => (
//         <UserCard 
//           key={user.id} 
//           name={user.name} 
//           email={user.email} 
//           role={user.role} 
//         />
//       ))}
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import Layout from './components/Layout';
// import UserCard from './components/UserCard';

// function App() {
//   const users = [
//     { id: 1, name: 'Calista', email: 'Calista@example.com', role: 'Frontend Developer' },
//     { id: 2, name: 'Alex', email: 'Alex@example.com', role: 'Backend Developer' },
//     { id: 3, name: 'Sarah', email: 'Sarah@example.com', role: 'UI/UX Designer' }
//   ];

//   return (
//     <Layout
//       header={
//         <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Admin Dashboard</h1>
//       }
//       sidebar={
//         <nav>
//           <h3 style={{ marginTop: 0 }}>Navigation</h3>
//           <ul style={{ listStyle: 'none', padding: 0 }}>
//             <li style={{ padding: '8px 0' }}>Dashboard</li>
//             <li style={{ padding: '8px 0', fontWeight: 'bold' }}>Users</li>
//             <li style={{ padding: '8px 0' }}>Settings</li>
//           </ul>
//         </nav>
//       }
//     >
//       {/* Anything nested here goes into the `children` slot (Main Content) */}
//       <h2>User Directory</h2>
//       <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
//         {users.map((user) => (
//           <UserCard key={user.id} {...user} />
//         ))}
//       </div>
//     </Layout>
//   );
// }

// export default App;

// EXAMPLE 5: DEFAULT PARAMETERS

// function UserCard({ name = "Calista", email = "calista@example.com", role="Software Developer" }) {
//     return (
//         <div>
//             <h1>{name}</h1>
//             <p>{email}</p>
//             <p>{role}</p>
//         </div>
//     );
// }

// export default UserCard;

import React from "react";
import ProductList from "./components/ProductList.jsx";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <ProductList />
    </div>
  );
}

export default App;