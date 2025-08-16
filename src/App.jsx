import React, { useEffect, useMemo, useState } from 'react'
import foto from './foto.png'

function useScrollTo() {
  return (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

function useRevealOnScroll() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    revealEls.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Molecules() {
  return (
    <div className="molecules" aria-hidden="true">
      <span className="molecule" />
      <span className="molecule" />
      <span className="molecule" />
      <span className="molecule" />
    </div>
  )
}

function Header({ onGo }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="container">
        <div className="nav">
          <a href="#home" className="brand" aria-label="Artur Abel ponto lab" onClick={(e) => { e.preventDefault(); onGo('home') }}>
            <span className="brand-main">Artur Abel</span>
            <span className="brand-dot">.lab</span>
          </a>

          <button className="nav-toggle" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen((s) => !s)}>
            <span></span><span></span><span></span>
          </button>

          <nav className={"nav-links" + (open ? " open" : "")} aria-label="Menu principal">
            <a href="#heroi" onClick={(e) => { e.preventDefault(); onGo('heroi'); setOpen(false) }}>Como eu sou um herói</a>
            <a href="#salvo" onClick={(e) => { e.preventDefault(); onGo('salvo'); setOpen(false) }}>Como eu salvo o mundo</a>
            <a href="#batsinal" onClick={(e) => { e.preventDefault(); onGo('batsinal'); setOpen(false) }}>Meu bat-sinal</a>
          </nav>

          <a href="#batsinal" className="btn btn-cta" onClick={(e) => { e.preventDefault(); onGo('batsinal') }}>
            Clique para me chamar
          </a>
        </div>
      </div>
    </header>
  )
}

