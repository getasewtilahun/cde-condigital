export const GOOD_RECEIVE_TYPE = {
  FULL: "Full Complete Order",
  PARTIAL: "Partial Shipment with Balance Pending",
  FINAL: "Final Shipment Completing the Order",
  OVER: "Over Delivered",
};

export const REGULAR_RECURRENCE = {
  EVERY_DAY: "Every Day",
  EVERY_WEEK: "Every Week",
  EVERY_TWO_WEEKS: "Every Two Weeks",
  EVERY_MONTH: "Every Month",
  EVERY_THREE_MONTHS: "Every Three Months",
  TWICE_A_YEAR: "Twice a Year",
  ANNUALLY: "Annually",
};

export const CommunicationSocketEvents = {
  NEW_COMMUNICATION_GROUP: "NEW_COMMUNICATION_GROUP",
  JOIN_ROOMS: "JOIN_ROOMS",
  LEAVE_ROOM: "LEAVE_ROOM",
  NEW_MESSAGE: "NEW_MESSAGE",
} as const;

export const ALLOWED_FILE_SIZE = 104860000;


export const REGULAR_TASK_REPORT_TYPE = {
  MODULE: "Module",
  TASK_REPORT: "Task Report",
};

export const PHISON_CONSTRUCTION_BASE64 =
  "data:image/png;base64,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";
export const HEADER_TABLE_THEME: any = "TableStyleLight1";
export const MAIN_TABLE_THEME: any = "TableStyleLight9";

export const UNITS = [
  { name: "M", value: "m", type: "length" },
  { name: "M²", value: "m2", type: "area" },
  { name: "M³", value: "m3", type: "volume" },
  { name: "KM", value: "km", type: "length" },
  { name: "KG", value: "kg", type: "mass" },
  { name: "ከርጢት", value: "ከርጢት", type: "mass" },
  { name: "Lt.", value: "l", type: "volume" },
  { name: "ML", value: "ml", type: "volume" },
  { name: "PCS", value: "pcs", type: "no" },
  { name: "Roll", value: "roll", type: "no" },
  { name: "Berga", value: "berga", type: "no" },
  { name: "Trip", value: "trip", type: "no" },
  { name: "Biajo", value: "biajo", type: "no" },
  { name: "Bag", value: "bag", type: "no" },
  { name: "Bulk", value: "bulk", type: "no" },
  { name: "Nº", value: "no", type: "no" },
  { name: "Quintal", value: "quintal", type: "mass" },
  { name: "Ton", value: "ton", type: "mass" },
  { name: "SET", value: "set", type: "no" },
  { name: "ሸክም", value: "ሸክም", type: "no" },
  { name: "ካርቶን", value: "ካርቶን", type: "no" },
  { name: "Truck", value: "truck", type: "no" },
  { name: "Gallon", value: "gal", type: "volume" },
  { name: "Packet", value: "packet", type: "no" },
  { name: "Ream", value: "ream", type: "no" },
  { name: "Drum", value: "drum", type: "no" },
  { name: "Barrel", value: "barrel", type: "no" },
  { name: "Pair", value: "pair", type: "no" },
  { name: "Kit", value: "kit", type: "no" },
  { name: "Ka", value: "ka", type: "no" },
];
export const Approval = {
  NOT_APPROVED: 0,
  WAITING: 1,
  APPROVED: 2,
  PRE_CONTRACT: 3,
};
export const Action = {
  REGISTER: "register",
  REPORT: "report",
  UPDATE: "update",
  DELETE: "delete",
  APPROVE: "approve",
  CHECK: "check",
};
export const CastingDateStatus = {
  PENDING: "PENDING",
  TESTED: "TESTED",
  NO_CUBE: "NO CUBE",
};
export const UserStatus = {
  PENDING: "Pending",
  ACTIVATED: "Activated",
  TERMINATED: "Terminated",
};

export const VAT = 1.15;

export const TelegramAPIRequestType = {
  SET_WEBHOOK: "setWebhook",
  SEND_MESSAGE: "sendMessage",
};

export const Status = {
  PENDING: 0,
  APPROVED: 1,
  REVISE: 2,
};

export const MODULES = {
  PROCUREMENT: "Procurement",
  INVENTORY: "Inventory",
  OPERATION: "Operation",
};

export const BuildType = {
  PROJECT: "project",
  ENTERPRISE: "enterprise",
};



export enum documentAssignmentStatus {
  PENDING = "pending",
  APPROVED = "approved"
}