import { moves } from "@/constants/CHESS_PIECES_MOVES"
import { BLACK, WHITE } from "@/constants/CHESS_PIECES_POSITIONS"
import { fill_up_position } from "@/utils/fill_up_position"
import { get_indexes_by_position } from "@/utils/get_indexes_by_position"
import { mountMove } from "@/utils/mountMove"
import { useEffect, useState } from "react"

export type IPieceInfo = {
  pieceName: 'pawn' | 'rook' | 'knight' | 'bishop' | 'king' | 'queen'
  color: 'white' | 'black'
  checkMove?: () => void
}

export interface IBoard {
  position: string
  pieceInfo?: IPieceInfo | null
  isPossibleMove: boolean
}

export function useChessboard() {
  const [chessboard, setChessboard] = useState<IBoard[][]>([])
  const [currentSelectedPiece, setCurrentSelectedPiece] = useState<IBoard | undefined>(undefined)
  const [turn, setTurn] = useState<'white' | 'black'>('white')
  const [rounds, setRound] = useState({white: 0, black: 0})
  const [isMovingMode, setIsMovingMode] = useState(false)

  function start() {
    const board: IBoard[][] = []
    for (let row = 0; row < 8; row++){
      board[row] = []
      for (let col = 0; col < 8; col++){
        board[row][col] = {position: fill_up_position({col, row}), pieceInfo: null, isPossibleMove: false}
      }
    } 

    WHITE.forEach((value) => {
      board[value.row][value.col].pieceInfo = { pieceName: value.pieceName, color: 'white'}
    })

    board[3][3].pieceInfo = { pieceName: 'king', color: 'white'}

    BLACK.forEach((value) => {
     board[value.row][value.col].pieceInfo = { pieceName: value.pieceName, color: 'black' }
    })


    setChessboard(board)
  }

  function resetPossibleMoves(newChessboard: IBoard[][]){
    setCurrentSelectedPiece(undefined)
    return newChessboard.map(row => {
      return row.map(col => {
        return {...col, isPossibleMove: false}
      })
    })
  }

  function move(newPosition: string) {
    const indexes = get_indexes_by_position(newPosition)
    const oldIndexes = get_indexes_by_position(currentSelectedPiece?.position || '')

    const chessboardToMove = chessboard.map((board, rowIdx) => {
      return board.map((b, colIdx) => {
        if (oldIndexes.row === rowIdx && oldIndexes.col === colIdx) {
          return {...b, pieceInfo: null}
        } else if (indexes.row === rowIdx && indexes.col === colIdx) {
          return {...b, pieceInfo: currentSelectedPiece?.pieceInfo}
        } else {
          return b
        }
      })
    })
    const resetedMoves = resetPossibleMoves(chessboardToMove)
   
    setTurn(prevTurn => prevTurn === 'white' ? 'black' : 'white')
    setIsMovingMode(false)
    setChessboard(resetedMoves)
  }

  function validate_moves(board: IBoard) {
    if(!board.pieceInfo || board.pieceInfo?.color !== turn) return null
    const allMoves = moves(board, chessboard)
    const currentMove = allMoves[board.pieceInfo.pieceName as 'pawn']()
    
    const newChessboard = [...chessboard]
    const resetedBoard = resetPossibleMoves(newChessboard)
    const updatedChess = resetedBoard.map((row, rowIdx) => {
      return row.map((col, colIdx) => {
        let finalObj = {...col}
        for (let move = 0; move < currentMove.length; move++) {
          if (rowIdx === currentMove[move].row && colIdx === currentMove[move].col) {
            finalObj = {...col, isPossibleMove: true}
            break
          }
        }
        return finalObj
      })
    })

    

    setCurrentSelectedPiece({...board})
    setIsMovingMode(true)
    setChessboard(updatedChess)
  }

  function handlePieceClick(board: IBoard){
    if (isMovingMode && board.isPossibleMove){
      move(board.position)
    } else if(board.position !== currentSelectedPiece?.position) {
      validate_moves(board)
    }
  }

  useEffect(() => {
    start()
  }, [])

  return {
    chessboard,
    move,
    currentSelectedPiece,
    validate_moves,
    handlePieceClick
  }
}
