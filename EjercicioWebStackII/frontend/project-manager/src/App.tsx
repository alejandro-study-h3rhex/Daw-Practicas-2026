import { Footer } from "./components/ui/footer"
import { Header } from "./components/ui/header"
import { Main } from "./components/ui/main"
import { ProjectManager } from "./components/ui/projects/project-manager"

export function App() {
  return (
    <>
      <Header />
      <Main>
        <ProjectManager />
      </Main>
      <Footer />
    </>
  )
}

export default App