export default function App() {
  const onGo = useScrollTo()
  useRevealOnScroll()

  const year = useMemo(() => new Date().getFullYear(), [])
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const nome = (data.get('nome') || '').toString().trim()
    const email = (data.get('email') || '').toString().trim()
    const empresa = (data.get('empresa') || '').toString().trim()
    const mensagem = (data.get('mensagem') || '').toString().trim()

    const texto = `Olá, sou ${nome}${empresa ? ' da ' + empresa : ''}.${email ? ` Meu e-mail: ${email}.` : ''}\n\n${mensagem}`
    const url = `https://wa.me/5551995501677?text=${encodeURIComponent(texto)}`
    window.open(url, '_blank')
  }

  return (
    <>
      <a className="skip-to-content" href="#heroi" onClick={(e) => { e.preventDefault(); onGo('heroi') }}>Pular para o conteúdo</a>
      <Header onGo={onGo} />

      <main id="home">
        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <h1 className="reveal">Laboratório de inovação para levar seu negócio do hoje ao próximo nível.</h1>
              <p className="lead reveal">Consultoria estratégica, criação de softwares personalizados, motores de IA corporativos e automação ponta a ponta.</p>
              <div className="hero-actions reveal">
                <a className="btn btn-primary" href="#heroi" onClick={(e) => { e.preventDefault(); onGo('heroi') }}>Ver como eu sou um herói</a>
                <a className="btn btn-ghost" href="#batsinal" onClick={(e) => { e.preventDefault(); onGo('batsinal') }}>Clique para me chamar</a>
              </div>
              <ul className="pills reveal" aria-label="Áreas de atuação">
                <li>Consultoria</li>
                <li>Software sob medida</li>
                <li>IA corporativa</li>
                <li>Automação</li>
                <li>Dados</li>
                <li>Arquitetura</li>
              </ul>
            </div>
          </div>
          <Molecules />
        </section>

        <section id="heroi" className="section">
          <div className="container grid-2">
            <div className="reveal">
              <h2>Como eu sou um herói</h2>
              <p className="intro">Eu sou o <strong>Artur Abel</strong> e sou apaixonado por resolver os problemas tecnológicos da sua empresa.</p>
              <p>Sou analista de tecnologia e inovação. Conecto estratégia e execução para acelerar resultados: do diagnóstico à entrega com qualidade de produção. Transformo problemas complexos em soluções claras, escaláveis e mensuráveis.</p>
              <ul className="list">
                <li>Descoberta, definição e priorização de oportunidades</li>
                <li>Arquitetura de soluções seguras e escaláveis</li>
                <li>Integrações entre sistemas e dados</li>
                <li>Aplicações web, APIs e automações</li>
                <li>IA aplicada ao negócio, com governança</li>
              </ul>
            </div>
            <div className="right-col">
              <figure className="profile-card reveal">
                <img className="foto" src={foto} alt="Foto de Artur Abel" loading="lazy" />
                <figcaption>Artur Abel — apaixonado por resolver desafios tecnológicos</figcaption>
              </figure>
              <div className="card-lab reveal">
                <div className="stat">
                  <span className="stat-value">10+ anos</span>
                  <span className="stat-label">em tecnologia e inovação</span>
                </div>
                <div className="stat">
                  <span className="stat-value">fim‑a‑fim</span>
                  <span className="stat-label">da estratégia ao deploy</span>
                </div>
                <div className="stat">
                  <span className="stat-value">segurança</span>
                  <span className="stat-label">como requisito de base</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="salvo" className="section">
          <div className="container">
            <h2 className="section-title reveal">Como eu salvo o mundo</h2>
            <div className="services">
              <article className="service reveal">
                <h3>Consultoria Estratégica</h3>
                <p>Diagnóstico, roadmap, KPIs e plano de execução para capturar valor rápido e sustentável.</p>
                <ul>
                  <li>Discovery, alinhamento e priorização</li>
                  <li>Arquitetura e escolhas tecnológicas</li>
                  <li>Governança e segurança</li>
                </ul>
              </article>
              <article className="service reveal">
                <h3>Softwares Personalizados</h3>
                <p>Aplicações web e APIs sob medida, com foco em experiência, performance e manutenção.</p>
                <ul>
                  <li>Front-end responsivo e acessível</li>
                  <li>Back-end escalável, testes e observabilidade</li>
                  <li>Integrações com sistemas legados</li>
                </ul>
              </article>
              <article className="service reveal">
                <h3>Motores de IA Corporativos</h3>
                <p>IA aplicada às operações: do POC ao produto com qualidade, rastreabilidade e compliance.</p>
                <ul>
                  <li>Assistentes e automações com LLMs</li>
                  <li>RAG, vetorização e pipelines de dados</li>
                  <li>Segurança, privacidade e custo</li>
                </ul>
              </article>
              <article className="service reveal">
                <h3>Automação de Processos</h3>
                <p>Elimine tarefas repetitivas conectando pessoas, sistemas e dados com precisão.</p>
                <ul>
                  <li>Orquestração e integrações</li>
                  <li>Bots, ETL e workflows</li>
                  <li>Métricas e monitoramento</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="batsinal" className="section">
          <div className="container grid-2">
            <div className="reveal">
              <h2>Meu bat-sinal</h2>
              <p>Quer explorar um desafio ou oportunidade? Envie uma mensagem. Eu respondo em até 24h úteis.</p>
              <div className="contact-cards">
                <a className="contact-card" href="mailto:contato@arturabel.lab?subject=Contato%20-%20Artur%20Abel.lab">
                  <span className="label">E-mail</span>
                  <span className="value">arturabel01@gmail.com</span>
                </a>
                <a className="contact-card" href="#" onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText('@arturabel.lab') }} aria-label="Copiar ID de contato">
                  <span className="label">ID</span>
                  <span className="value">@abel_exp</span>
                </a>
                <a className="contact-card" href="https://wa.me/5551995501677"  aria-label="Copiar ID de contato">
                  <span className="label">WhatsApp</span>
                  <span className="value">51 9 9550-1677</span>
                </a>
              </div>
            </div>
            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <div className="row">
                <label>
                  <span>Nome</span>
                  <input type="text" name="nome" placeholder="Seu nome" required />
                </label>
                <label>
                  <span>E-mail</span>
                  <input type="email" name="email" placeholder="voce@empresa.com" required />
                </label>
              </div>
              <label>
                <span>Empresa (opcional)</span>
                <input type="text" name="empresa" placeholder="Nome da empresa" />
              </label>
              <label>
                <span>Mensagem</span>
                <textarea name="mensagem" rows="5" placeholder="Conte o desafio em 3–5 linhas" required></textarea>
              </label>
              <button type="submit" className="btn btn-primary">Enviar bat-sinal</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© {year} Artur Abel.lab — Feito no laboratório de inovação</p>
        </div>
      </footer>
    </>
  )
}


