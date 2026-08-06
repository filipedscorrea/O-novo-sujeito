import { RevealProvider } from './hooks/useScrollReveal'
import './App.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TopicsTicker from './components/TopicsTicker'
import Sobre from './components/Sobre'
import Abordagem from './components/Abordagem'
import Pratica from './components/Pratica'
import Contato from './components/Contato'
import Redes from './components/Redes'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <RevealProvider>
      <Nav />
      <div className="app-shell landing-page-content">
        <Hero />
        <TopicsTicker />
        <Sobre />
        <Abordagem />
        <Pratica />
        <Contato />
        <Redes />
        <Footer />
      </div>
      <WhatsAppButton />
    </RevealProvider>
  )
}

export default App
