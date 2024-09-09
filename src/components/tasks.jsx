
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import {RadioGroup, Radio} from "@nextui-org/react";
import { useRouter } from 'next/router';
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
    console.log(data)
    setTasks((prevTasks) => [...prevTasks, data.result]);
    setTask("")
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
        router.push('/askai'); // Specify the path to navigate to
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
        
        <div>
        <RadioGroup
            label="Tasks"
            >
            {tasks && tasks.map((i, idx) => {
                return (
                    <Radio value= {idx} key = {idx} onClick = {() => deleteTask(i._id)}>{i.task}</Radio>
                )
            })}
        </RadioGroup>
        </div>
        <Button color="primary" variant="light" onClick={handleNavigation}>
            ASK AI
        </Button>
        
      </div>
      
    </>
  );
}
