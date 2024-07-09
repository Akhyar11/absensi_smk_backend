import { Request, Response } from "express";
import {
  createJadwalMapel,
  deleteJadwalMapelById,
  getJadwalMapelById,
  getAllJadwalMapel,
  updateJadwalMapel,
  getJadwalMapelByGuruId,
  getJadwalMapelByKelasId,
  getJadwalMapelByMapelId,
} from "../services/jadwalMapelService";

export const createJadwalMapelController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id_guru, id_kelas, id_mapel, jam_mulai, jam_berahir } = req.body;
    const jadwalMapel = await createJadwalMapel(
      id_guru,
      id_kelas,
      id_mapel,
      jam_mulai,
      jam_berahir
    );
    res.status(201).json(jadwalMapel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllJadwalMapelController = async (
  req: Request,
  res: Response
) => {
  try {
    const jadwalMapels = await getAllJadwalMapel();
    res.status(200).json(jadwalMapels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getJadwalMapelByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const jadwalMapelId = req.params.id;
    const jadwalMapel = await getJadwalMapelById(jadwalMapelId);
    if (!jadwalMapel) {
      res.status(404).json({ error: "JadwalMapel not found" });
    } else {
      res.status(200).json(jadwalMapel);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getJadwalMapelByGuruIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const guruId = req.params.guruId;
    const jadwalMapel = await getJadwalMapelByGuruId(guruId);
    if (!jadwalMapel) {
      res.status(404).json({ error: "JadwalMapel not found" });
    } else {
      res.status(200).json(jadwalMapel);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getJadwalMapelByKelasIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const kelasId = req.params.kelasId;
    const jadwalMapel = await getJadwalMapelByKelasId(kelasId);
    if (!jadwalMapel) {
      res.status(404).json({ error: "JadwalMapel not found" });
    } else {
      res.status(200).json(jadwalMapel);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getJadwalMapelByMapelIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const mapelId = req.params.mapelId;
    const jadwalMapel = await getJadwalMapelByMapelId(mapelId);
    if (!jadwalMapel) {
      res.status(404).json({ error: "JadwalMapel not found" });
    } else {
      res.status(200).json(jadwalMapel);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateJadwalMapelController = async (
  req: Request,
  res: Response
) => {
  try {
    const jadwalMapelId = req.params.id;
    const { id_guru, id_kelas, id_mapel, jam_mulai, jam_berahir } = req.body;
    const updatedJadwalMapel = await updateJadwalMapel(jadwalMapelId, {
      id_jadwal_mapel: jadwalMapelId,
      id_guru,
      id_kelas,
      id_mapel,
      jam_mulai,
      jam_berahir,
    });
    if (!updatedJadwalMapel) {
      res.status(404).json({ error: "JadwalMapel not found" });
    } else {
      res.status(200).json(updatedJadwalMapel);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteJadwalMapelController = async (
  req: Request,
  res: Response
) => {
  try {
    const jadwalMapelId = req.params.id;
    await deleteJadwalMapelById(jadwalMapelId);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
