import copyImg from '../assets/images/copy.svg'
import '../styles/room-code.scss'

type Props = {
    code: string;
}

export const RoomCode = (props: Props) => {
    const copyRoomCode = () => {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button onClick={copyRoomCode} className="room-code">
            <div>
                <img src={copyImg} alt="Copiar room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}