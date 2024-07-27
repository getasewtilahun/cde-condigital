import Popover from "antd/lib/popover";
import Button from "antd/lib/button";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import Select from "antd/lib/select";

import { FC } from "react";
import {
  ProjectTypes,
  TypeOfProject,
  UNITS,
} from "../../../../../../../constants/Constants";
import { format } from "../../../../../../../utilities/utilities";
import { BoQRegistrationStructure } from "../../BoQ.util";
import { BoQRowPropType, AddRow, RemoveRow } from "./BoQRow.util";
import { toNumber } from "lodash";
import AddRemarkComponent from "../Remark/AddRemark.component";
const BoQRowComponent: FC<BoQRowPropType> = ({
  row,
  setValue,
  setData,
  data,
  index,
  type,
  project_type,
}) => {
  const AddContent = () => {
    return (
      <div>
        <button
          className="btn btn-link d-block"
          onClick={() => setData(RemoveRow(data, index))}
        >
          Remove row
        </button>
        <button
          className="btn btn-link d-block"
          onClick={() => setData(AddRow(data, index, row.sheet_name))}
        >
          Add Item
        </button>
      </div>
    );
  };
  const renderRow = (data: BoQRegistrationStructure) => {
    if (data.is_super_title && project_type !== ProjectTypes.ROAD) {
      return (
        <tr>
          <td></td>
          <td></td>
          <td>{data.description}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    } else if (data.is_super_title && project_type !== ProjectTypes.BUILDING) {
      return (
        <tr>
          <td></td>
          <td></td>
          <td>
            {" "}
            <Input
              placeholder=""
              value={data.description}
              onChange={(event) =>
                setValue(data.key, "description", event.target.value)
              }
            />
          </td>
          <td></td>
        </tr>
      );
    } else if (data.is_title || data.is_sub_title) {
      return (
        <tr>
          <td>
            <Popover placement="topLeft" content={AddContent()}>
              <Button type="link">+</Button>
            </Popover>
          </td>
          <td>
            {" "}
            <Input
              placeholder="item no"
              value={data.item_no}
              onChange={(event) =>
                setValue(data.key, "item_no", event.target.value)
              }
            />
          </td>
          <td>
            <Input.TextArea
              rows={3}
              placeholder="description"
              value={data.description}
              onChange={(event) =>
                setValue(data.key, "description", event.target.value)
              }
            />
          </td>
          {type === TypeOfProject.POST_CONTRACT ? (
            <td colSpan={4}></td>
          ) : (
            <td></td>
          )}
          <td></td>
          <td>
            {" "}
            <AddRemarkComponent setValue={setValue} value={data} />
          </td>
          <td>
            <Checkbox
              checked={data.is_title}
              onChange={(e) => setValue(data.key, "is_title", e.target.checked)}
            />
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>
            <Popover placement="topLeft" content={AddContent()}>
              <Button type="link">+</Button>
            </Popover>
          </td>
          <td>
            <Input
              placeholder="item no"
              value={data.item_no}
              onChange={(event) =>
                setValue(data.key, "item_no", event.target.value)
              }
            />
          </td>
          <td>
            <Input.TextArea
              rows={3}
              placeholder="description"
              value={data.description}
              onChange={(event) =>
                setValue(data.key, "description", event.target.value)
              }
            />
          </td>
          <td>
            <Select
              placeholder="Select"
              style={{ width: "100%" }}
              value={data.unit}
              onChange={(event) => setValue(data.key, "unit", event)}
            >
              {UNITS.map((e, index) => (
                <Select.Option key={index} value={e.value}>
                  {e.name}
                </Select.Option>
              ))}
            </Select>
          </td>
          {type === TypeOfProject.POST_CONTRACT ? (
            <>
              <td>
                <InputNumber
                  placeholder="Qty"
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    toNumber(value ? value.replace(/\$\s?|(,*)/g, "") : "")
                  }
                  value={data.quantity}
                  onChange={(event) => setValue(data.key, "quantity", event)}
                />
              </td>
              <td>
                <InputNumber
                  placeholder="unit price"
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    toNumber(value ? value.replace(/\$\s?|(,*)/g, "") : "")
                  }
                  value={data.unit_price}
                  onChange={(event) => setValue(data.key, "unit_price", event)}
                />
              </td>
              <td>{format(data.amount)}</td>
            </>
          ) : null}
          <td>
            <Checkbox
              checked={data.is_title}
              onChange={(e) => setValue(data.key, "is_title", e.target.checked)}
            />
          </td>
        </tr>
      );
    }
  };

  return <> {renderRow(row)}</>;
};
export default BoQRowComponent;
