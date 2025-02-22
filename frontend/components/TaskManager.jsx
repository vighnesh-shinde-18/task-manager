import Header from "./Header";
import TaskBoard from "./TaskBoard";
import InputTask from "./InputTask";
import { useState } from "react";
export default function TaskManager() {

    const [showForm, setShowForm] = useState(false);

    const token = localStorage.getItem("token")

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("High");

    const dislayForm = (value) => {
        setShowForm(value);
    }

    const setForm = (inputTitle, inputDescription, inputPriority) => {
        setTitle(inputTitle);
        setDescription(inputDescription)
        setPriority(inputPriority)
    }

    return (
        <>
            <Header></Header>
            {!showForm && <TaskBoard dislayForm={dislayForm} token={token}  setForm={setForm} ></TaskBoard>}
            {showForm && <InputTask token={token} dislayForm={dislayForm} initialTitle={title} initialDescription={description} IinitialPriority={priority} setForm={setForm} ></InputTask>}
        </>
    );
}