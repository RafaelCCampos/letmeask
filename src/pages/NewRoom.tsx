import { Link } from 'react-router-dom'
import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import {Button} from '../components/Button'

import '../styles/auth.scss'

export const NewRoom = () => {
    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="lustração simulando perguntas e respostas"/>
                <strong>Toda pergunta tem uma resposta</strong>
                <p>Crie salas de Q&amp;A ao-vivo e tire as dúvidas dos seus espectadores em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}