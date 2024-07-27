import { ConstantProps } from "../router/Constants";

export const Status = {
  PENDING: 0,
  APPROVED: 1,
  REVISE: 2,
};

export const CommunicationSocketEvents = {
  NEW_COMMUNICATION_GROUP: "NEW_COMMUNICATION_GROUP",
  JOIN_ROOMS: "JOIN_ROOMS",
  LEAVE_ROOM: "LEAVE_ROOM",
  NEW_MESSAGE: "NEW_MESSAGE",
} as const;

export const HEADER_TABLE_THEME: any = "TableStyleLight1";
export const MAIN_TABLE_THEME: any = "TableStyleLight9";

export const DATE_FORMAT = "DD/MM/YYYY";

export const telegram_bot_url = "https://t.me/Phisonrebot";

export const ETHIOPIAN_MONTHS = [
  "መስከረም",
  "ጥቅምት",
  "ኅዳር",
  "ታኅሣሥ",
  "ጥር",
  "የካቲት",
  "መጋቢት",
  "ሚያዝያ",
  "ግንቦት",
  "ሰኔ",
  "ሐምሌ",
  "ነሐሴ",
  "ጳጉሜ",
];

export const Message = {
  UPLOAD_SUCCESS: "Upload successful",
  UPLOAD_FAILED: "Upload failed",
  LABOUR_ATTENDANCE_REMOVED: "Attendance Removed!",
  LABOUR_ATTENDANCE_FAILED: "Failed to Remove Attendance!",
  BONUS_SUCCESS: "Bonus successfully registered",
  BONUS_FAILED: "Bonus is not registered",
  DELETE_BONUS_SUCCESS: "Bonus deleted",
  DELETE_BONUS_FAILED: "Bonus not deleted",
  ADD_EMPLOYEE_REVIEW_SUCCESS: "Employee review added successfully",
  ADD_EMPLOYEE_REVIEW_FAILED: "Employee review could not be added",
  EMPLOYEE_REVIEW_UPDATE_SUCCESS: "Employee review updated Successfully",
  EMPLOYEE_REVIEW_UPDATE_FAILURE: "Employee review update failed",
  DELETE_EMPLOYEE_REVIEW_SUCCESS: "Employee review deleted",
  DELETE_EMPLOYEE_REVIEW_FAILED: "Employee review not deleted",
  REVIEW_FORM_UPDATE_SUCCESS: "Review form updated",
  REVIEW_FORM_UPDATE_FAILURE: "Review form update failed",
  REVIEW_FORM_SUCCESS: "Review Form Added Successfully",
  REVIEW_FORM_FAILURE: "Review form not added",
  DELETE_REVIEW_FORM_SUCCESS: "Review form deleted",
  DELETE_REVIEW_FORM_FAILED: "Review form not deleted",
  PROJECT_REGISTRATION_SUCCESS: "Project Registered!",
  PROJECT_REGISTRATION_FAILED: "Project Registration Failed!",
  BOQ_EDIT_SUCCESS: "BoQ Edited",
  BOQ_EDIT_FAILED: "Failed to Edit BoQ ",
  MODE_OF_PAYMENT_SUCCESS: "Execution Plan Registered!",
  MODE_OF_PAYMENT_FAILED: "Execution Plan Failed!",
  ACTIVITY_PLAN_SUCCESS: "Activity Plan Registered!",
  ACTIVITY_PLAN_FAILED: "Activity Plan Failed!",
  SUB_CONTRACT_PLAN_SUCCESS: "Sub Contract Plan Registered!",
  SUB_CONTRACT_PLAN_FAILED: "Sub Contract Plan Failed!",
  RESOURCE_STATUS_SUCCESS: "Resource Status Registered!",
  RESOURCE_STATUS_FAILED: "Resource Status Failed!",
  CAN_NOT_REMOVE_ITEM: "Can not remove item",
  REMOVE_FAIL: "Can not remove registered data",
  REBAR_FAILED: "Rebar Report Failed!",
  REBAR_SUCCESS: "Rebar Reported!",
  REBAR_REMOVE_FAILED: "Failed to Remove Rebar!",
  REBAR_REMOVE_SUCCESS: "Rebar Removed!",
  TAKEOFF_FAILED: "Takeoff Report Failed!",
  TAKEOFF_SUCCESS: "Takeoff Reported!",
  TAKEOFF_REMOVE_FAILED: "Failed to Remove Takeoff!",
  TAKEOFF_REMOVE_SUCCESS: "Takeoff Remove Failed",
  GENERAL_SUCCESS: "Report Successful!",
  PAYMENT_CERTIFICATE_SUCCESS: "Payment Certificate Registered!",
  PAYMENT_CERTIFICATE_FAILED: "Payment Certificate Registration Failed!",

  ESTIMATE_COST_ADDED: "Estimate cost added",
  ESTIMATE_COST_NOT_ADDED: "Estimate cost not added",

  ESTIMATE_COST_UPDATED: "Estimate cost updated",
  ESTIMATE_COST_NOT_UPDATED: "Estimate cost not updated",

  MATERIAL_SUCCESS: "Material Registered!",
  MATERIAL_FAILED: "Material Registration Failed!",
  SUPPLIER_SUCCESS: "Supplier Registered!",
  SUPPLIER_FAILED: "Supplier Registration Failed!",
  INVENTORY_SUCCESS: "Inventory Registered",
  INVENTORY_FAILED: "Inventory Registration Failed!",
  TRANSFER_SUCCESS: "Transfer Successful!",
  TRANSFER_FAILED: "Transfer Failed!",

  ESTIMATE_UPDATED: "Estimate updated",
  ESTIMATE_NOT_UPDATED: "Estimate not updated",

  ESTIMATE_DELETED: "Estimate deleted",
  ESTIMATE_NOT_DELETED: "Estimate not deleted",

  ESTIMATE_SUCCESS: "Estimate added",
  ESTIMATE_FAILED: "Estimate not added",

  USER_REGISTRATION_SUCCESS: "User Registration Successful",
  USER_REGISTRATION_FAILED: "Failed to Register User",

  LABOUR_SUCCESS: "Labour Registered",
  LABOUR_FAILED: "Labour Registration Failed!",

  LABOUR_USAGE_SUCCESS: "Labour Usage Registered",
  LABOUR_USAGE_FAILED: "Labour Usage Registration Failed!",

  EQUIPMENT_SCHEDULE_SUCCESS: "Equipment Schedule Registered",
  EQUIPMENT_SCHEDULE_FAILED: "Equipment Schedule Registration Failed!",

  MATERIAL_SCHEDULE_SUCCESS: "Material Schedule Registered",
  MATERIAL_SCHEDULE_FAILED: "Material Schedule Registration Failed!",

  TEMPORARY_LABOUR_SUCCESS: "Labour Registered",
  TEMPORARY_LABOUR_FAILED: "Labour Registration Failed!",

  WEEKLY_REPORT_PENDING_SUCCESS: "Weekly report updated",
  WEEKLY_REPORT_PENDING_FAILURE: "Weekly report not updated",

  SITE_DIARY_PENDING_SUCCESS: "Site diary updated",
  SITE_DIARY_PENDING_FAILURE: "Site diary not updated",

  SAVED: "Saved",
  NOT_SAVED: "Not Saved",

  ACCOUNT_SUCCESS: "Account Registered",
  ACCOUNT_FAILED: "Account Registration Failed!",
  ACCOUNT_UPDATE_SUCCESS: "Account Updated",
  ACCOUNT_UPDATE_FAILED: "Account Update Failed!",

  BUILDING_ADDED: "Building registered",
  BUILDING_NOT_ADDED: "Building not registered",

  BUILDING_UPDATED: "Building updated",
  BUILDING_NOT_UPDATED: "Building not updated",

  CUSTOMER_SUCCESS: "Customer Registered",
  CUSTOMER_FAILED: "Customer Registration Failed!",
  CUSTOMER_UPDATE_SUCCESS: "Customer Updated",
  CUSTOMER_UPDATE_FAILED: "Customer Update Failed!",

  APARTMENT_NOT_DELETED: "Apartment not deleted",

  SERVICE_SUCCESS: "Service Registered",
  SERVICE_FAILED: "Service Registration Failed!",
  SERVICE_UPDATE_SUCCESS: "Service Updated",
  SERVICE_UPDATE_FAILED: "Service Update Failed!",

  PERMANENT_MANPOWER_SUCCESS: "Permanent Manpower Registered",
  PERMANENT_MANPOWER_FAILED: "Permanent Manpower Registration Failed!",

  REMOVE_SUCCESS: "Successfully Removed!",
  REMOVE_FAILED: "Failed to Remove ",

  UNIT_BREAKDOWN_SUCCESS: "Unit-Breakdown Registered",
  UNIT_BREAKDOWN_FAILED: "Unit-Breakdown Registration Failed!",

  VARIATION_SUCCESS: "Variation Registered",
  VARIATION_FAILED: "Variation Registration Failed!",

  PAYMENT_APPROVAL_SUCCESS: "Payment Approval Successful",
  PAYMENT_APPROVAL_FAILED: "Payment Approval Failed!",

  PAYMENT_REJECT_SUCCESS: "Payment Rejected",
  PAYMENT_REJECT_FAILED: "Failed to Reject",

  PAYMENT_CERTIFICATE_ALREADY_GENERATED: "Payment Already Generated!",

  SUB_CONTRACT_SUCCESS: "Sub Contract Registered!",
  SUB_CONTRACT_FAILED: "Sub Contract Registration Failed!",

  SITE_DIARY_DELETE_SUCCESS: "Site diary deleted",
  SITE_DIARY_DELETE_FAILURE: "Site diary not deleted",

  INVOICE_SUCCESS: "Invoice Registered!",
  INVOICE_FAILED: "Invoice Registration Failed!",

  PAYMENT_SUCCESS: "Revenue Registered!",
  PAYMENT_FAILED: "Revenue Registration Failed!",

  PAYMENT_REMOVE_SUCCESS: "Revenue Removed!",
  PAYMENT_REMOVE_FAILED: "Failed to Remove Revenue",

  CONTRACT_SALES_SUCCESS: "Contract sales added",
  CONTRACT_SALES_FAILED: "Contract sales failed",

  WEEKLY_REPORT_DELETE_SUCCESS: "Weekly report deleted",
  wEEKLY_REPORT_DELETE_FAILURE: "Weekly report not deleted",

  EXPENSE_SUCCESS: "Expense Registered!",
  EXPENSE_FAILED: "Expense Registration Failed!",

  RFI_SUCCESS: "RFI Registered",
  RFI_FAILED: "RFI registration failed",

  RFI_RESPONSE_SUCCESS: "RFI Response Registered",
  RFI_RESPONSE_FAILED: "RFI Response registration failed",

  MEETING_SUCCESS: "Meeting Added!",
  MEETING_FAILED: " Failed to Add Meeting!",

  MEETING_REMOVED_SUCCESS: "Meeting Removed!",
  MEETING_REMOVED_FAILED: "Failed to Remove Meeting!",

  EXPENSE_REMOVE_SUCCESS: "Expense Removed!",
  EXPENSE_REMOVE_FAILED: "Failed to Remove Expense",

  PRICE_ESCALATION_SUCCESS: "Price Escalation Updated!",
  PRICE_ESCALATION_FAILED: "Price Escalation Update Failed!",

  PRICE_ADJUSTMENT_SUCCESS: "Price Adjustment Updated!",
  PRICE_ADJUSTMENT_FAILED: "Price Adjustment Update Failed!",

  DOCUMENT_DOWNLOAD_FAILED: "Document Download Failed!",
  DOCUMENT_REMOVE_SUCCESS: "Document Removed Success!",
  DOCUMENT_REMOVE_FAILED: "Failed to Remove Document!",

  DOCUMENT_UPLOAD_SUCCESS: "Document Upload Success!",
  DOCUMENT_UPLOAD_FAILED: "Failed to Upload Document!",

  SHE_SUCCESS: "SHE successfully added",
  SHE_FAILED: "SHE failed to register",

  DEPARTMENT_SUCCESS: "Department Registered!",
  DEPARTMENT_FAILED: "Failed to Register Department!",

  DEPARTMENT_UPDATE_SUCCESS: "Department Updated!",
  DEPARTMENT_UPDATE_FAILED: "Failed to Update Department!",

  STAFF_SUCCESS: "Staff Registered!",
  STAFF_FAILED: "Failed to  Registered Staff!",

  STAFF_UPDATE_SUCCESS: "Staff Updated!",
  STAFF_UPDATE_FAILED: "Failed to  Update Staff!",

  STAFF_TERMINATED_SUCCESS: "Staff Terminated!",
  STAFF_TERMINATED_FAILURE: "Failed to Terminate Staff!",
  PROJECT_ASSIGNED_SUCCESS: "Project Assigned Successful!",
  PROJECT_ASSIGNED_FAILED: "Project Assignment Failed!",

  EXPORT_FAILED: "Export Failed",
  ADVANCE_BUDGET: "Advance Should be Less then Budget",
  PROJECT_UPDATE_SUCCESS: "Project Update Successful!",
  PROJECT_UPDATE_FAILED: "Project Update Failed!",

  PROJECT_REMOVE_SUCCESS: "Demo Project Removed",
  PROJECT_REMOVE_FAILED: "Failed to Remove Project",

  MANPOWER_OVERTIME_SUCCESS: "Overtime Report Successful!",
  MANPOWER_OVERTIME_FAILED: "Overtime Report Failed!",

  PAYROLL_SUCCESS: "Payroll Registered Successful!",
  PAYROLL_FAILED: "Payroll Registration Failed!",

  PAYROLL_ROLLBACK_SUCCESS: "Payroll Rollback Successful!",
  PAYROLL_ROLLBACK_FAILED: "Payroll Rollback Failed!",

  SCHEDULING_FAILED: "Scheduling Error",

  EMPTY_FIELD: "Empty Field",

  EMPLOYEE_REQUEST_SUCCESS: "Employee Request Registered!",
  EMPLOYEE_REQUEST_FAILED: "Employee Request Registration Failed!",

  MATERIAL_REQUISITION_SUCCESS: "Material Requisition Registered! ",
  MATERIAL_REQUISITION_FAILED: "Material Requisition Registration Failed!",

  PURCHASE_REQUISITION_SUCCESS: "Purchase Requisition Registered! ",
  PURCHASE_REQUISITION_FAILED: "Purchase Requisition Registration Failed!",

  PURCHASE_ORDER_SUCCESS: "Purchase Order Registered! ",
  PURCHASE_ORDER_FAILED: "Purchase Order Registration Failed!",

  PURCHASE_BILLING_SUCCESS: "Purchase Billing Registered!",
  PURCHASE_BILLING_FAILED: "Purchase Billing Registration Failed!",

  GOOD_RECEIVED_SUCCESS: "Good Received Registered!",
  GOOD_RECEIVED_FAILED: "Good Received Registered Failed!",

  GOOD_OUT_SUCCESS: "Good Out Registered!",
  GOOD_OUT_FAILED: "Good Out Registered Failed!",

  PROMOTION_SUCCESS: "Employee Promoted!",
  PROMOTION_FAILED: "Employee Promotion Failed!",

  WORK_ORDER_SUCCESS: "Work Order Registered!",
  WORK_ORDER_FAILED: "Work Order Registration Failed!",

  WORK_ORDER_REMOVE_SUCCESS: "Work Order Removed!",
  WORK_ORDER_REMOVE_FAILED: "Failed to Remove Work Order!",

  ABSENCE_REGISTERED: "Absence Registered!",
  ABSENCE_REGISTRATION_FAILED: "Absence Registration Failed!",
  ABSENCE_REMOVED: "Absence Removed!",
  ABSENCE_REMOVAL_FAILED: "Absence Removal Failed!",
  ABSENCE_ALREADY_REGISTERED: "Can Not Register Absence!",

  HR_POLICY_REGISTERED: "HR Policy Registered!",
  HR_POLICY_REGISTRATION_FAILED: "HR Policy Registration Failed!",
  HR_POLICY_UPDATED: "HR Policy Updated!",
  HR_POLICY_UPDATE_FAILED: "HR Policy Update Failed!",
  HR_POLICY_REMOVED: "HR Policy Removed!",
  HR_POLICY_REMOVAL_FAILED: "HR Policy Removal Failed!",
  HR_POLICY_ALREADY_REGISTERED: "HR Policy Already Registered",

  BENEFIT_REQUEST_REMOVED_SUCCESS: "Benefit Removed!",
  BENEFIT_REQUEST_REMOVED_FAILED: "Failed to Remove!",

  MATERIAL_USAGE_REMOVED_SUCCESS: "Material Usage Removed!",
  MATERIAL_USAGE_REMOVED_FAILED: "Failed to Remove!",

  ALLOWANCE_REGISTERED: "Allowance Registered!",
  ALLOWANCE_REMOVED: "Allowance Removed!",

  ALLOWANCE_REGISTRATION_FAILED: "Failed to Register Allowance!",
  ALLOWANCE_REMOVAL_FAILED: "Failed to Remove!",
  ALLOWANCE_ALREADY_REGISTERED: "Allowance Already Registered",

  EMPLOYEE_ACCOMMODATION_PLAN_SUCCESS: "Employee Accommodation Registered!",
  EMPLOYEE_ACCOMMODATION_PLAN_FAILED:
    "Failed to Register Employee Accommodation!",
  EMPLOYEE_NOT_FOUND: "Employee Not Found!",

  CHECKED_SUCCESS: "Item Checked",
  GENERAL_FAILED: "Action Failed",

  APPROVED_SUCCESS: "Item Approved",
  APPROVED_FAILED: "Approval Failed",

  REVISION_SUCCESS: "Item on revision",
  REVISION_FAILED: "Revision failed",

  ITEM_REMOVED: "Item Removed",

  RESOURCE_SUCCESS: "Resource Registered!",
  RESOURCE_FAILED: "Failed to Register Resource!",

  MATERIAL_REQUISITION_REMOVE_SUCCESS: "Material Requisition Removed!",
  MATERIAL_REQUISITION_REMOVE_FAILED: "Failed to Remove Material Requisition!",
  SIGNATURE_SUCCESS: "Signature Registered!",
  SIGNATURE_FAILED: "Failed to Register Signature!",

  SIGNATURE_REMOVE_SUCCESS: "Signature Removed!",
  SIGNATURE_REMOVE_FAILED: "Failed to Remove Signature!",

  PURCHASE_REQUISITION_REMOVE_SUCCESS: "Purchase Requisition Removed!",
  PURCHASE_REQUISITION_REMOVE_FAILED: "Failed to Remove Purchase Requisition!",

  PURCHASE_ORDER_REMOVE_SUCCESS: "Purchase Order Removed!",
  PURCHASE_ORDER_REMOVE_FAILED: "Failed to Remove Purchase Order!",

  INSPECTION_FORM_SUCCESS: "Inspection Form Registered!",
  INSPECTION_FORM_FAILED: "Failed to Registered Inspection Form!",

  INSPECTION_FORM_EDIT_SUCCESS: "Inspection Form Edited!",
  INSPECTION_FORM_EDIT_FAILED: "Failed to Edit Inspection Form!",

  INSPECTION_FORM_DELETE_SUCCESS: "Inspection Form Deleted!",
  INSPECTION_FORM_DELETE_FAILED: "Failed to Delete Inspection Form!",

  CASTING_FORM_SUCCESS: "Casting Registered!",
  CASTING_FORM_FAILED: "Failed to Register Casting!",

  TEST_FORM_SUCCESS: "Test Registered!",
  TEST_FORM_FAILED: "Failed to Register Test!",

  SUBMITTAL_SUCCESS: "Submittal Registered!",
  SUBMITTAL_FAILED: "Failed to Register Submittal!",

  REMARK_SUCCESS: "Remark Registered!",
  REMARK_FAILED: "Failed to Register Remark!",

  MATERIAL_APPROVAL_SUCCUSS: "Material Request Registered!",
  MATERIAL_APPROVAL_FAILED: "Material Request FAILED!",

  SITE_DIARY_SUCCESS: "Site Diary Registered!",
  SITE_DIARY_FAILURE: "Failed to Register Site Diary!",

  SITE_DIARY_UPDATE_SUCCESS: "Site Diary Updated Successfuly",
  SITE_DIARY_UPDATE_FAILED: "Site Diary Update Failed",

  WEEKLY_REPORT_SUCCESS: "Weekly report registered",
  WEEKLY_REPORT_FAILURE: "Weekly report not added",

  WEEKLY_PROGRESS_SUCCESS: "Weekly progress added successfuly",
  WEEKLY_PROGRESS_FAILURE: "Weekly Progress not added",

  WEEKLY_PROGRESS_UPDATE_SUCCESS: "Weekly Progress update successfuly",
  WEEKLY_PROGRESS_UPDATE_FAILURE: "Weekly Progress update failed",

  QUERY_SUCCESS: "Query Registered!",
  QUERY_FAILED: "Query Failed",

  SHARED_DOCUMENT_SUCCESS: "Document Shared!",
  SHARED_DOCUMENT_FAILED: "Document Sharing Failed!",

  DOCUMENT_STATUS_UPDATE_SUCCESS: "Document Status Updated!",
  DOCUMENT_STATUS_UPDATE_FAILED: "Failed to Update Document Status!",

  ACTION_REGISTERER_SUCCESS: "Item Action Registered",
  ACTION_REGISTERER_FAILED: "Item Action Registration Failed",

  BANK_ACCOUNT_REGISTERED_SUCCESS: "Bank Account Registered!",
  BANK_ACCOUNT_REGISTERED_FAILED: "Bank Account Registration failed!",

  ACCOUNT_TRANSACTION_REGISTERED_SUCCESS: "Account Transaction Registered!",
  ACCOUNT_TRANSACTION_REGISTERED_FAILED:
    "Account Transaction Registration failed!",

  LETTER_REGISTRATION_SUCCESS: "Letter Registered!",
  LETTER_REGISTRATION_FAILED: "Failed to Register Letter",

  USER_ASSIGNED_SUCCESS: "User Assigned!",
  USER_ASSIGNED_FAILED: "Failed to Assign User!",

  REJECT_SUCCESS: "Report Rejected!",
  REJECT_FAILED: "Failed to Reject Report!",

  CONTRACT_REGISTERED_SUCCESS: "Contract Registered!",
  CONTRACT_REGISTERED_FAILED: "Failed to Register Contract!",

  CONTRACT_PROJECT_REGISTRATION_SUCCESS: "Contract Project Registered!",
  CONTRACT_PROJECT_REGISTRATION_FAILED: "Failed to register Contract Project",

  CONTRACT_PROJECT_UPDATE_SUCCESS: "Contract Project updated!",
  CONTRACT_PROJECT_UPDATE_FAILED: "Failed to update Contract Project",

  CONTRACT_PROJECT_DELETE_SUCCESS: "Contract Project deleted!",
  CONTRACT_PROJECT_DELETE_FAILED: "Failed to delete Contract Project",

  RECEIVABLE_REGISTRATION_SUCCESS: "Receivable Registered!",
  RECEIVABLE_REGISTRATION_FAILED: "Failed to Register Receivable!",

  PAYABLE_DELETE_SUCCESS: "Payable deleted!",
  PAYABLE_DELETE_FAILED: "Failed to deleted Payable",

  RECEIVABLE_UPDATE_SUCCESS: "Receivable updated!",
  RECEIVABLE_UPDATE_FAILED: "Failed to updated Receivable",

  RECEIVABLE_DELETE_SUCCESS: "Receivable deleted!",
  RECEIVABLE_DELETE_FAILED: "Failed to deleted Receivable",

  ATTACHMENT_REGISTRATION_SUCCESS: "Attachment Registered!",
  ATTACHMENT_REGISTRATION_FAILED: "Failed to Register Attachment",

  ATTACHMENT_DELETE_SUCCESS: "Attachment Deleted!",
  ATTACHMENT_DELETE_FAILED: "Failed to Delete Attachment",

  PETTY_CASH_REGISTRATION_SUCCESS: "Petty Cash Registered!",
  PETTY_CASH_REGISTRATION_FAILED: "Failed to Register Petty Cash",

  REPLENISHMENT_TRANSACTION_REGISTRATION_SUCCESS: "Transaction Registered!",
  REPLENISHMENT_TRANSACTION_REGISTRATION_FAILED:
    "Failed to Register Transaction",

  REQUEST_REPLENISHMENT_REGISTRATION_SUCCESS:
    "Request Replenishment Registered!",
  REQUEST_REPLENISHMENT_REGISTRATION_FAILED: "Failed to Request Replenishment",

  POST_CHECK_REGISTRATION_SUCCESS: "Post Check Registered!",
  POST_CHECK_REGISTRATION_FAILED: "Failed toRegister Post Check",

  POST_CHECK_CASHED_OUT_SUCCESS: "Post Check Cashed Out!",
  POST_CHECK_CASHED_OUT_FAILED: "Failed to Cash Out Post Check",

  POST_CHECK_Drop_SUCCESS: "Post Check Dropped!",
  POST_CHECK_Drop_FAILED: "Failed to Drop Post Check",

  POST_CHECK_UPDATE_SUCCESS: "Post Check Updated!",
  POST_CHECK_UPDATE_FAILED: "Failed to Update Post Check",

  POST_CHECK_DELETE_SUCCESS: "Post Check Deleted!",
  POST_CHECK_DELETE_FAILED: "Failed to Delete Post Check",

  CRV_PAYMENT_REGISTERED_SUCCESS: "CRV Payment Registered!",
  CRV_PAYMENT_REGISTERED_FAILED: "CRV Payment Registration failed!",

  CRV_PAYMENT_REMOVE_SUCCESS: "CRV Payment removed",
  CRV_PAYMENT_REMOVE_FAILED: "Failed to remove CRV Payment",

  CRV_PAYMENT_EDIT_SUCCESS: "CRV Payment Edited!",
  CRV_PAYMENT_EDIT_FAILED: "CRV Payment Edit failed!",

  DAILY_REPORT_SUCCESS: "Daily Report Registered!",
  DAILY_REPORT_FAILED: "Failed to Register Daily Report",

  DAILY_DELETE_SUCCESS: "Daily Report Deleted!",
  DAILY_DELETE_FAILED: "Failed to Delete Daily Report",

  CHECK_LIST_REGISTRATION_SUCCESS: "Check List registered successfully!",
  CHECK_LIST_REGISTRATION_FAILED: "Failed to register Check List",

  CHECK_LIST_DELETE_SUCCESS: "Check List deleted Successfully!",
  CHECK_LIST_DELETE_FAILED: "Failed to delete Check List",

  CASTING_UPDATE_SUCCESS: "Casting updated!",
  CASTING_UPDATE_FAIL: "Failed to update Casting",

  CASTING_DELETE_SUCCESS: "Casting deleted!",
  CASTING_DELETE_FAILED: "Failed to delete Casting",

  INSPECTION_REQUEST_UPDATE_SUCCESS: "Inspection updated!",
  INSPECTION_REQUEST_UPDATE_FAILED: "Failed to update Inspection",

  INSPECTION_REQUEST_DELETE_SUCCESS: "Inspection deleted!",
  INSPECTION_REQUEST_DELETE_FAILED: "Failed to delete Inspection",

  TEST_RESULT_UPDATE_SUCCESS: "Test Result updated successfully!",
  TEST_RESULT_UPDATE_FAILED: "Failed to update Test Result update",

  TEST_RESULT_DELETE_SUCCESS: "Test Result deleted successfully!",
  TEST_RESULT_DELETE_FAIL: "Failed to delete Test Result",

  REPLENISHMENT_TRANSACTION_DELETE_SUCCESS: "Transaction Deleted!",
  REPLENISHMENT_TRANSACTION_DELETE_FAILED: "Failed to Delete Transaction",

  PETTY_CASH_DELETE_SUCCESS: "Petty Cash Deleted!",
  PETTY_CASH_DELETE_FAILED: "Failed to Delete Petty Cash",

  REPLENISHMENT_DELETE_SUCCESS: "Replenishment Deleted!",
  REPLENISHMENT_DELETE_FAILED: "Failed to Delete Replenishment",
};

