import imgLogo from '../assets/images/logo.svg'
import {Button} from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import '../styles/room.scss'

export const Room = () => {
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={imgLogo} alt="LetMeAsk" />
                    <RoomCode code="-MdB-XIaO5Na7oc0ohe9"/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 Perguntas</span>
                </div>

                <form>
                    <textarea
                        placeholder="O que você quer perguntar?"
                    />

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}