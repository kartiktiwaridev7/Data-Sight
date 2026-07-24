// function ProjectHeader() {
//     return (
//         < div className="banner">
//             <h1>
//                 Welcome to my Business world 
//                 </h1>
//             <p>I hope you like it and you gain amazing experience </p>
        
//         </div>
//     );
// }

// The Reusable Card Component
function StatCard({ label, metric }) {
  return (
    <div style={{ border: "2px solid #333", : "15px", margin: "10px", display: "inline-block", borderRadius: "8px" }}>
      <h3 style={{ margin: "0 0 10px 0", color: "gray" }}>{label}</h3>
      <h1 style={{ margin: "0" }}>{metric}</h1>
    </div>
  );
}

// The Main App Component
// function App() {
//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h1>Automated EDA Dashboard</h1>
//       <p>Live metrics from the engine</p>
      
//       {/* Rendering our component twice with different props */}
//       <StatCard label="Model Accuracy" metric="95%" />
//       <StatCard label="Datasets Processed" metric="12" />
//     </div>
//   );
// }

function TechBadge({ techName }) {
  return (
    <span style={{ background: "#eee", padding: "5px 10px", margin: "5px", borderRadius: "15px", fontWeight: "bold", fontSize: "14px" }}>
      
      {/* YOUR TURN: Use JSX syntax to display the techName variable here! */}

    </span>
  );
}

export default App;
