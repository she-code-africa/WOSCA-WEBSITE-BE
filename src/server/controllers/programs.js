import Program from '../../schema/programs.schema';
import { successResponse, errorResponse, paginatedOptions } from '../utils/responsehandler';
import { createProgramValidation } from '../utils/validation';

export const createProgram = async (req, res) => {
  try {
    const { body } = req;
    const { error } = createProgramValidation(body);
    if (error) return errorResponse(res, error.details[0].message, 400, req);

    const program = await Program.create({ ...body });
    return successResponse(res, 201, 'Program created successfully', program, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};
export const getPrograms = async (req, res) => {
  try {
    const { query } = req;
    const data = paginatedOptions(query);

    const programs = await Program.aggregate([
      { $sort: { created_at: -1 } },
      {
        $facet: {
          totalCount: [{ $count: 'total' }],
          data,
        },
      },
    ]);
    return successResponse(res, 200, 'All programs', programs, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};
