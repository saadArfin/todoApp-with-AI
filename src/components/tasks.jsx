import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { RadioGroup, Radio } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useRouter } from "next/router";
export default function Tasks() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "/api/gettask",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTasks(data.cursor);
    };
    getData();
  }, []);

  async function handleSubmit() {
    const { data } = await axios.post(
      "/api/createtask",
      {
        task: task,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    setTasks((prevTasks) => [...prevTasks, data.result]);
    setTask("");
  }

  async function deleteTask(id) {
    const { data } = await axios.post(
      "/api/deletetask",
      {
        id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  }

  const router = useRouter(); // Initialize useRouter hook

  const handleNavigation = () => {
    router.push("/askai"); // Specify the path to navigate to
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* <h3 className="text-default-500 text-small"></h3> */}
        <div className="flex items-center gap-2">
          <div className="">
            <Input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              key="inside"
              type="task"
              label="task name"
              //   labelPlacement={placement}
              placeholder="Enter the task"
            />
          </div>
          <div>
            <Button
              color="primary"
              variant="shadow"
              onClick={() => handleSubmit()}
            >
              Add task
            </Button>
          </div>
        </div>

        <div className="p-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Select Task
          </label>
          <div className="space-y-2">
            {tasks &&
              tasks.map((task, idx) => (
                <div key={idx} className="flex items-center">
                  <input
                    id={`checkbox-${task._id}`}
                    type="checkbox"
                    value={task._id}
                    onClick={() => deleteTask(task._id)}
                    className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor={`checkbox-${task._id}`}
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    {task.task}
                  </label>
                </div>
              ))}
          </div>
        </div>

        <Button color="primary" variant="light" onClick={handleNavigation}>
          ASK AI
        </Button>
      </div>
    </>
  );
}
