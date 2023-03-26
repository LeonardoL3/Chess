import { IPieceInfo } from "@/hooks/useChessboard"

export function moves(pieceInfo: IPieceInfo) {
  const axios = pieceInfo.color === 'white' ? '+' : '-'
  const isFirstMove = true

  function pawn() {
    if (isFirstMove) {
      return [{row: 1, col: 0, axios}, {row: 2, col: 0, axios}]
    } else {
      return [{row: 1, col: 0, axios}]
    }
  }

  function rook(){}

  function bishop(){}

  function knight(){}

  function queen(){}

  function king(){}

  return {
    pawn,
    rook,
    bishop,
    knight,
    queen,
    king
  }
}