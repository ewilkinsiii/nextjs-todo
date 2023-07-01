import { AiOutlinePlus } from "react-icons/ai";

const AddTask = () => {
  return (
    <div>
      <button className="w-full btn btn-primary">
        {" "}
        Add New Task <AiOutlinePlus className="ml-2" size={18} />
      </button>
    </div>
  );
};

export default AddTask;
