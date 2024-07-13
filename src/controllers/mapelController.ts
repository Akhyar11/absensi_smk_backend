import { Request, Response } from "express";
import {
  createMapel,
  deleteMapelById,
  getMapelById,
  getAllMapel,
  updateMapel,
} from "../services/mapelService";

export const createMapelController = async (req: Request, res: Response) => {
  try {
    const { nama_mapel } = req.body;
    const mapel = await createMapel(nama_mapel);
    res.status(201).json({ message: "Mapel created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllMapelController = async (req: Request, res: Response) => {
  try {
    const mapels = await getAllMapel();
    res.status(200).json(mapels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMapelByIdController = async (req: Request, res: Response) => {
  try {
    const mapelId = req.params.id;
    const mapel = await getMapelById(mapelId);
    if (!mapel) {
      res.status(404).json({ message: "Mapel not found" });
    } else {
      res.status(200).json(mapel);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMapelController = async (req: Request, res: Response) => {
  try {
    const mapelId = req.params.id;
    const { nama_mapel } = req.body;
    const updatedMapel = await updateMapel(mapelId, {
      nama_mapel,
      id_mapel: mapelId,
    });
    if (!updatedMapel) {
      res.status(404).json({ message: "Mapel not found" });
    } else {
      res.status(200).json(updatedMapel);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMapelController = async (req: Request, res: Response) => {
  try {
    const mapelId = req.params.id;
    await deleteMapelById(mapelId);
    res.status(204).send({ message: "Mapel deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
