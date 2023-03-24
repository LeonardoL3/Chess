import { ChessBoard } from "@/services/ChessBoard"
import styles from './chess.module.css'

export default function Chess() {

  const teste = new ChessBoard()
  teste.populate()
  console.log(teste.board)

  return (
    <div className={styles.container}>
      <div>
      {teste.board.map((t, index) => {
        let previewColor = index % 2 === 0 ? 'white' : 'black'
        return (
          <div key={index} className={styles.board}>
            {t.map((x, idx) => {
              const newColor = previewColor === 'white' ? 'black' : 'white'
              previewColor = newColor
              return (
                <span className={styles.piece} key={idx} style={{backgroundColor: newColor}}>{x.pieceName}</span>
              )
            })}
          </div>
        )
      })}
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Chess'
}