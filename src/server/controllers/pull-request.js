import PullRequests from '../../schema/pr.schema';
import { errorResponse, successResponse } from '../utils/responsehandler';
import { submitPRValidation } from '../utils/validation';

export const submitPullRequest = async (req, res) => {
  try {
    const { body, user: { id } } = req;
    const { error } = submitPRValidation(body);
    if (error) return errorResponse(res, error.details[0].message, 400);

    const pull_request = await PullRequests.create({ ...body, user: id });
    return successResponse(res, 201, 'Pull Request submitted successfully', pull_request, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};

export const getOnePullRequest = async (req, res) => {
  try {
    const { params: { prId } } = req;
    const pullRequest = await PullRequests.findOne({ _id: prId });
    if (!pullRequest) {
      return errorResponse(res, 'Pull Requests not found!', 404, req);
    }
    return successResponse(res, 200, 'Successfully retrieved Pull Request', pullRequest, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};

export const updatePullRequests = async (req, res) => {
  try {
    const { body, params: { prId } } = req;

    const existingPullRequests = await PullRequests.findById({ _id: prId });
    if (!existingPullRequests) {
      return errorResponse(res, 'Pull Requests not found!', 404, req);
    }
    const pullRequest = await PullRequests.findByIdAndUpdate(prId, { $set: body }, { new: true });
    return successResponse(res, 200, 'Successfully updated Pull Request', pullRequest, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};

export const getPullRequests = async (req, res) => {
  try {
    if (req.user.role === 'user') {
      const queryResult = await PullRequests.aggregate([
        { $match: { user: req.user.id } },
        {
          $lookup: {
            from: 'users',
            let: { user: '$user' },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$user'] } } },
              { $project: { _id: 1, username: 1, email: 1 } },

            ],
            as: 'user',
          },
        },
        { $sort: { created_at: -1 } },
        {
          $group: {
            _id: null,
            data: { $push: '$$ROOT' },
            count: { $sum: 1 },
          },
        },
      ]);
      return successResponse(res, 200, 'All Pull Requests', queryResult, req);
    }
    const queryResults = await PullRequests.aggregate([
      {
        $lookup: {
          from: 'users',
          let: { user: '$user' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$user'] } } },
            {
              $project: {
                _id: 1, username: 1, email: 1, created_at: 1, updated_at: 1,
              },
            },

          ],
          as: 'user',
        },
      },
      { $sort: { created_at: -1 } },
      {
        $group: {
          _id: null,
          data: { $push: '$$ROOT' },
          count: { $sum: 1 },
        },
      },

    ]);

    return successResponse(res, 200, 'All Pull Requests', queryResults, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};

export const getPullRequestsPerUser = async (req, res) => {
  try {
    const queryResults = await PullRequests.aggregate([
      { $group: { _id: '$user', pull_requests: { $push: '$$ROOT' }, count: { $sum: 1 } } },

    ]);

    return successResponse(res, 200, 'All Pull Requests', queryResults, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};
