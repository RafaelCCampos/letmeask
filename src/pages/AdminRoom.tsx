import { useParams } from 'react-router-dom'
import { RoomCode } from '../components/RoomCode'

import imgLogo from '../assets/images/logo.svg'
import {Button} from '../components/Button'


import '../styles/room.scss'
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'

type RoomParams = {
    id: string;
}

export const AdminRoom = () => {
    const params = useParams<RoomParams>()
    const roomId = params.id

    const { user } = useAuth();
    const [ newQuestion, setNewQuestion ] = useState('')
    const { title, questions } = useRoom(roomId)

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
                name: user.name,
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
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined>Encerrar a sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>  
                <div className="question-list">
                {questions.map( question => {
                    return <Question key={question.id} content={question.content} author={question.author} />;
                })}
                </div>
            </main>
        </div>
    )
}