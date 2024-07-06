import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddTaskMutation } from '../../features/Task/TaskApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [addTask, { isLoading, isError, isSuccess, data }] = useAddTaskMutation();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isIncomplete, setIsIncomplete] = useState(true);
 const navigate = useNavigate()
  const onSubmit = (data) => {
    const newTask = {
      title: data?.title,
      description: data?.description,
      status: isCompleted ? 'Complete' : 'Incomplete',
    };
    addTask(newTask);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading(<p>Loading...</p>, { id: 1 });
    } 
    
    if (isSuccess && data?.insertedId) {
      reset();
      setIsCompleted('');
      setIsIncomplete('');
      toast.success('Task Added Successfully', { id: 1 });
      navigate('/')
    } 
    
    if (isError) {
      toast.error('Failed to add task', { id: 1 });
    }
  }, [isLoading, isSuccess, isError, data, reset]);

  const handleCompletedChange = () => {
    setIsCompleted(true);
    setIsIncomplete(false);
  };

  const handleIncompleteChange = () => {
    setIsCompleted(false);
    setIsIncomplete(true);
  };

  return (
    <div className='p-10 rounded-lg shadow-lg mx-auto max-w-[700px] px-4 py-10 sm:px-6 lg:px-8 mb-5 mt-5'>
        <h2 className="text-2xl font-bold text-center mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* Title */}
        <div>
          <label className="block text-lg text-gray-500 dark:text-gray-300 font-bold">Title</label>
          <input
            type='text'
            {...register("title", { required: "Title is required" })}
            className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            placeholder='Enter Your Title'
          />
          {errors.title && <p className='text-red-600 font-semibold'>{errors.title?.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-lg font-bold text-gray-500 dark:text-gray-200">Description</label>
          <textarea
            className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Enter your Description"
            {...register("description", { required: "Description is required" })}
          ></textarea>
          {errors.description && <p className='text-red-600 font-semibold'>{errors.description?.message}</p>}
        </div>

        {/* Completed and Incomplete Checkboxes */}
        <div>
          <label className="block text-lg text-gray-500 dark:text-gray-300 font-bold">Status</label>
          <div className="flex items-center">
            <input
              type='checkbox'
              checked={isCompleted}
              onChange={handleCompletedChange}
              className="mr-2"
            />
            <label className="mr-4">Complete</label>
            <input
              type='checkbox'
              checked={isIncomplete}
              onChange={handleIncompleteChange}
              className="mr-2"
            />
            <label>Incomplete</label>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <Button type='submit' disabled={isLoading} className={`bg-green-600 text-white px-2 py-2`}>
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
