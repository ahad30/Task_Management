import { array, bool, func, object } from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useUpdateTaskMutation } from "../../features/Task/TaskApi";

const EditTask = ({ modalIsOpen, setModalIsOpen, selectedTask }) => {
//  console.log(selectedTask)
  const { register, handleSubmit, setValue ,reset, formState:{errors} } = useForm();

  const [
    updateTask,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
      data: updateData,
    },
  ] = useUpdateTaskMutation();

  const onSubmit = (data) => {
    console.log(data)
    const updatedTask = {
      title: data?.title,
      id: data?._id,
      description: data?.description,
      status: data?.status,
    };
    updateTask({ id: selectedTask._id, data: updatedTask });
  };

  useEffect(() => {
    if (updateIsLoading) {
      toast.loading("Updating task...", { id: 1 });
    }
    if (updateIsSuccess) {
      toast.success("Task updated successfully", { id: 1 });
      setModalIsOpen(false);
    }
    if (updateIsError) {
      toast.error(updateError?.data?.message || 'Failed to update task', { id: 1 });
    }
  }, [updateIsLoading, updateIsError, updateError, setModalIsOpen]);

  useEffect(() => {
    if (selectedTask) {
      setValue("title", selectedTask.title || "");
      setValue("description", selectedTask.description || "");
      setValue("status", selectedTask.status || "");
    }
    if (!modalIsOpen) {
      reset();
    }
  }, [selectedTask, setValue , modalIsOpen ,reset]);

  const handleCancel = () => {
    setModalIsOpen(false);
    
  };



  return modalIsOpen ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setModalIsOpen(false)}
      ></div>

      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <p className="text-lg font-semibold text-center mb-5">
                Update Task
              </p>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-5 w-full">

                   {/* Title */}
                    <label className="input-group">
                      <span className="font-semibold">
                        Title<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Task Title"
                        className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        {...register("title", { required: "Title is required" })}
                      />
                       {errors.title && <p className='text-red-600 font-semibold'>{errors.title?.message}</p>}
                    </label>

                  {/* Description */}
                    <label className="input-group">
                      <span className="font-semibold">Description <span className="text-red-500 p-0">*</span></span>
                      <input
                        type="text"
                        placeholder="Task Description"
                        className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        {...register("description", { required: "Description is required" })}
                      />
                       {errors.description && <p className='text-red-600 font-semibold'>{errors.description?.message}</p>}
                    </label>

                   {/* Status */}
                    <label className="input-group">
                      <span className="font-semibold">Status<span className="text-red-500 p-0">*</span></span>
                      <select className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 mb-5" {...register("status", { required: "Status is required" })}>
                        <option value="Incomplete">Incomplete</option>
                        <option value="Complete">Complete</option>
                      </select>
                      {errors.status && <p className='text-red-600 font-semibold'>{errors.status?.message}</p>}
                    </label>
                  </div>

                  <div className="items-center gap-2 mt-3 sm:flex">
                    <input
                      type="submit"
                      value={"Update"}
                      className="cursor-pointer w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                    />

                    <button
                      className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};


export default EditTask;
