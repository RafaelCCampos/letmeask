import { useHistory, useParams } from 'react-router-dom'
import { RoomCode } from '../components/RoomCode'

import deleteImg from '../assets/images/delete.svg'
import imgLogo from '../assets/images/logo.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import {Button} from '../components/Button'


import '../styles/room.scss'
//import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'

type RoomParams = {
    id: string;
}

export const AdminRoom = () => {
    const params = useParams<RoomParams>()
    const roomId = params.id
    const history = useHistory()

    //const { user } = useAuth();
    const { title, questions } = useRoom(roomId)

    const handleDeleteQuestion = async (questionId: string) => {
       if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
           await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
       }
    }

    const handleCheckQuestionAsAnswer = async (questionId: string) => {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })

     }
     const handleHighlightQuestion = async (questionId: string) => {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isHighlighted: true,
            })
     }

    const handleEndRoom = async () => {
        await database.ref(`rooms/${roomId}`).update({
            closedAt: new Date(),
        })

        history.push(`/`)
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={imgLogo} alt="LetMeAsk" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button onClick={handleEndRoom} isOutlined>Encerrar a sala</Button>
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
                    return (
                        <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                            isAnswered={question.isAnswered}
                            isHighlighted={question.isHighlighted} 
                        >
                            {!question.isAnswered && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAsAnswer(question.id)}
                                    >
                                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleHighlightQuestion(question.id)}
                                    >
                                        <img src={answerImg} alt="Dar destaqiue à pergunta" />
                                    </button>
                                </>
                            )}
                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover pergunta" />
                            </button>
                        </Question>
                        )
                })}
                </div>
            </main>
        </div>
    )
}