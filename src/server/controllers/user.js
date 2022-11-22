import User from '../../schema/user.schema';
import { errorResponse, successResponse, paginatedOptions } from '../utils/responsehandler';

export const getAllUsers = async (req, res) => {
  try {
    const { query } = req;
    const data = paginatedOptions(query);
    const users = await User.aggregate([
      { $sort: { created_at: -1 } },
      {
        $project: {
          email: 1, role: 1, username: 1, _id: 1, created_at: 1,
        },
      },
      {
        $facet: {
          totalCount: [{ $count: 'total' }],
          data,
        },
      },
    ]);
    return successResponse(res, 200, 'All users', users, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};
