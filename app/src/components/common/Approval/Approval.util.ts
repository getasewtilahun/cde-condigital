export type ApprovalPropType = {
  onAction: Function;
  payload: {
    id: number;
    type: "View" | "Check" | "Approve";
    status: number;
    assigned_by: number;
    user_id: number;
  }[];
};

export const sortStatusesByPriority = (
  payload: {
    id: number;
    type: "View" | "Check" | "Approve";
    status: number;
    assigned_by: number;
    user_id: number;
  }[]
) => {
  const sortObjectWeight: Record<string, number> = {
    Approve: 3,
    Check: 2,
  };

  return payload.sort((a, b) => {
    let statusA = sortObjectWeight[a.type] ?? 1;
    let statusB = sortObjectWeight[b.type] ?? 1;

    return statusA - statusB;
  });
};