export const UserTabs = {
  USER_MATRIX: "User Matrix",
  USER_REGISTRATION: "User Registration",
};

export const ApprovalValue = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
  ADVANCE: 3,
};

export const NotificationType = {
  SUCCESS: "success",
  ERROR: "error",
  WARRING: "warning",
  INFO: "info",
};

interface HashMap<Type> {
  [index: number | string]: Type; //indexer
}

export const REBAR_LENGTH = 12;

export const DateTypes = {
  DATE: "Date",
  RANGE: "Range",
};

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
  { name: "Pad", value: "pad", type: "no" },
];

export const ValidationStatus = {
  ERROR: "error",
  VALIDATING: "validating",
};

export const EQUIPMENT_LIST = [
  " Asphalt Batching Plant",
  "Generator",
  "Air Compressor",
  "Tower Cranes",
  "Pile Boring Machine",
  "Pile Driving Machine",
];

export const PaymentMethod = [
  "Cash",
  "Check",
  "Bank Transfer",
  "CPO",
  "Credit",
];

export const VAT = 1.15;
export const WITHHOLD = 1.02;

export const CURRENCY_LIST = [
  {
    code: "AED",
    description: "United Arab Emirates Dirham",
  },
  {
    code: "AFN",
    description: "Afghan Afghani**",
  },
  {
    code: "ALL",
    description: "Albanian Lek",
  },
  {
    code: "AMD",
    description: "Armenian Dram",
  },
  {
    code: "ANG",
    description: "Netherlands Antillean Gulden",
  },
  {
    code: "AOA",
    description: "Angolan Kwanza**",
  },
  {
    code: "ARS",
    description: "Argentine Peso**",
  },
  {
    code: "AUD",
    description: "Australian Dollar",
  },
  {
    code: "AWG",
    description: "Aruban Florin",
  },
  {
    code: "AZN",
    description: "Azerbaijani Manat",
  },
  {
    code: "BAM",
    description: "Bosnia & Herzegovina Convertible Mark",
  },
  {
    code: "BBD",
    description: "Barbadian Dollar",
  },
  {
    code: "BDT",
    description: "Bangladeshi Taka",
  },
  {
    code: "BGN",
    description: "Bulgarian Lev",
  },
  {
    code: "BIF",
    description: "Burundian Franc",
  },
  {
    code: "BMD",
    description: "Bermudian Dollar",
  },
  {
    code: "BND",
    description: "Brunei Dollar",
  },
  {
    code: "BOB",
    description: "Bolivian Boliviano**",
  },
  {
    code: "BRL",
    description: "Brazilian Real**",
  },
  {
    code: "BSD",
    description: "Bahamian Dollar",
  },
  {
    code: "BWP",
    description: "Botswana Pula",
  },
  {
    code: "BZD",
    description: "Belize Dollar",
  },
  {
    code: "CAD",
    description: "Canadian Dollar",
  },
  {
    code: "CDF",
    description: "Congolese Franc",
  },
  {
    code: "CHF",
    description: "Swiss Franc",
  },
  {
    code: "CLP",
    description: "Chilean Peso**",
  },
  {
    code: "CNY",
    description: "Chinese Renminbi Yuan",
  },
  {
    code: "COP",
    description: "Colombian Peso**",
  },
  {
    code: "CRC",
    description: "Costa Rican Colón**",
  },
  {
    code: "CVE",
    description: "Cape Verdean Escudo**",
  },
  {
    code: "CZK",
    description: "Czech Koruna**",
  },
  {
    code: "DJF",
    description: "Djiboutian Franc**",
  },
  {
    code: "DKK",
    description: "Danish Krone",
  },
  {
    code: "DOP",
    description: "Dominican Peso",
  },
  {
    code: "DZD",
    description: "Algerian Dinar",
  },
  {
    code: "EGP",
    description: "Egyptian Pound",
  },
  {
    code: "ETB",
    description: "Ethiopian Birr",
  },
  {
    code: "EUR",
    description: "Euro",
  },
  {
    code: "FJD",
    description: "Fijian Dollar",
  },
  {
    code: "FKP",
    description: "Falkland Islands Pound**",
  },
  {
    code: "GBP",
    description: "British Pound",
  },
  {
    code: "GEL",
    description: "Georgian Lari",
  },
  {
    code: "GIP",
    description: "Gibraltar Pound",
  },
  {
    code: "GMD",
    description: "Gambian Dalasi",
  },
  {
    code: "GNF",
    description: "Guinean Franc**",
  },
  {
    code: "GTQ",
    description: "Guatemalan Quetzal**",
  },
  {
    code: "GYD",
    description: "Guyanese Dollar",
  },
  {
    code: "HKD",
    description: "Hong Kong Dollar",
  },
  {
    code: "HNL",
    description: "Honduran Lempira**",
  },
  {
    code: "HRK",
    description: "Croatian Kuna",
  },
  {
    code: "HTG",
    description: "Haitian Gourde",
  },
  {
    code: "HUF",
    description: "Hungarian Forint**",
  },
  {
    code: "IDR",
    description: "Indonesian Rupiah",
  },
  {
    code: "ILS",
    description: "Israeli New Sheqel",
  },
  {
    code: "INR",
    description: "Indian Rupee**",
  },
  {
    code: "ISK",
    description: "Icelandic Króna",
  },
  {
    code: "JMD",
    description: "Jamaican Dollar",
  },
  {
    code: "JPY",
    description: "Japanese Yen",
  },
  {
    code: "KES",
    description: "Kenyan Shilling",
  },
  {
    code: "KGS",
    description: "Kyrgyzstani Som",
  },
  {
    code: "KHR",
    description: "Cambodian Riel",
  },
  {
    code: "KMF",
    description: "Comorian Franc",
  },
  {
    code: "KRW",
    description: "South Korean Won",
  },
  {
    code: "KYD",
    description: "Cayman Islands Dollar",
  },
  {
    code: "KZT",
    description: "Kazakhstani Tenge",
  },
  {
    code: "LAK",
    description: "Lao Kip**",
  },
  {
    code: "LBP",
    description: "Lebanese Pound",
  },
  {
    code: "LKR",
    description: "Sri Lankan Rupee",
  },
  {
    code: "LRD",
    description: "Liberian Dollar",
  },
  {
    code: "LSL",
    description: "Lesotho Loti",
  },
  {
    code: "MAD",
    description: "Moroccan Dirham",
  },
  {
    code: "MDL",
    description: "Moldovan Leu",
  },
  {
    code: "MGA",
    description: "Malagasy Ariary",
  },
  {
    code: "MKD",
    description: "Macedonian Denar",
  },
  {
    code: "MNT",
    description: "Mongolian Tögrög",
  },
  {
    code: "MOP",
    description: "Macanese Pataca",
  },
  {
    code: "MRO",
    description: "Mauritanian Ouguiya",
  },
  {
    code: "MUR",
    description: "Mauritian Rupee**",
  },
  {
    code: "MVR",
    description: "Maldivian Rufiyaa",
  },
  {
    code: "MWK",
    description: "Malawian Kwacha",
  },
  {
    code: "MXN",
    description: "Mexican Peso**",
  },
  {
    code: "MYR",
    description: "Malaysian Ringgit",
  },
  {
    code: "MZN",
    description: "Mozambican Metical",
  },
  {
    code: "NAD",
    description: "Namibian Dollar",
  },
  {
    code: "NGN",
    description: "Nigerian Naira",
  },
  {
    code: "NIO",
    description: "Nicaraguan Córdoba**",
  },
  {
    code: "NOK",
    description: "Norwegian Krone",
  },
  {
    code: "NPR",
    description: "Nepalese Rupee",
  },
  {
    code: "NZD",
    description: "New Zealand Dollar",
  },
  {
    code: "PAB",
    description: "Panamanian Balboa**",
  },
  {
    code: "PEN",
    description: "Peruvian Nuevo Sol**",
  },
  {
    code: "PGK",
    description: "Papua New Guinean Kina",
  },
  {
    code: "PHP",
    description: "Philippine Peso",
  },
  {
    code: "PKR",
    description: "Pakistani Rupee",
  },
  {
    code: "PLN",
    description: "Polish Złoty",
  },
  {
    code: "PYG",
    description: "Paraguayan Guaraní**",
  },
  {
    code: "QAR",
    description: "Qatari Riyal",
  },
  {
    code: "RON",
    description: "Romanian Leu",
  },
  {
    code: "RSD",
    description: "Serbian Dinar",
  },
  {
    code: "RUB",
    description: "Russian Ruble",
  },
  {
    code: "RWF",
    description: "Rwandan Franc",
  },
  {
    code: "SAR",
    description: "Saudi Riyal",
  },
  {
    code: "SBD",
    description: "Solomon Islands Dollar",
  },
  {
    code: "SCR",
    description: "Seychellois Rupee",
  },
  {
    code: "SEK",
    description: "Swedish Krona",
  },
  {
    code: "SGD",
    description: "Singapore Dollar",
  },
  {
    code: "SHP",
    description: "Saint Helenian Pound**",
  },
  {
    code: "SLL",
    description: "Sierra Leonean Leone",
  },
  {
    code: "SOS",
    description: "Somali Shilling",
  },
  {
    code: "SRD",
    description: "Surinamese Dollar**",
  },
  {
    code: "STD",
    description: "São Tomé and Príncipe Dobra",
  },
  {
    code: "SVC",
    description: "Salvadoran Colón**",
  },
  {
    code: "SZL",
    description: "Swazi Lilangeni",
  },
  {
    code: "THB",
    description: "Thai Baht",
  },
  {
    code: "TJS",
    description: "Tajikistani Somoni",
  },
  {
    code: "TOP",
    description: "Tongan Paʻanga",
  },
  {
    code: "TRY",
    description: "Turkish Lira",
  },
  {
    code: "TTD",
    description: "Trinidad and Tobago Dollar",
  },
  {
    code: "TWD",
    description: "New Taiwan Dollar",
  },
  {
    code: "TZS",
    description: "Tanzanian Shilling",
  },
  {
    code: "UAH",
    description: "Ukrainian Hryvnia",
  },
  {
    code: "UGX",
    description: "Ugandan Shilling",
  },
  {
    code: "USD",
    description: "United States Dollar",
  },
  {
    code: "UYU",
    description: "Uruguayan Peso**",
  },
  {
    code: "UZS",
    description: "Uzbekistani Som",
  },
  {
    code: "VND",
    description: "Vietnamese Đồng",
  },
  {
    code: "VUV",
    description: "Vanuatu Vatu",
  },
  {
    code: "WST",
    description: "Samoan Tala",
  },
  {
    code: "XAF",
    description: "Central African Cfa Franc",
  },
  {
    code: "XCD",
    description: "East Caribbean Dollar",
  },
  {
    code: "XOF",
    description: "West African Cfa Franc**",
  },
  {
    code: "XPF",
    description: "Cfp Franc**",
  },
  {
    code: "YER",
    description: "Yemeni Rial",
  },
  {
    code: "ZAR",
    description: "South African Rand",
  },
  {
    code: "ZMW",
    description: "Zambian Kwacha",
  },
];

