import TaskList from "../AllTask/TaskList";

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-center font-bold text-2xl mt-8 mb-5">Welcome to Task Management</h1>
      <TaskList></TaskList>
    </div>
  );
};

export default Home;
