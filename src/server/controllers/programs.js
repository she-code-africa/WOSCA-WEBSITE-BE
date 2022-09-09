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

export const updatePrograms = async (req, res) => {
  try {
    const { body, params: { programId } } = req;

    const existingProgram = await Program.findById({ _id: programId });
    if (!existingProgram) {
      return errorResponse(res, 'Program not found!', 404, req);
    }
    const program = await Program.findByIdAndUpdate(programId, { $set: body }, { new: true });
    return successResponse(res, 200, 'Successfully updated Program', program, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};

export const deletePrograms = async (req, res) => {
  try {
    const { params: { programId } } = req;

    const program = await Program.findByIdAndDelete(programId);
    if (!program) {
      return errorResponse(res, 'Program not found!', 404, req);
    }
    return successResponse(res, 200, 'Successfully deleted Program', program, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};
