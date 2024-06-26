import { IBoard, IPieceInfo } from "@/hooks/useChessboard"
import { get_indexes_by_position } from "@/utils/get_indexes_by_position"
import { mountMove } from "@/utils/mountMove"

interface Indexes {
  row: number
  col: number
  mode?: 'movable' | 'attackable'
}

export function moves(selectedBoard: IBoard, chessboard: IBoard[][]) {
  const axios = selectedBoard.pieceInfo?.color === 'white' ? '+' : '-'
  const positionIndexes = get_indexes_by_position(selectedBoard.position)
  const isFirstMove = true

  
  function pawn() {
    const finalArray = [] as Indexes[]
    if (isFirstMove) {
      [1, 2].forEach(num => {
        if(!chessboard[mountMove(positionIndexes.row, axios, num)][positionIndexes.col]?.pieceInfo) finalArray.push({row: mountMove(positionIndexes.row, axios, num), col: positionIndexes.col})
      })
    } else {
    }
    return finalArray
  }

  function rook(){
    const finalArray = [] as Indexes[]

    for(let row = positionIndexes.row; row < chessboard.length; row++) {
      if(row+1 < chessboard.length) {
        if (!chessboard[row+1]?.[positionIndexes.col].pieceInfo) {
          finalArray.push({row: row+1, col: positionIndexes.col})
        } else if(chessboard[row+1]?.[positionIndexes.col].pieceInfo) {
          if(chessboard[row+1]?.[positionIndexes.col].pieceInfo?.color !== selectedBoard.pieceInfo?.color) {
            finalArray.push({row: row+1, col: positionIndexes.col, mode: 'attackable'})
          }
          break
        } else {
          break
        }
      }
    }

     for(let row = positionIndexes.row; row >= 0; row--) {
      if(row-1 >= 0) {
        if (!chessboard[row-1]?.[positionIndexes.col].pieceInfo) {
          finalArray.push({row: row-1, col: positionIndexes.col})
        } else {
          break
        }
      }
    }

    for (let col = positionIndexes.col; col < chessboard[positionIndexes.row].length; col++) {
      if (col+1 < chessboard[positionIndexes.row].length) {
        if (!chessboard[positionIndexes.row][col+1]?.pieceInfo) {
          finalArray.push({row: positionIndexes.row, col: col+1})
        } else {
          break
        }
      }
    }

     for (let col = positionIndexes.col; col >= 0; col--) {
      if (col-1 >= 0) {
        if (!chessboard[positionIndexes.row][col+-1]?.pieceInfo) {
          finalArray.push({row: positionIndexes.row, col: col-1})
        } else {
          break
        }
      }
    }

    return finalArray
  }

  function bishop(){
    const finalArray = [] as Indexes[]

    let col = 1
    for (let row = positionIndexes.row+1; row < 8; row++) {

      if (!chessboard[row][positionIndexes.col+col]?.pieceInfo) {
        finalArray.push({row: row, col: positionIndexes.col+col})
      } else {
        break
      }
      col++
    }

    let axiosCol = 1
    for (let row = positionIndexes.row+1; row < 8; row++) {

      if (!chessboard[row][positionIndexes.col-axiosCol]?.pieceInfo) {
        finalArray.push({row: row, col: positionIndexes.col-axiosCol})
      }else {
        break
      }
      axiosCol++
    }

    let prow = 1
    for (let row = positionIndexes.row-1; row >= 0; row--) {
      if (!chessboard[row][positionIndexes.col+prow]?.pieceInfo) {
        finalArray.push({row: row, col: positionIndexes.col+prow})
      } else {
        break
      }
      prow++
    }

    let nrow = 1
    for (let row = positionIndexes.row-1; row >= 0; row--) {
      if (!chessboard[row][positionIndexes.col-nrow]?.pieceInfo) {
        finalArray.push({row: row, col: positionIndexes.col-nrow})
      } else {
        break
      }
      nrow++
    }


    return finalArray
  }

  function knight(){}

  function queen(){
    const finalArray = [...bishop(), ...rook()] as Indexes[]
    return finalArray
  }

  function king(){
    const { row, col } = positionIndexes
    const bishop_first_moves = bishop().filter(b => {
      if (b.row === row+1 || b.row === row-1 || b.col === col+1 || b.col === col-1) {
        return b
      } 
    })

    const rook_first_moves = rook().filter(r => {
      if (r.row === row+1 || r.row === row-1 || r.col === col+1 || r.col === col-1) {
        return r
      } 
    })

    const finalArray = [
      ...bishop_first_moves,
      ...rook_first_moves
    ] as Indexes[]

    return finalArray
  }

  return {
    pawn,
    rook,
    bishop,
    knight,
    queen,
    king
  }
}
