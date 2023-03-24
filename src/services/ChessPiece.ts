interface IChessPiece {
  pieceName: string
}

export class ChessPiece {
  pieceName: string

  constructor(chesspiece: IChessPiece) {
    this.pieceName = chesspiece.pieceName
  }

  private is_valid_move(chessPiece: IChessPiece) {
    switch(chessPiece.pieceName) {
      case 'pawn':

    }
  }
}