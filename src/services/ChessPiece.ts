export class ChessPiece {

  private chesspiece: {name: string}

  constructor(chesspiece: {name: string}) {
    this.chesspiece = chesspiece
  }

  public get piece(): {name: string} {
    return this.chesspiece
  }
}