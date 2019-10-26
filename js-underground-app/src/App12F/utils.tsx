import * as R from 'ramda';
import { PuzzleItem } from './interface';


function updateDataById<T>(id: number, newObj: T, currentData: T[]): Array<T> {
  return R.map(
    R.when(R.propEq('id', id), () => { return newObj; }),
    currentData);
}


// 如果有很靠近的item可以拼起來就回傳id
function checkCloser(id: number, puzzleList: PuzzleItem[]): number[] {
  // 根據id找出有沒有接近的puzzleList的item
  return [2];
}

export { updateDataById, checkCloser };
