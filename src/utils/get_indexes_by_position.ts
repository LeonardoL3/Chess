export function get_indexes_by_position(position: string) {
  return {row: Number(position[1]) - 1, col: position[0].charCodeAt(0)-97}
}