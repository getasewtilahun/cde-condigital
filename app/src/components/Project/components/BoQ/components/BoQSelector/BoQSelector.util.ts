import { ProjectTypes } from "../../../../../../../constants/Constants";
import { Boq } from "../../../../../../../redux/Boq/Boq.type";
import { BoqStandard } from "../../../../../../../redux/BoqStandard/BoqStandard.type";
import { ApiCallState } from "../../../../../../../redux/Utils";
import { BoQRegistrationStructure } from "../../BoQ.util";

export type BoQSelectorPropType = {
  setData: Function;
  fetchBoqStandard: Function;
  data: BoQRegistrationStructure[];
  boq_standard: ApiCallState<BoqStandard[]>;
  project_type: string;
  sheet_name: string;
};
