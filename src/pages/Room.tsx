import { useParams } from 'react-router-dom'
import { RoomCode } from '../components/RoomCode'

import imgLogo from '../assets/images/logo.svg'
import {Button} from '../components/Button'


import '../styles/room.scss'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isAnswered: string,
    isHighlighted: string,
}>

type Question = {
    id: string,
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isAnswered: string,
    isHighlighted: string,
}

export const Room = () => {
    const params = useParams<RoomParams>()
    const roomId = params.id

    const { user } = useAuth();
    const [ newQuestion, setNewQuestion ] = useState('')
    const [ questions, setQuestions ] = useState<Question[]>([])
    const [ title, setTitle ] = useState('')

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)
        roomRef.on('value', room => {
            console.log(room.val())
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom?.questions ? databaseRoom.questions : {}

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })
            
            setTitle(databaseRoom?.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId])

    const handleSendClick = async (event: FormEvent) => {
        event.preventDefault();
        if(newQuestion.trim() === '') {
            return
        }

        if(!user) {
            throw new Error(`You must be logged in`)
        }

        const question = {
            content: newQuestion,
            author: {
                nome: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false,
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={imgLogo} alt="LetMeAsk" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendClick}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={e => setNewQuestion(e.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        { user? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) :
                        (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </main>
        </div>
    )
}