import React, { useEffect, useState } from 'react';
import { useGetTasksQuery, useDeleteTaskMutation } from '../../features/Task/TaskApi'; // 
import DataTable from 'react-data-table-component';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { Button, Spinner } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import EditTask from './EditTask';

const TaskList = () => {
  const { data: tasksData, isLoading: tasksIsLoading } = useGetTasksQuery();
  const [deleteTask, { isLoading: deleteIsLoading, isError: deleteIsError, isSuccess: deleteIsSuccess, error: deleteError }] = useDeleteTaskMutation();
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
const [selectedTask , setSelectedTask] = useState({})


  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData);
    }
  }, [tasksData]);


  const handleModalEditInfo = (selectedTask) => {
    setSelectedTask(selectedTask)
    setModalIsOpen(true);
  };

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
    }

    if (deleteIsError) {
      toast.error(deleteError?.data?.message || 'Failed to delete task', { id: 1 });
    }
  }, [deleteIsSuccess , deleteIsLoading]);


  const columns = [
    {
      name: "Serial",
      cell: (row, index) => <span>{index + 1}</span>,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      
    },
    {
      name: "Description",
      selector: (row) => row.description,
      
    },
    {
      name: "Status",
      selector: (row) => row.status,      
    },

    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button className='' onClick={() => handleModalEditInfo(row)}>
            <FaEdit size={20}></FaEdit>
          </button>
          <button onClick={() => handleDelete(row._id)}>
            <RiDeleteBin4Line size={20} />
          </button>
        </div>
      ),
    },
  ];

  if (tasksIsLoading) {
    return <div className="flex justify-center items-center flex-col h-full p-48">
    <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>;
  }

  return (
    <div className='p-8 rounded-lg shadow-lg mx-auto max-w-[900px] px-4 py-8 sm:px-6 lg:px-8 mb-5'>
    <div className='flex justify-between'>
     <p>Task List</p>
     <div>
    <Link to={`/addTask`}>
    <Button className='bg-slate-950 py-2 text-xs px-2'>Add New Task</Button>
    </Link>
     </div>
    </div>
      <DataTable
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
