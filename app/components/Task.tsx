"use client";
import { ITask } from "@/types/task";
import { deleteTodo, editTodo } from "@/api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: ITask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault(); // prevent page reload
    await editTodo({
      id: task.id,
      text: taskToEdit,
      completed: false,
    }); // edit todo
    setOpenModalEdit(false); // close modal
    router.refresh(); // refresh page
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id); // delete todo
    setOpenModalDelete(false); // close modal
    router.refresh(); // refresh page
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          size={25}
          className="text-blue-500"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo} id="editTaskText">
            <h3 className="text-lg font-bold">Edit task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="w-full input input-bordered"
                id="editTask"
              />
              <button
                type="submit"
                className="text-white btn-primary btn hover:bg-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>

        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          size={25}
          className="text-red-500"
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">
            {" "}
            Are you sure, you want to delete this task?
          </h3>
          <div className="justify-center modal-action">
            <button
              onClick={() => handleDeleteTask(task.id)}
              type="submit"
              className="text-white bg-red-600 btn hover:bg-red-300"
            >
              Yes
            </button>
            <button
              onClick={() => setOpenModalDelete(false)}
              className="text-white btn-primary btn hover:bg-blue-300"
            >
              No
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
