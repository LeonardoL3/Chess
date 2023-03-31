"use client"

import { IBoard, useChessboard } from "@/hooks/useChessboard"
import styles from './chess.module.css'
import cn from 'classnames'

export default function Chess() {
  const { chessboard, handlePieceClick } = useChessboard()

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
                  className={cn(styles.piece, {[styles.movable]: col.isPossibleMove, [styles.attackable]: col.isAttackable})}
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