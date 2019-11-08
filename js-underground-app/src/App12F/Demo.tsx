import React, { useRef, RefObject, useEffect, useState } from 'react';
import * as R from 'ramda';
import PuzzlePieceSvg from './PuzzlePieceSvg';
import CombinedPuzzlePieceSvg from './CombinedPuzzlePieceSvg';
import { PuzzleItem, CombinedList } from './interface';
import * as Utils from './utils';
import { shufflePuzzleList } from './puzzleSetting';
import BGImg from './assets/img-bg-Qingming.png';
import Playground from './Playground';

import styled from 'styled-components';
// import './main.scss';

const StyledWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Noto+Serif+TC&display=swap");
  width: 100%;
  height: 100vh;
  font-family: "Noto Serif TC", serif;
  color: #fff;

  button {
    /* reset button style */
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    /* reset button style */
  }

  .background-img {
    background-image: ${props => `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BGImg})`};
    filter: blur(5px);
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background-size: cover;
    z-index: -1;
  }

  .wrapper {
    width: 100%;
    height: 100vh;
  }

  .h1 {
    text-align: center;
    font-weight: bold;
    font-size: 36px;
    line-height: 51px;
    margin-top: 47px;
    margin-bottom: 10px;
  }

  .retry {
    border: 2px solid #FFFFFF;
    font-size: 24px;
    line-height: 35px;
    width: 350px;
    height: 67px;
    margin-top: 10px;
    margin-bottom: 31px;
    cursor: pointer;
  }

  .svg {
    width: 100%;
    height: calc(100% - 300px);
    stroke: red;
  }

`;


const Demo: React.FC = () => {
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [puzzleList, setPuzzleList] = useState<PuzzleItem[]>(shufflePuzzleList());
  const [highlightList, setHighlightList] = useState<number[]>([]);
  const [activePuzzleId, setActivePuzzleId] = useState<number | string>(-1);
  const [combinedList, setCombinedList] = useState<CombinedList[]>([
    { id: 'c1', pieces: [0, 1, 2, 3, 4, 5, 6, 7] }
  ]);

  // x: item左上角的x座標
  // y: item左上角的y座標
  function handleDrag(id: number, x: number, y: number) {
    if (!isMoving) {
      setIsMoving(true);
    }

    // 找到目前在drag的拼圖
    const selectedItem = puzzleList.find(item => item.id === id);
    if (!selectedItem) {
      return;
    }

    // 更新目前在drag的拼圖的座標
    const updatedData = Utils.updateDataById(
      selectedItem.id,
      {
        ...selectedItem,
        left: x,
        top: y
      },
      puzzleList);
    setPuzzleList(updatedData);

    // 更新目前在drag的拼圖id
    setActivePuzzleId(id);

    // 找出有沒有可以拼在一起的拼圖
    const closerPuzzleList = Utils.checkCloserPuzzle(id, puzzleList);
    setHighlightList(closerPuzzleList);
  }

  function handleDragStop() {
    if (isMoving) {
      setIsMoving(false);
    }
    const dragedItem = puzzleList.find(item => item.id === activePuzzleId);
    if (!dragedItem) {
      return;
    }


    const closerItems = puzzleList.filter((item => highlightList.includes(item.id)));
    if (closerItems.length > 0) {
      let tmpUpdatedPuzzleList = Utils.handleSnapPuzzle(closerItems, puzzleList, dragedItem);
      // 更新組隊資訊和拼圖資訊。
      const { combineList: updatedCombineList,
        puzzleList: updatedPuzzleList } = Utils.handleCombinedList(combinedList, tmpUpdatedPuzzleList, [dragedItem.id, ...closerItems.map(x => x.id)]);
      setCombinedList(updatedCombineList);
      setPuzzleList(updatedPuzzleList);


      console.log('>>>>>>>>>', updatedCombineList);
      checkFinish(updatedCombineList);
    }


    setHighlightList([]);
    setActivePuzzleId(-1);
  }


  function handleCombinedDrag(someUpdatedPuzzles: PuzzleItem[], id: string) {
    if (!isMoving) {
      setIsMoving(true);
    }

    // 更新目前在drag的拼圖id
    setActivePuzzleId(id);

    // 更新拼圖座標
    const updated = Utils.updateSomeItemInPuzzles(someUpdatedPuzzles, puzzleList);
    setPuzzleList(updated);

    // 找出有沒有可以拼在一起的拼圖
    let final: number[] = [];
    someUpdatedPuzzles.forEach(curr => {
      // 找出每個拼圖很靠近的鄰居
      const tmpCloserPuzzleList = Utils.checkCloserPuzzle(curr.id, updated);
      // 從每個拼圖很靠近的鄰居中，找出新的鄰居(還沒有在同一組的)
      const newNeighborList = R.difference(tmpCloserPuzzleList, someUpdatedPuzzles.map(i => i.id));
      if (tmpCloserPuzzleList.length > 0 && newNeighborList.length > 0) {
        final = [
          ...final,
          ...newNeighborList
        ]
      }
    });
    setHighlightList(R.uniq(final));
  }

  function handleCombinedDragStop() {
    if (isMoving) {
      setIsMoving(false);
    }


    const dragedItems = combinedList.find(item => item.id === activePuzzleId);
    if (!dragedItems) {
      return;
    }

    let tmpUpdatedPuzzleList = Utils.handleGroupSnapPuzzle(highlightList, puzzleList, dragedItems.pieces);
    // 更新組隊資訊和拼圖資訊。
    const { combineList: updatedCombineList,
      puzzleList: updatedPuzzleList } = Utils.handleGroupCombinedList(combinedList, tmpUpdatedPuzzleList, activePuzzleId, [...dragedItems.pieces, ...highlightList]);

    setCombinedList(updatedCombineList);
    setPuzzleList(updatedPuzzleList);
    setHighlightList([]);
    setActivePuzzleId(-1);
    checkFinish(updatedCombineList);
  }

  // 檢查是否拼完
  function checkFinish(combinedList: CombinedList[]) {
    if (combinedList.length === 1 && R.equals(combinedList[0].pieces, [0, 1, 2, 3, 4, 5, 6, 7, 8])) {
      console.log('拼完了！！');
    }
  }

  return (
    <StyledWrapper className="puzzle-app">
      <div className="background-img" />
      <div className="wrapper">
        <h1 className="h1">請完成這幅《清明上河圖》</h1>
        <Playground
          isMoving={isMoving}
          puzzleList={puzzleList}
          combinedList={combinedList}
          activePuzzleId={activePuzzleId}
          highlightList={highlightList}
          handleDrag={handleDrag}
          handleDragStop={handleDragStop}
          handleCombinedDrag={handleCombinedDrag}
          handleCombinedDragStop={handleCombinedDragStop}
        />
        <button
          className="retry"
          onClick={() => {
            setIsFinish(false);
            setIsMoving(false);
            setHighlightList([]);
            setActivePuzzleId(-1);
            setCombinedList([]);
            setPuzzleList(shufflePuzzleList());
          }}>重新排列</button>
      </div>
    </StyledWrapper>
  );
}

export default Demo;
