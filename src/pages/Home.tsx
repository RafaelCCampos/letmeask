import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import {Button} from '../components/Button'

import '../styles/auth.scss'

import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../App'

export const Home = () => {
    const history = useHistory()

    const { user, signInWithGoogle } = useContext(AuthContext)

    const handleCreateRoom = async () => {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}