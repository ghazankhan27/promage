import { Request, Response } from "express";
import { catchError, getStartEndOfDay } from "../../utils";
import { Project } from "../../models";
import { DataResponse, GeneralResponse } from "../../types";

async function getAllProjects(req: Request, res: Response) {
  try {
    const projects = await Project.find().lean().exec();

    const response: DataResponse<Record<string, any>[]> = {
      message: "Success.",
      success: true,
      data: projects,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ManagerController/getAllProjects", err);
  }
}

async function getAllProjectsByEndDate(req: Request, res: Response) {
  try {
    const { endDate } = req.params;

    const { startTime, endTime } = getStartEndOfDay(parseInt(endDate));

    const projects = await Project.find({
      endDate: {
        $gte: startTime,
        $lt: endTime,
      },
    })
      .lean()
      .exec();

    const response: DataResponse<Record<string, any>[]> = {
      message: "Success.",
      success: true,
      data: projects,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ManagerController/getAllProjects", err);
  }
}

async function createProject(req: Request, res: Response) {
  try {
    const { title, manager, startDate, endDate, isRunning, details } = req.body;

    if (!title) {
      throw new Error("Project title is required.");
    }

    if (!manager) {
      throw new Error("Project manager is required.");
    }

    const newProject = {
      title,
      manager,
      startDate,
      endDate,
      isRunning,
      details,
    };

    if (startDate) {
      newProject.startDate = new Date(Number(startDate));
    }

    if (endDate) {
      newProject.endDate = new Date(Number(endDate));
    }

    const project = new Project(newProject);

    await project.save();

    const response: GeneralResponse = {
      message: "Project created successfully.",
      success: true,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ProjectController/createProject", err);
  }
}

async function editProject(req: Request, res: Response) {
  try {
    const { id, title, manager, startDate, endDate, isRunning, details } = req.body;

    if (!id) {
      throw new Error("Project id is required.");
    }

    const newProject = {
      title,
      manager,
      startDate,
      endDate,
      isRunning,
      details,
    };

    if (startDate) {
      newProject.startDate = new Date(Number(startDate));
    }

    if (endDate) {
      newProject.endDate = new Date(Number(endDate));
    }

    await Project.findByIdAndUpdate(id, newProject);

    req.ws.emit("project_update", `Project ${id} updated.`);

    const response: GeneralResponse = {
      message: "Project updated successfully.",
      success: true,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ProjectController/editProject", err);
  }
}

async function deleteProject(req: Request, res: Response) {
  try {
    const { id } = req.body;

    if (!id) {
      throw new Error("Project id is required.");
    }

    await Project.findByIdAndDelete(id);

    req.ws.emit("project_update", `Project ${id} deleted.`);

    const response: GeneralResponse = {
      message: "Project deleted successfully.",
      success: true,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ProjectController/deleteProject", err);
  }
}

export { getAllProjects, createProject, editProject, deleteProject, getAllProjectsByEndDate };
