export const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.error('Error in controller wrapper:', error); // Log the error for debugging
      next(error);
    }
  };
};
