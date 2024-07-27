import { ReviewForApprovalActionTypes } from "./ReviewForApproval.type";

/**
 * Fetch All ReviewForApproval
 *
 * @param payload
 */
export const fetchAllReviewForApproval = (payload?: any) => ({
  type: ReviewForApprovalActionTypes.FETCH_ALL_REVIEW_FOR_APPROVAL,
  payload: payload,
});

/**
 * Fetch All ReviewForApproval
 *
 * @param payload
 */
export const fetchOneReviewForApproval = (payload?: any) => ({
  type: ReviewForApprovalActionTypes.FETCH_ONE_REVIEW_FOR_APPROVAL,
  payload: payload,
});

/**
 * Reset Fetch ReviewForApproval State
 *
 * @param payload
 */
export const fetchAllReviewForApprovalReset = (payload?: any) => ({
  type: ReviewForApprovalActionTypes.FETCH_ALL_REVIEW_FOR_APPROVAL_RESET,
  payload: payload,
});
