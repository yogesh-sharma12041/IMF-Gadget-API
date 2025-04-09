import prisma from "../Config/db.config.js";
import { generateSuccessProbability, generateConfirmationCode, getRandomCodename } from "../Utils/helper.js";

export const getAllGadgets = async (req, res) => {
  const { status } = req.query;
  const gadgets = await prisma.gadget.findMany({
    where: status ? { status } : {},
  });

  const enriched = gadgets.map(g => ({
    ...g,
    missionSuccessProbability: `${generateSuccessProbability()}%`
  }));

  res.json({ status: 200, data: enriched });
};

export const createGadget = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;
  
    try {
      const gadget = await prisma.gadget.create({
        data: {
          name,
          codename: getRandomCodename(),
          user: {
            connect: { id: userId }
          }
        }
      });
  
      res.status(201).json({ status: 201, data: gadget });
    } catch (err) {
      res.status(500).json({ message: "Failed to create gadget", error: err.message });
    }
  };

export const updateGadget = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  const updated = await prisma.gadget.update({
    where: { id },
    data: { name, status },
  });

  res.json({ status: 200, data: updated });
};

export const deleteGadget = async (req, res) => {
  const { id } = req.params;
  const decommissioned = await prisma.gadget.update({
    where: { id },
    data: {
      status: "Decommissioned",
      decommissionedAt: new Date(),
    },
  });
  res.json({ status: 200, data: decommissioned });
};

export const triggerSelfDestruct = async (req, res) => {
  const { id } = req.params;
  const gadget = await prisma.gadget.findUnique({ where: { id } });

  if (!gadget) return res.status(404).json({ message: "Gadget not found" });

  const code = generateConfirmationCode();
  res.json({ status: 200, message: `Self-destruct triggered. Confirmation code: ${code}` });
};