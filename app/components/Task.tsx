import { ITask } from "@/types/task";

interface TaskProps {
  task: ITask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <tr key={task.id}>
      <td>{task.text}</td>
      <td>Quality Control Specialist</td>
    </tr>
  );
};

export default Task;
