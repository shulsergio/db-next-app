import { getPlans } from '../services/plans.js';

export const getAllPlansController = async (req, res) => {
  try {
    const plans = await getPlans();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
