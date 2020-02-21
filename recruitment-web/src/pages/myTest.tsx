import React from 'react'
import { useEventCallback } from "rxjs-hooks";
import { map } from "rxjs/operators";

interface IProps {

}

const MyTest: React.SFC<IProps> = () => {
  const [clickCallback, [description, x, y]] = useEventCallback<React.MouseEvent<HTMLButtonElement, MouseEvent>, Array<string | number>>((event$) =>
    event$.pipe(
      map((event) => ['event.target', event.clientX, event.clientY]),
    ),
    ["nothing", 0, 0],
  )

  return (
    <div className="App">
      <h1>click position: {x}, {y}</h1>
      <h1>"{description}" was clicked.</h1>
      <button onClick={clickCallback}>click me</button>
      <button onClick={clickCallback}>click you</button>
      <button onClick={clickCallback}>click him</button>
    </div>
  );
}

export default React.memo(MyTest)
