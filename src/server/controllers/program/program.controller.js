import Program from '../../../data/programs/programs.schema';
import { successResponse } from '../../utils/responsehandler';

export const createProgram = async (req, res, next) => {
  try {
    const { body } = req;
    const program = await Program.create({ ...body });

    return successResponse(res, req, 201, { message: 'Program created successfully', program });
  } catch (err) {
    return next(err);
  }
};
export const getPrograms = async (req, res, next) => {
  try {
    const programs = await Program.find();
    return successResponse(res, req, 200, { message: 'All programs', programs });
  } catch (error) {
    return next(error);
  }
};
