import "./App.css"
import Todo from "./components/Todo"
import ParticlesComponent from "./components/ParticlesComponent"
 
function App() {
  return (
    <div className="relative min-h-screen w-full">
      <ParticlesComponent id="tsparticles" />
      <div className=" m-8 relative z-10">
        <Todo />
      </div>
    </div>
  )
}
 
export default App
 