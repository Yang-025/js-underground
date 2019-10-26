export interface PuzzleItem {
  top: number
  left: number
  id: number
  name: string
  imgSrc: string
  canMerge: number[]
  imgPosition: { left: string, top: string }
  type: string
}




export interface ReferenceLine {
  x: number
  y: number
}
