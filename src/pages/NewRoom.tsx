import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'

import '../styles/auth.scss'
import { database } from '../services/firebase'

export const NewRoom = () => {

    const {user} = useAuth()
    const history = useHistory()
    const [ newRoom, setNewRoom ] = useState('')

    const handleCreateRoom = async (event: FormEvent) => {
        event.preventDefault()

        if(newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
        console.log(newRoom)
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={e => setNewRoom(e.target?.value)}
                            value={newRoom}
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