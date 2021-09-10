import PullRequests from '../../../data/pull-requests/pr.schema';
import { errorResponse, successResponse } from '../../utils/responsehandler';

export const submitPullRequest = async (req, res, next) => {
  try {
    const { body, user: { id } } = req;
    const pull_request = await PullRequests.create({ ...body, user: id });

    return successResponse(res, req, 201, { message: 'Pull Request submitted successfully', pull_request });
  } catch (err) {
    return next(err);
  }
};

export const getPullRequests = async (req, res, next) => {
  try {
    const pullRequests = await PullRequests.find();
    return successResponse(res, req, 200, { message: 'All Pull Requests', pullRequests });
  } catch (error) {
    return next(error);
  }
};

export const getOnePullRequest = async (req, res, next) => {
  try {
    const { params: { prId } } = req;
    const pullRequests = await PullRequests.findOne({ _id: prId });
    if (!pullRequests) {
      return errorResponse(res, req, 404, { message: 'Pull Requests not found!' });
    }
    return successResponse(res, req, 200, { message: 'Successfully retrieved Pull Requests', pullRequests });
  } catch (error) {
    return next(error);
  }
};

export const updatePullRequests = async (req, res, next) => {
  try {
    const { body, params: { prId } } = req;

    const existingPullRequests = await PullRequests.findById({ _id: prId });
    if (!existingPullRequests) {
      return errorResponse(res, req, 404, { message: 'Pull not found!' });
    }
    const pullRequests = await PullRequests.findByIdAndUpdate(prId, { $set: body }, { new: true });
    return successResponse(res, req, 200, { message: 'Pull Requested updated successfully', pullRequests });
  } catch (error) {
    return next(error);
  }
};
