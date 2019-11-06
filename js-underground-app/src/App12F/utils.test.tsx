import * as Utils from './utils2';
import { genFefaultPuzzleList } from './puzzleSetting';



describe('[findNeighborInCombinedList]如果是上下左右的鄰居，要合成同一組', () => {
  it('測項 1', () => {
    let tmpCombinedList = [
      { id: 'c1', pieces: [0, 1, 3] },
      { id: 'c2', pieces: [2, 4, 5] }
    ];
    const puzzleList = genFefaultPuzzleList();
    let res = Utils.findNeighborInCombinedList(tmpCombinedList, puzzleList);

    // 把某group的所有pieces的鄰居都檢查一遍，如果鄰居有出現在別的group裡面，就可以合體
    expect(res).toMatchObject([{ id: 'c1', pieces: [0, 1, 3, 2, 4, 5] }]);

    console.log('res', res);
  });


  it('測項 2', () => {
    let tmpCombinedList = [
      { id: 'c1', pieces: [0, 1, 2] },
      { id: 'c2', pieces: [5, 8] },
    ];
    const puzzleList = genFefaultPuzzleList();
    let res = Utils.findNeighborInCombinedList(tmpCombinedList, puzzleList);

    // 把某group的所有pieces的鄰居都檢查一遍，如果鄰居有出現在別的group裡面，就可以合體
    expect(res).toMatchObject([{ id: 'c1', pieces: [0, 1, 2, 5, 8] }]);

    console.log('res', res);
  });
});
