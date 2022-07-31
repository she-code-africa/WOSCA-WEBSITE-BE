import User from '../../schema/user.schema';
import { errorResponse, successResponse, paginatedOptions } from '../utils/responsehandler';

export const getAllUsers = async (req, res) => {
  try {
    const { query } = req;
    const data = paginatedOptions(query);
    const events = await User.aggregate([
      { $sort: { created_at: -1 } },
      {
        $facet: {
          totalCount: [{ $count: 'total' }],
          data,
        },
      },
    ]);
    return successResponse(res, 200, 'All users', events, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};
