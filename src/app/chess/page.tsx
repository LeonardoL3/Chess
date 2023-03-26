"use client"

import { IBoard, useChessboard } from "@/hooks/useChessboard"
import styles from './chess.module.css'

export default function Chess() {
  const { chessboard, move, currentSelectedPiece, handlePieceClick } = useChessboard()

  console.log('bem 10', chessboard)

  return (
    <div className={styles.container}>
      <div>
      {chessboard?.map((row, index) => {
        let previewColor = index % 2 === 0 ? 'white' : 'black'
        return (
          <div key={index} className={styles.board}>
            {row.map((col, idx) => {
              const newColor = previewColor === 'white' ? 'black' : 'white'
              previewColor = newColor
              return (
                <button 
                  key={idx}
                  className={`${styles.piece} ${col.isPossibleMove ? styles.movable : ''}`}
                  style={{backgroundColor: newColor}}
                  onClick={() => handlePieceClick(col)}
                  >
                    {col.pieceInfo?.pieceName}
                </button>
              )
            })}
          </div>
        )
      })}
      </div>
    </div>
  )
}