import { FC, useState } from "react";
import { BoQPropType } from "./BoQ.util";
import "./BoQ.css";
import ImportBoQComponent from "./components/ImportBoQ/ImportBoQ.component";
import BoQRowComponent from "./components/BoQRow/BoQRow.component";
import TabComponent from "./components/Tab/Tab.component";
import BoQSelectorComponent from "./components/BoQSelector/BoQSelector.component";
import { Button } from "antd";
import { getProjectRegistrationData } from "../../../../../utilities/utilities";
import UpgradeModal from "../../../../UpgradeModal/UpgradeModal.component";
import {
  BUILD,
  BuildType,
  TypeOfProject,
} from "../../../../../constants/Constants";

const BoQComponent: FC<BoQPropType> = ({
  data,
  setData,
  project_information,
  setProjectInformation,
  next,
  type,
}) => {
  const [tab, setTab] = useState(data[0]?.sheet_name);
  const setValue = (key: number, name: string, value: any) => {
    const newData = [...data];

    const selected_index = newData.findIndex((e) => e.key === key);
    if (selected_index !== -1) {
      let selected = newData[selected_index];
      selected = { ...selected, [name]: value };
      if (name === "is_title" && value === true) {
        selected = {
          ...selected,
          amount: 0,
          unit_price: 0,
          quantity: 0,
          unit: "",
        };
      } else if (name === "unit_price" || name === "quantity") {
        selected = {
          ...selected,
          amount: selected.unit_price * selected.quantity,
        };
      }

      newData.splice(selected_index, 1, selected);
      setData(newData);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <BoQSelectorComponent
          project_type={project_information.type}
          setData={setData}
          data={data}
          sheet_name={tab}
        />
        {BUILD === BuildType.ENTERPRISE ? (
          <ImportBoQComponent
            setProjectData={setProjectInformation}
            project_information={project_information}
            next={next}
            type="import"
            setData={setData}
            setTab={setTab}
          />
        ) : (
          <UpgradeModal title="Import from Excel" />
        )}

        {/* <ImportBoQComponent
          setProjectData={setProjectInformation}
          project_information={project_information}
          next={next}
          type="attach"
          setData={setData}
          setTab={setTab}
        /> */}
        <Button
          type="link"
          onClick={() => {
            setData(getProjectRegistrationData(project_information.type));
            setTab(
              getProjectRegistrationData(project_information.type)[0]
                ?.sheet_name
            );
          }}
        >
          Clear Data
        </Button>
      </div>
      <div className="col-md-12">
        <table className="table mt-3">
          <thead>
            <tr>
              <th id="boq0"></th>
              <th id="boq1">Item No</th>
              <th id="boq2">Description</th>
              <th id="boq3">Unit</th>
              {type === TypeOfProject.PRE_CONTRACT ? null : (
                <>
                  <th id="boq5">Contract Quantity</th>
                  <th id="boq6">Unit Price</th>
                  <th id="boq7">Contract Amount</th>
                </>
              )}

              <th id="boq0"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((e, index) => {
              if (e.sheet_name === tab)
                return (
                  <BoQRowComponent
                    key={index}
                    setData={setData}
                    data={data}
                    index={index}
                    row={e}
                    type={type}
                    setValue={setValue}
                    project_type={project_information.type}
                  />
                );
              else return null;
            })}
          </tbody>
        </table>
      </div>
      <div className="col-md-12">
        <TabComponent boq={data} setTab={setTab} tab={tab} setBoq={setData} />
      </div>
    </div>
  );
};
export default BoQComponent;
