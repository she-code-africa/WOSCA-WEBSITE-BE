import PullRequests from '../../schema/pr.schema';
import { errorResponse, paginatedOptions, successResponse } from '../utils/responsehandler';
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

export const getPullRequests = async (req, res) => {
  try {
    const { query } = req;

    const data = paginatedOptions(query);
    const pullRequests = await PullRequests.aggregate([
      { $sort: { created_at: -1 } },
      {
        $facet: {
          totalCount: [{ $count: 'total' }],
          data,
        },
      },
    ]);
    return successResponse(res, 200, 'All Pull Requests', pullRequests, req);
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
