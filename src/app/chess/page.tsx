"use client"

import { ChessBoard } from "@/services/ChessBoard"
import { useState } from "react"
import styles from './chess.module.css'

export default function Chess() {
  const [chessboard, setChessboard] = useState(() => {
    const board = new ChessBoard()
    board.populate()
    return board
  })

  function handleMove() {
      const newChessboard = new ChessBoard(chessboard.board)
      newChessboard.move({row: 1, col: 0}, {row: 2, col: 0})
      setChessboard(newChessboard)
  }

  return (
    <div className={styles.container}>
      <div>
      {chessboard.board.map((t, index) => {
        let previewColor = index % 2 === 0 ? 'white' : 'black'
        return (
          <div key={index} className={styles.board}>
            {t.map((x, idx) => {
              const newColor = previewColor === 'white' ? 'black' : 'white'
              previewColor = newColor
              return (
                <span className={styles.piece} key={idx} style={{backgroundColor: newColor}}>{x.pieceInfo?.pieceName}</span>
              )
            })}
          </div>
        )
      })}
      </div>
      <button onClick={handleMove}> CLICA AQUI BROW </button>
    </div>
  )
}

// export const metadata = {
//   title: 'Chess'
// }