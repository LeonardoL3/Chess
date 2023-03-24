interface IChessPiece {
  currentPosition: string
  pieceName: string
}

export class ChessPiece {

  private chesspiece: IChessPiece

  constructor(chesspiece: IChessPiece) {
    this.chesspiece = chesspiece
  }

  public get piece():IChessPiece {
    return this.chesspiece
  }
}