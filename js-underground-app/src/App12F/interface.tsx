export interface MergeCoordinateItem {
  direction: string
  coordinate: number[] 
}

export interface PuzzleItem {
  top: number
  left: number
  id: number
  name: string
  imgSrc: string
  // canMerge: number[]
  imgPosition: { left: string, top: string }
  // type: string
  // width: number
  // height: number
  coordinate: number[]
  canMergeCoordinate: MergeCoordinateItem[]
}



/* *********************** 參考線 *********************** */
export interface ReferenceLine {
  x: number
  y: number
  width: number
  height: number
}


export enum ELineDirection {
  vertical="vertical",
  horizontal="horizontal"
}

/* *********************** 參考線 END *********************** */