export const COUNTRY_LIST = [
  {
    name: "Afghanistan",
    dial_code: "+93",
    code: "AF",
  },
  {
    name: "Aland Islands",
    dial_code: "+358",
    code: "AX",
  },
  {
    name: "Albania",
    dial_code: "+355",
    code: "AL",
  },
  {
    name: "Algeria",
    dial_code: "+213",
    code: "DZ",
  },
  {
    name: "AmericanSamoa",
    dial_code: "+1684",
    code: "AS",
  },
  {
    name: "Andorra",
    dial_code: "+376",
    code: "AD",
  },
  {
    name: "Angola",
    dial_code: "+244",
    code: "AO",
  },
  {
    name: "Anguilla",
    dial_code: "+1264",
    code: "AI",
  },
  {
    name: "Antarctica",
    dial_code: "+672",
    code: "AQ",
  },
  {
    name: "Antigua and Barbuda",
    dial_code: "+1268",
    code: "AG",
  },
  {
    name: "Argentina",
    dial_code: "+54",
    code: "AR",
  },
  {
    name: "Armenia",
    dial_code: "+374",
    code: "AM",
  },
  {
    name: "Aruba",
    dial_code: "+297",
    code: "AW",
  },
  {
    name: "Australia",
    dial_code: "+61",
    code: "AU",
  },
  {
    name: "Austria",
    dial_code: "+43",
    code: "AT",
  },
  {
    name: "Azerbaijan",
    dial_code: "+994",
    code: "AZ",
  },
  {
    name: "Bahamas",
    dial_code: "+1242",
    code: "BS",
  },
  {
    name: "Bahrain",
    dial_code: "+973",
    code: "BH",
  },
  {
    name: "Bangladesh",
    dial_code: "+880",
    code: "BD",
  },
  {
    name: "Barbados",
    dial_code: "+1246",
    code: "BB",
  },
  {
    name: "Belarus",
    dial_code: "+375",
    code: "BY",
  },
  {
    name: "Belgium",
    dial_code: "+32",
    code: "BE",
  },
  {
    name: "Belize",
    dial_code: "+501",
    code: "BZ",
  },
  {
    name: "Benin",
    dial_code: "+229",
    code: "BJ",
  },
  {
    name: "Bermuda",
    dial_code: "+1441",
    code: "BM",
  },
  {
    name: "Bhutan",
    dial_code: "+975",
    code: "BT",
  },
  {
    name: "Bolivia, Plurinational State of",
    dial_code: "+591",
    code: "BO",
  },
  {
    name: "Bosnia and Herzegovina",
    dial_code: "+387",
    code: "BA",
  },
  {
    name: "Botswana",
    dial_code: "+267",
    code: "BW",
  },
  {
    name: "Brazil",
    dial_code: "+55",
    code: "BR",
  },
  {
    name: "British Indian Ocean Territory",
    dial_code: "+246",
    code: "IO",
  },
  {
    name: "Brunei Darussalam",
    dial_code: "+673",
    code: "BN",
  },
  {
    name: "Bulgaria",
    dial_code: "+359",
    code: "BG",
  },
  {
    name: "Burkina Faso",
    dial_code: "+226",
    code: "BF",
  },
  {
    name: "Burundi",
    dial_code: "+257",
    code: "BI",
  },
  {
    name: "Cambodia",
    dial_code: "+855",
    code: "KH",
  },
  {
    name: "Cameroon",
    dial_code: "+237",
    code: "CM",
  },
  {
    name: "Canada",
    dial_code: "+1",
    code: "CA",
  },
  {
    name: "Cape Verde",
    dial_code: "+238",
    code: "CV",
  },
  {
    name: "Cayman Islands",
    dial_code: "+ 345",
    code: "KY",
  },
  {
    name: "Central African Republic",
    dial_code: "+236",
    code: "CF",
  },
  {
    name: "Chad",
    dial_code: "+235",
    code: "TD",
  },
  {
    name: "Chile",
    dial_code: "+56",
    code: "CL",
  },
  {
    name: "China",
    dial_code: "+86",
    code: "CN",
  },
  {
    name: "Christmas Island",
    dial_code: "+61",
    code: "CX",
  },
  {
    name: "Cocos (Keeling) Islands",
    dial_code: "+61",
    code: "CC",
  },
  {
    name: "Colombia",
    dial_code: "+57",
    code: "CO",
  },
  {
    name: "Comoros",
    dial_code: "+269",
    code: "KM",
  },
  {
    name: "Congo",
    dial_code: "+242",
    code: "CG",
  },
  {
    name: "Congo, The Democratic Republic of the Congo",
    dial_code: "+243",
    code: "CD",
  },
  {
    name: "Cook Islands",
    dial_code: "+682",
    code: "CK",
  },
  {
    name: "Costa Rica",
    dial_code: "+506",
    code: "CR",
  },
  {
    name: "Cote d'Ivoire",
    dial_code: "+225",
    code: "CI",
  },
  {
    name: "Croatia",
    dial_code: "+385",
    code: "HR",
  },
  {
    name: "Cuba",
    dial_code: "+53",
    code: "CU",
  },
  {
    name: "Cyprus",
    dial_code: "+357",
    code: "CY",
  },
  {
    name: "Czech Republic",
    dial_code: "+420",
    code: "CZ",
  },
  {
    name: "Denmark",
    dial_code: "+45",
    code: "DK",
  },
  {
    name: "Djibouti",
    dial_code: "+253",
    code: "DJ",
  },
  {
    name: "Dominica",
    dial_code: "+1767",
    code: "DM",
  },
  {
    name: "Dominican Republic",
    dial_code: "+1849",
    code: "DO",
  },
  {
    name: "Ecuador",
    dial_code: "+593",
    code: "EC",
  },
  {
    name: "Egypt",
    dial_code: "+20",
    code: "EG",
  },
  {
    name: "El Salvador",
    dial_code: "+503",
    code: "SV",
  },
  {
    name: "Equatorial Guinea",
    dial_code: "+240",
    code: "GQ",
  },
  {
    name: "Eritrea",
    dial_code: "+291",
    code: "ER",
  },
  {
    name: "Estonia",
    dial_code: "+372",
    code: "EE",
  },
  {
    name: "Ethiopia",
    dial_code: "+251",
    code: "ET",
  },
  {
    name: "Falkland Islands (Malvinas)",
    dial_code: "+500",
    code: "FK",
  },
  {
    name: "Faroe Islands",
    dial_code: "+298",
    code: "FO",
  },
  {
    name: "Fiji",
    dial_code: "+679",
    code: "FJ",
  },
  {
    name: "Finland",
    dial_code: "+358",
    code: "FI",
  },
  {
    name: "France",
    dial_code: "+33",
    code: "FR",
  },
  {
    name: "French Guiana",
    dial_code: "+594",
    code: "GF",
  },
  {
    name: "French Polynesia",
    dial_code: "+689",
    code: "PF",
  },
  {
    name: "Gabon",
    dial_code: "+241",
    code: "GA",
  },
  {
    name: "Gambia",
    dial_code: "+220",
    code: "GM",
  },
  {
    name: "Georgia",
    dial_code: "+995",
    code: "GE",
  },
  {
    name: "Germany",
    dial_code: "+49",
    code: "DE",
  },
  {
    name: "Ghana",
    dial_code: "+233",
    code: "GH",
  },
  {
    name: "Gibraltar",
    dial_code: "+350",
    code: "GI",
  },
  {
    name: "Greece",
    dial_code: "+30",
    code: "GR",
  },
  {
    name: "Greenland",
    dial_code: "+299",
    code: "GL",
  },
  {
    name: "Grenada",
    dial_code: "+1473",
    code: "GD",
  },
  {
    name: "Guadeloupe",
    dial_code: "+590",
    code: "GP",
  },
  {
    name: "Guam",
    dial_code: "+1671",
    code: "GU",
  },
  {
    name: "Guatemala",
    dial_code: "+502",
    code: "GT",
  },
  {
    name: "Guernsey",
    dial_code: "+44",
    code: "GG",
  },
  {
    name: "Guinea",
    dial_code: "+224",
    code: "GN",
  },
  {
    name: "Guinea-Bissau",
    dial_code: "+245",
    code: "GW",
  },
  {
    name: "Guyana",
    dial_code: "+595",
    code: "GY",
  },
  {
    name: "Haiti",
    dial_code: "+509",
    code: "HT",
  },
  {
    name: "Holy See (Vatican City State)",
    dial_code: "+379",
    code: "VA",
  },
  {
    name: "Honduras",
    dial_code: "+504",
    code: "HN",
  },
  {
    name: "Hong Kong",
    dial_code: "+852",
    code: "HK",
  },
  {
    name: "Hungary",
    dial_code: "+36",
    code: "HU",
  },
  {
    name: "Iceland",
    dial_code: "+354",
    code: "IS",
  },
  {
    name: "India",
    dial_code: "+91",
    code: "IN",
  },
  {
    name: "Indonesia",
    dial_code: "+62",
    code: "ID",
  },
  {
    name: "Iran, Islamic Republic of Persian Gulf",
    dial_code: "+98",
    code: "IR",
  },
  {
    name: "Iraq",
    dial_code: "+964",
    code: "IQ",
  },
  {
    name: "Ireland",
    dial_code: "+353",
    code: "IE",
  },
  {
    name: "Isle of Man",
    dial_code: "+44",
    code: "IM",
  },
  {
    name: "Israel",
    dial_code: "+972",
    code: "IL",
  },
  {
    name: "Italy",
    dial_code: "+39",
    code: "IT",
  },
  {
    name: "Jamaica",
    dial_code: "+1876",
    code: "JM",
  },
  {
    name: "Japan",
    dial_code: "+81",
    code: "JP",
  },
  {
    name: "Jersey",
    dial_code: "+44",
    code: "JE",
  },
  {
    name: "Jordan",
    dial_code: "+962",
    code: "JO",
  },
  {
    name: "Kazakhstan",
    dial_code: "+77",
    code: "KZ",
  },
  {
    name: "Kenya",
    dial_code: "+254",
    code: "KE",
  },
  {
    name: "Kiribati",
    dial_code: "+686",
    code: "KI",
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    dial_code: "+850",
    code: "KP",
  },
  {
    name: "Korea, Republic of South Korea",
    dial_code: "+82",
    code: "KR",
  },
  {
    name: "Kuwait",
    dial_code: "+965",
    code: "KW",
  },
  {
    name: "Kyrgyzstan",
    dial_code: "+996",
    code: "KG",
  },
  {
    name: "Laos",
    dial_code: "+856",
    code: "LA",
  },
  {
    name: "Latvia",
    dial_code: "+371",
    code: "LV",
  },
  {
    name: "Lebanon",
    dial_code: "+961",
    code: "LB",
  },
  {
    name: "Lesotho",
    dial_code: "+266",
    code: "LS",
  },
  {
    name: "Liberia",
    dial_code: "+231",
    code: "LR",
  },
  {
    name: "Libyan Arab Jamahiriya",
    dial_code: "+218",
    code: "LY",
  },
  {
    name: "Liechtenstein",
    dial_code: "+423",
    code: "LI",
  },
  {
    name: "Lithuania",
    dial_code: "+370",
    code: "LT",
  },
  {
    name: "Luxembourg",
    dial_code: "+352",
    code: "LU",
  },
  {
    name: "Macao",
    dial_code: "+853",
    code: "MO",
  },
  {
    name: "Macedonia",
    dial_code: "+389",
    code: "MK",
  },
  {
    name: "Madagascar",
    dial_code: "+261",
    code: "MG",
  },
  {
    name: "Malawi",
    dial_code: "+265",
    code: "MW",
  },
  {
    name: "Malaysia",
    dial_code: "+60",
    code: "MY",
  },
  {
    name: "Maldives",
    dial_code: "+960",
    code: "MV",
  },
  {
    name: "Mali",
    dial_code: "+223",
    code: "ML",
  },
  {
    name: "Malta",
    dial_code: "+356",
    code: "MT",
  },
  {
    name: "Marshall Islands",
    dial_code: "+692",
    code: "MH",
  },
  {
    name: "Martinique",
    dial_code: "+596",
    code: "MQ",
  },
  {
    name: "Mauritania",
    dial_code: "+222",
    code: "MR",
  },
  {
    name: "Mauritius",
    dial_code: "+230",
    code: "MU",
  },
  {
    name: "Mayotte",
    dial_code: "+262",
    code: "YT",
  },
  {
    name: "Mexico",
    dial_code: "+52",
    code: "MX",
  },
  {
    name: "Micronesia, Federated States of Micronesia",
    dial_code: "+691",
    code: "FM",
  },
  {
    name: "Moldova",
    dial_code: "+373",
    code: "MD",
  },
  {
    name: "Monaco",
    dial_code: "+377",
    code: "MC",
  },
  {
    name: "Mongolia",
    dial_code: "+976",
    code: "MN",
  },
  {
    name: "Montenegro",
    dial_code: "+382",
    code: "ME",
  },
  {
    name: "Montserrat",
    dial_code: "+1664",
    code: "MS",
  },
  {
    name: "Morocco",
    dial_code: "+212",
    code: "MA",
  },
  {
    name: "Mozambique",
    dial_code: "+258",
    code: "MZ",
  },
  {
    name: "Myanmar",
    dial_code: "+95",
    code: "MM",
  },
  {
    name: "Namibia",
    dial_code: "+264",
    code: "NA",
  },
  {
    name: "Nauru",
    dial_code: "+674",
    code: "NR",
  },
  {
    name: "Nepal",
    dial_code: "+977",
    code: "NP",
  },
  {
    name: "Netherlands",
    dial_code: "+31",
    code: "NL",
  },
  {
    name: "Netherlands Antilles",
    dial_code: "+599",
    code: "AN",
  },
  {
    name: "New Caledonia",
    dial_code: "+687",
    code: "NC",
  },
  {
    name: "New Zealand",
    dial_code: "+64",
    code: "NZ",
  },
  {
    name: "Nicaragua",
    dial_code: "+505",
    code: "NI",
  },
  {
    name: "Niger",
    dial_code: "+227",
    code: "NE",
  },
  {
    name: "Nigeria",
    dial_code: "+234",
    code: "NG",
  },
  {
    name: "Niue",
    dial_code: "+683",
    code: "NU",
  },
  {
    name: "Norfolk Island",
    dial_code: "+672",
    code: "NF",
  },
  {
    name: "Northern Mariana Islands",
    dial_code: "+1670",
    code: "MP",
  },
  {
    name: "Norway",
    dial_code: "+47",
    code: "NO",
  },
  {
    name: "Oman",
    dial_code: "+968",
    code: "OM",
  },
  {
    name: "Pakistan",
    dial_code: "+92",
    code: "PK",
  },
  {
    name: "Palau",
    dial_code: "+680",
    code: "PW",
  },
  {
    name: "Palestinian Territory, Occupied",
    dial_code: "+970",
    code: "PS",
  },
  {
    name: "Panama",
    dial_code: "+507",
    code: "PA",
  },
  {
    name: "Papua New Guinea",
    dial_code: "+675",
    code: "PG",
  },
  {
    name: "Paraguay",
    dial_code: "+595",
    code: "PY",
  },
  {
    name: "Peru",
    dial_code: "+51",
    code: "PE",
  },
  {
    name: "Philippines",
    dial_code: "+63",
    code: "PH",
  },
  {
    name: "Pitcairn",
    dial_code: "+872",
    code: "PN",
  },
  {
    name: "Poland",
    dial_code: "+48",
    code: "PL",
  },
  {
    name: "Portugal",
    dial_code: "+351",
    code: "PT",
  },
  {
    name: "Puerto Rico",
    dial_code: "+1939",
    code: "PR",
  },
  {
    name: "Qatar",
    dial_code: "+974",
    code: "QA",
  },
  {
    name: "Romania",
    dial_code: "+40",
    code: "RO",
  },
  {
    name: "Russia",
    dial_code: "+7",
    code: "RU",
  },
  {
    name: "Rwanda",
    dial_code: "+250",
    code: "RW",
  },
  {
    name: "Reunion",
    dial_code: "+262",
    code: "RE",
  },
  {
    name: "Saint Barthelemy",
    dial_code: "+590",
    code: "BL",
  },
  {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    dial_code: "+290",
    code: "SH",
  },
  {
    name: "Saint Kitts and Nevis",
    dial_code: "+1869",
    code: "KN",
  },
  {
    name: "Saint Lucia",
    dial_code: "+1758",
    code: "LC",
  },
  {
    name: "Saint Martin",
    dial_code: "+590",
    code: "MF",
  },
  {
    name: "Saint Pierre and Miquelon",
    dial_code: "+508",
    code: "PM",
  },
  {
    name: "Saint Vincent and the Grenadines",
    dial_code: "+1784",
    code: "VC",
  },
  {
    name: "Samoa",
    dial_code: "+685",
    code: "WS",
  },
  {
    name: "San Marino",
    dial_code: "+378",
    code: "SM",
  },
  {
    name: "Sao Tome and Principe",
    dial_code: "+239",
    code: "ST",
  },
  {
    name: "Saudi Arabia",
    dial_code: "+966",
    code: "SA",
  },
  {
    name: "Senegal",
    dial_code: "+221",
    code: "SN",
  },
  {
    name: "Serbia",
    dial_code: "+381",
    code: "RS",
  },
  {
    name: "Seychelles",
    dial_code: "+248",
    code: "SC",
  },
  {
    name: "Sierra Leone",
    dial_code: "+232",
    code: "SL",
  },
  {
    name: "Singapore",
    dial_code: "+65",
    code: "SG",
  },
  {
    name: "Slovakia",
    dial_code: "+421",
    code: "SK",
  },
  {
    name: "Slovenia",
    dial_code: "+386",
    code: "SI",
  },
  {
    name: "Solomon Islands",
    dial_code: "+677",
    code: "SB",
  },
  {
    name: "Somalia",
    dial_code: "+252",
    code: "SO",
  },
  {
    name: "South Africa",
    dial_code: "+27",
    code: "ZA",
  },
  {
    name: "South Sudan",
    dial_code: "+211",
    code: "SS",
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    dial_code: "+500",
    code: "GS",
  },
  {
    name: "Spain",
    dial_code: "+34",
    code: "ES",
  },
  {
    name: "Sri Lanka",
    dial_code: "+94",
    code: "LK",
  },
  {
    name: "Sudan",
    dial_code: "+249",
    code: "SD",
  },
  {
    name: "Suriname",
    dial_code: "+597",
    code: "SR",
  },
  {
    name: "Svalbard and Jan Mayen",
    dial_code: "+47",
    code: "SJ",
  },
  {
    name: "Swaziland",
    dial_code: "+268",
    code: "SZ",
  },
  {
    name: "Sweden",
    dial_code: "+46",
    code: "SE",
  },
  {
    name: "Switzerland",
    dial_code: "+41",
    code: "CH",
  },
  {
    name: "Syrian Arab Republic",
    dial_code: "+963",
    code: "SY",
  },
  {
    name: "Taiwan",
    dial_code: "+886",
    code: "TW",
  },
  {
    name: "Tajikistan",
    dial_code: "+992",
    code: "TJ",
  },
  {
    name: "Tanzania, United Republic of Tanzania",
    dial_code: "+255",
    code: "TZ",
  },
  {
    name: "Thailand",
    dial_code: "+66",
    code: "TH",
  },
  {
    name: "Timor-Leste",
    dial_code: "+670",
    code: "TL",
  },
  {
    name: "Togo",
    dial_code: "+228",
    code: "TG",
  },
  {
    name: "Tokelau",
    dial_code: "+690",
    code: "TK",
  },
  {
    name: "Tonga",
    dial_code: "+676",
    code: "TO",
  },
  {
    name: "Trinidad and Tobago",
    dial_code: "+1868",
    code: "TT",
  },
  {
    name: "Tunisia",
    dial_code: "+216",
    code: "TN",
  },
  {
    name: "Turkey",
    dial_code: "+90",
    code: "TR",
  },
  {
    name: "Turkmenistan",
    dial_code: "+993",
    code: "TM",
  },
  {
    name: "Turks and Caicos Islands",
    dial_code: "+1649",
    code: "TC",
  },
  {
    name: "Tuvalu",
    dial_code: "+688",
    code: "TV",
  },
  {
    name: "Uganda",
    dial_code: "+256",
    code: "UG",
  },
  {
    name: "Ukraine",
    dial_code: "+380",
    code: "UA",
  },
  {
    name: "United Arab Emirates",
    dial_code: "+971",
    code: "AE",
  },
  {
    name: "United Kingdom",
    dial_code: "+44",
    code: "GB",
  },
  {
    name: "United States",
    dial_code: "+1",
    code: "US",
  },
  {
    name: "Uruguay",
    dial_code: "+598",
    code: "UY",
  },
  {
    name: "Uzbekistan",
    dial_code: "+998",
    code: "UZ",
  },
  {
    name: "Vanuatu",
    dial_code: "+678",
    code: "VU",
  },
  {
    name: "Venezuela, Bolivarian Republic of Venezuela",
    dial_code: "+58",
    code: "VE",
  },
  {
    name: "Vietnam",
    dial_code: "+84",
    code: "VN",
  },
  {
    name: "Virgin Islands, British",
    dial_code: "+1284",
    code: "VG",
  },
  {
    name: "Virgin Islands, U.S.",
    dial_code: "+1340",
    code: "VI",
  },
  {
    name: "Wallis and Futuna",
    dial_code: "+681",
    code: "WF",
  },
  {
    name: "Yemen",
    dial_code: "+967",
    code: "YE",
  },
  {
    name: "Zambia",
    dial_code: "+260",
    code: "ZM",
  },
  {
    name: "Zimbabwe",
    dial_code: "+263",
    code: "ZW",
  },
];

export const MODULES: ConstantProps = {
  PROJECTS: "Projects",
};
