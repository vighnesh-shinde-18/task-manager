import Header from "./Header";
import InputTask from "./TaskCard";
import TaskBoard from "./TaskBoard";

export default function TaskManager() {
   
    return (
        <>
       <Header></Header>
       <TaskBoard></TaskBoard>
       {/* <InputTask></InputTask> */}
        </>
    );
}