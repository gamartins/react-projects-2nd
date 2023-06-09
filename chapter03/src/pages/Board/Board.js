import { useEffect, useState } from 'react';
import Lane from '../../components/Lane/Lane';
import useDataFetching from '../../hooks/useDataFetching';
import './Board.css';

const lanes = [
  { id: 1, title: 'To Do' },
  { id: 2, title: 'In Progress' },
  { id: 3, title: 'Review' },
  { id: 4, title: 'Done' },
];

function onDragStart(e, id) {
  e.dataTransfer.setData('id', id)
}

function onDragOver(e) {
  e.preventDefault();
}

function Board() {
  const dataSource = `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks`;
  const [ loading, data, error] = useDataFetching(dataSource);
  const [ taskList, setTaskList ] = useState([]);

  useEffect(() => {
    setTaskList(data);
  }, [data])

  function onDrop(e, laneId) {
    const id = e.dataTransfer.getData('id');
    const updatedTasks = taskList.filter((task) => {
      if (task.id.toString() === id) {
        task.lane = laneId;
      }
      
      return task;
    });

    setTaskList(updatedTasks);
  }

  return (
    <div className='Board-wrapper'>
      {lanes.map((lane) => (
        <Lane
          key={lane.id}
          laneId={lane.id}
          title={lane.title}
          loading={loading}
          error={error}
          tasks={taskList.filter(task => task.lane === lane.id)}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}

export default Board;
