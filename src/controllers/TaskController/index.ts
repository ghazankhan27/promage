import { Request, Response } from "express";
import { catchError, isEmpty } from "../../utils";
import { Task } from "../../models";
import { DataResponse, GeneralResponse } from "../../types";

const validStatusValues = ["completed", "started", "not started", "rejected"];

async function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = await Task.find().lean().exec();

    const response: DataResponse<Record<string, any>[]> = {
      message: "Success.",
      success: true,
      data: tasks,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ManagerController/getAllTasks", err);
  }
}

async function createTask(req: Request, res: Response) {
  try {
    const { startDate, endDate, description, status, project } = req.body;

    if (!project) {
      throw new Error("Task project id is required.");
    }

    const newTask = {
      startDate,
      endDate,
      description,
      status: "not started",
      project,
    };

    if (startDate) {
      newTask.startDate = new Date(Number(startDate));
    }

    if (endDate) {
      newTask.endDate = new Date(Number(endDate));
    }

    if (status && validStatusValues.includes(status)) {
      newTask.status = status;
    }

    const task = new Task(newTask);

    await task.save();

    const response: GeneralResponse = {
      message: "Task created successfully.",
      success: true,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ProjectController/createTask", err);
  }
}

async function editTask(req: Request, res: Response) {
  try {
    const { id, startDate, endDate, description, status, project } = req.body;

    if (!id) {
      throw new Error("Task id is required.");
    }

    const newTask = {
      startDate,
      endDate,
      description,
      status,
      project,
    };

    if (startDate) {
      newTask.startDate = new Date(Number(startDate));
    }

    if (endDate) {
      newTask.endDate = new Date(Number(endDate));
    }

    if (status && validStatusValues.includes(status)) {
      newTask.status = status;
    } else {
      delete newTask.status;
    }

    await Task.findByIdAndUpdate(id, newTask);

    req.ws.emit("task_update", `Task ${id} updated.`);

    const response: GeneralResponse = {
      message: "Task updated successfully.",
      success: true,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ProjectController/editTask", err);
  }
}

async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.body;

    if (!id) {
      throw new Error("Task id is required.");
    }

    await Task.findByIdAndDelete(id);

    req.ws.emit("task_delete", `Task ${id} deleted.`);

    const response: GeneralResponse = {
      message: "Task deleted successfully.",
      success: true,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ProjectController/deleteTask", err);
  }
}

export { getAllTasks, createTask, editTask, deleteTask };
