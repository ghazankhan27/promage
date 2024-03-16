import { Request, Response } from "express";
import { catchError } from "../../utils";
import { Manager, Project } from "../../models";
import { DataResponse, GeneralResponse } from "../../types";

async function getAllManagerss(req: Request, res: Response) {
  try {
    const managers = await Manager.find().lean().exec();

    const response: DataResponse<Record<string, any>[]> = {
      message: "Success.",
      success: true,
      data: managers,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ManagerController/getAllManagerss", err);
  }
}

async function createManager(req: Request, res: Response) {
  try {
    const { title } = req.body;

    if (!title) {
      throw new Error("Manager title is required.");
    }

    const newManager = {
      title,
    };

    const manager = new Manager(newManager);

    await manager.save();

    const response: GeneralResponse = {
      message: "Manager created successfully.",
      success: true,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ManagerController/createManager", err);
  }
}

async function editManager(req: Request, res: Response) {
  try {
    const { id, title } = req.body;

    if (!id) {
      throw new Error("Manager id is required.");
    }

    const newManager = {
      title,
    };

    await Manager.findByIdAndUpdate(id, newManager);

    const response: GeneralResponse = {
      message: "Manager updated successfully.",
      success: true,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ManagerController/editManager", err);
  }
}

async function deleteManager(req: Request, res: Response) {
  try {
    const { id } = req.body;

    if (!id) {
      throw new Error("Manager id is required.");
    }

    await Manager.findByIdAndDelete(id);

    const response: GeneralResponse = {
      message: "Manager deleted successfully.",
      success: true,
    };

    res.send(response);
  } catch (err) {
    catchError(res, "ManagerController/deleteManager", err);
  }
}

export { getAllManagerss, createManager, editManager, deleteManager };
