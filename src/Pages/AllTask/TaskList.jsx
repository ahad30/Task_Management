import React, { useEffect, useState } from 'react';
import { useGetTasksQuery, useDeleteTaskMutation, useUpdateStatusMutation } from '../../features/Task/TaskApi';
import DataTable from 'react-data-table-component';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { Button, Spinner } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import EditTask from './EditTask';

const TaskList = () => {
  const { data: tasksData, isLoading: tasksIsLoading, refetch } = useGetTasksQuery();
  const [deleteTask, { isLoading: deleteIsLoading, isError: deleteIsError, isSuccess: deleteIsSuccess, error: deleteError }] = useDeleteTaskMutation();
  const [updateStatus, { isLoading: updateIsLoading, isError: updateIsError, isSuccess: updateIsSuccess }] = useUpdateStatusMutation();
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  // Fetached TaskData
  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData);
    }
  }, [tasksData]);


  // Mark Complete section

  const markAsCompleted = async (taskId) => {
    try {
      await updateStatus({ id: taskId });
    } catch (error) {
      console.error('Failed to mark task as completed:', error);
    }
  };

  useEffect(() => {
    if (updateIsLoading) {
      toast.loading("Marking task as completed...", { id: 1 });
    }
    if (updateIsSuccess) {
      toast.success('Task marked as completed successfully', { id: 1 });
      refetch();
    }
    if (updateIsError) {
      toast.error('Failed to mark task as completed', { id: 1 });
    }
  }, [updateIsLoading, updateIsSuccess, updateIsError, refetch]);

  // Modal View
  const handleModalEditInfo = (selectedTask) => {
    setSelectedTask(selectedTask);
    setModalIsOpen(true);
  };



// HandleDelete section

  const handleDelete = async (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTask(_id);
      }
    });
  };

  useEffect(() => {
    if (deleteIsLoading) {
      toast.loading("Deleting task...", { id: 1 });
    }
    if (deleteIsSuccess) {
      toast.success('Task deleted successfully', { id: 1 });
      refetch(); // Refetch tasks after successful delete
    }
    if (deleteIsError) {
      toast.error(deleteError?.data?.message || 'Failed to delete task', { id: 1 });
    }
  }, [deleteIsLoading, deleteIsSuccess, deleteIsError, deleteError, refetch]);


  // Table Section
  const columns = [
    {
      name: "Serial",
      cell: (row, index) =>  row?.status === 'Complete'?
      <del>{index+1}</del>
   : index+1
    },
    {
      name: "Title",
      selector: (row) => 
        row?.status === 'Complete'?
          <del>{row.title}</del>
       : row.title
  
    },
    {
      name: "Description",
      selector: (row) =>    
           row?.status === 'Complete'?
      <del>{row.description}</del>
   : row.description

    },
    {
      name: "Status",
      selector: (row) =>
        <div
          className={`flex justify-center  items-center-center px-2 py-1 rounded-full gap-x-2
     
       ${row?.status === 'Complete' &&
            'bg-green-100/60 text-green-500'
            }
       ${row?.status === 'Incomplete' &&
            'bg-red-100/60 text-red-500'
            } `}
        >

          <h2 className='text-sm font-normal'>{row?.status}</h2>
        </div>,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex'>
          <button className='' onClick={() => handleModalEditInfo(row)}>
            <FaEdit size={20}></FaEdit>
          </button>
          <button onClick={() => handleDelete(row._id)}>
            <RiDeleteBin4Line size={20} />
          </button>
          <Button
            disabled={row?.status === 'Complete'}
            onClick={() => markAsCompleted(row?._id)}
            className="px-2 text-[10px] py-2 disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 hover:text-green-500 focus:outline-none bg-black ms-1 w-full inline-block">Mark Complete

          </Button>
        </div>
      ),
    },
  ];

  if (tasksIsLoading) {
    return (
      <div className="flex justify-center h-full p-[100px]">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  return (
    <div className='p-8 rounded-lg shadow-lg mx-auto max-w-[900px] px-2 py-8 sm:px-6 lg:px-8 mb-5 '>
      <div className='flex justify-between'>
        <p>Task List</p>
        <div>
          <Link to={`/addTask`}>
            <Button className='bg-slate-950 py-2 text-xs px-2'>Add New Task</Button>
          </Link>
        </div>
      </div>
      <DataTable
      className='whitespace-nowrap'
        columns={columns}
        data={tasksData}
        responsive
        keyField="id"
      />
      <EditTask
        selectedTask={selectedTask}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default TaskList;
