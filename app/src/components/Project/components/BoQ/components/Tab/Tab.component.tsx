import { Input } from "antd";
import { FC, useEffect, useState } from "react";
import { BoqSuperTitle } from "../../../../../../../constants/Constants";
import { Boq } from "../../../../../../../redux/Boq/Boq.type";
import { groupOption } from "../../../../../../../utilities/utilities";
import { BoQRegistrationStructure } from "../../BoQ.util";

import { TabPropType, TabItemPropType } from "./Tab.util";

const TabComponent: FC<TabPropType> = ({ boq, tab, setTab, setBoq }) => {
  const [tab_data, setTabData] = useState<TabItemPropType[]>([]);

  const parseTab = (boq: BoQRegistrationStructure[]) => {
    const parsed_tabs: TabItemPropType[] = [];
    groupOption(boq, "sheet_name").forEach((e) => {
      parsed_tabs.push({
        name: e,
        editing: false,
        previous: e,
      });
    });
    return parsed_tabs;
  };

  const rename = (name: string, value: string) => {
    const new_item = [...tab_data];
    const index = new_item.findIndex((e) => e.name == name);
    if (index != -1) {
      let selected = new_item[index];
      selected.name = value;
      new_item.splice(index, 1, selected);
      setTabData(new_item);
    }
  };

  const renameBoq = (name: string, value: string) => {
    const new_item = [...boq];

    new_item
      .filter((e) => e.sheet_name == name)
      .forEach((item) => {
        const index = new_item.findIndex((e) => e.key == item.key);
        if (index != -1) {
          let selected = new_item[index];
          selected.sheet_name = value;
          new_item.splice(index, 1, selected);
        }
      });
    setBoq(new_item);
  };

  const onBlur = (name: string, previous: string) => {
    const new_item = [...tab_data];
    const index = new_item.findIndex((e) => e.name == name);
    if (index != -1) {
      let selected = new_item[index];
      selected = { ...selected, editing: false, previous: previous };

      new_item.splice(index, 1, selected);

      setTabData(new_item);
      setTab(name);
      // rename(previous, name);
      renameBoq(previous, name);
    }
  };

  const onDoubleClick = (name: string) => {
    const new_item = [...tab_data];
    const index = new_item.findIndex((e) => e.name == name);
    if (index != -1) {
      let selected = new_item[index];
      selected.editing = true;
      new_item.splice(index, 1, selected);

      setTabData(new_item);
    }
  };

  const addTab = () => {
    setBoq([
      ...boq,
      {
        key: Date.now(),
        description: BoqSuperTitle.SUBSTRUCTURE,
        amount: 0,
        is_super_title: true,
        is_title: true,
        item_no: "",
        quantity: 0,
        unit: "",
        unit_price: 0,
        sheet_name: `sheet ${tab_data.length + 1}`,
      },
      {
        key: Date.now() + 1,
        description: "",
        amount: 0,
        is_super_title: false,
        is_title: true,
        item_no: "",
        quantity: 0,
        unit: "",
        unit_price: 0,
        sheet_name: `sheet ${tab_data.length + 1}`,
      },
      {
        key: Date.now() + 2,
        description: "",
        amount: 0,
        is_super_title: false,
        is_title: false,
        item_no: "",
        quantity: 0,
        unit: "",
        unit_price: 0,
        sheet_name: `sheet ${tab_data.length + 1}`,
      },
      {
        key: Date.now() + 3,
        description: BoqSuperTitle.SUPERSTRUCTURE,
        amount: 0,
        is_super_title: true,
        is_title: true,
        item_no: "",
        quantity: 0,
        unit: "",
        unit_price: 0,
        sheet_name: `sheet ${tab_data.length + 1}`,
      },
      {
        key: Date.now() + 4,
        description: "",
        amount: 0,
        is_super_title: false,
        is_title: true,
        item_no: "",
        quantity: 0,
        unit: "",
        unit_price: 0,
        sheet_name: `sheet ${tab_data.length + 1}`,
      },
      {
        key: Date.now() + 5,
        description: "",
        amount: 0,
        is_super_title: false,
        is_title: false,
        item_no: "",
        quantity: 0,
        unit: "",
        unit_price: 0,
        sheet_name: `sheet ${tab_data.length + 1}`,
      },
    ]);
  };

  const renderTab = () =>
    tab_data.map((e, index) => {
      if (e.editing)
        return (
          <div className="">
            <Input
              key={index}
              style={{ width: "100px" }}
              value={e.name}
              className="ml-1 mr-1 mt-2"
              onChange={(event) => rename(e.name, event.target.value)}
              onBlur={() => onBlur(e.name, e.previous)}
            />
          </div>
        );
      else {
        return (
          <div className="">
            <button
              key={index}
              className={`btn btn-light ml-1 mr-1 ${
                e.name == tab ? "active" : null
              } mt-2`}
              onDoubleClick={() => onDoubleClick(e.name)}
              onClick={() => {
                setTab(e.name);
              }}
            >
              {e.name}
            </button>
          </div>
        );
      }
    });

  useEffect(() => {
    setTabData(parseTab(boq));
  }, [boq]);

  return (
    <>
      <div className="row">
        {renderTab()}
        <div className="">
          <button
            key={Date.now()}
            onClick={addTab}
            className={`btn btn-link m-1 `}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};
export default TabComponent;
