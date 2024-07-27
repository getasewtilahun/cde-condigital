import Button from "antd/lib/button";
import FilterHeaderComponent from "../../../../../../common/FilterHeader/FilterHeader.component";
import Modal from "antd/lib/modal/Modal";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BoQSelectorPropType } from "./BoQSelector.util";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { ProjectTypes } from "../../../../../../../constants/Constants";
import { BoQRegistrationStructure } from "../../BoQ.util";
import { fetchAllBoqStandard } from "../../../../../../../redux/BoqStandard/BoqStandard.action";
const BoqSelectorComponent: FC<BoQSelectorPropType> = ({
  data,
  setData,
  project_type,
  sheet_name,
  boq_standard,
  fetchBoqStandard,
}) => {
  const [selected, setSelected]: any = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boqs, setBoq] = useState<any[]>([]);

  useEffect(() => {
    fetchBoqStandard({ type: project_type });
  }, [project_type, fetchBoqStandard]);

  useEffect(() => {
    setBoq(
      boq_standard.payload.map((e, index) => {
        let found = data.find((boq) => boq.reference_id === e.id);

        return {
          ...e,
          selected: found ? true : false,
          unit_price: found?.unit_price,
          quantity: found?.quantity,
          remark: found?.remark,
          amount: found
            ? (found.quantity ? found.quantity : 0) *
              (found.unit_price ? found.unit_price : 0)
            : 0,
          key: index + Date.now(),
        };
      })
    );
  }, [boq_standard, setBoq, data]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const selected_boq = boqs.filter((e: any) => e.selected);
    let previous_super_title: any = null;
    let previous_title: any = null;
    let previous_sub_title: any = null;
    const parsed_data: BoQRegistrationStructure[] = [];

    selected_boq.forEach((e: any, index: number) => {
      if (e.super_title !== previous_super_title) {
        previous_super_title = e.super_title;
        previous_title = null;
        previous_sub_title = null;
        parsed_data.push({
          amount: 0,
          item_no: "",
          description: e.super_title,
          is_super_title: true,
          is_title: true,
          key: parsed_data.length,
          quantity: 0,
          sheet_name: sheet_name,
          unit: "",
          unit_price: 0,
          is_sub_title: false,
          reference_id: null,
          remark: e.remark,
        });
      }
      if (e.title !== previous_title) {
        previous_title = e.title;
        previous_sub_title = null;
        parsed_data.push({
          amount: 0,
          item_no: "",
          description: e.title,
          is_super_title: false,
          is_title: true,
          key: parsed_data.length,
          quantity: 0,
          sheet_name: sheet_name,
          unit: "",
          is_sub_title: false,
          unit_price: 0,
          reference_id: null,
          remark: e.remark,
        });
      }
      if (
        e.sub_title !== previous_sub_title &&
        e.sub_title !== null &&
        e.sub_title !== ""
      ) {
        previous_sub_title = e.sub_title;
        parsed_data.push({
          amount: 0,
          item_no: "",
          description: e.sub_title,
          is_super_title: false,
          is_title: false,
          key: parsed_data.length,
          quantity: 0,
          sheet_name: sheet_name,
          unit: "",
          unit_price: 0,
          is_sub_title: true,
          reference_id: null,
          remark: e.remark,
        });
      }
      parsed_data.push({
        amount: e.amount,
        item_no: e.item_no + "",
        description: e.task_name,
        is_super_title: false,
        is_title: false,
        key: parsed_data.length,
        quantity: e.quantity ? e.quantity : 0,
        sheet_name: sheet_name,
        unit: e.unit,
        unit_price: e.unit_price ? e.unit_price : 0,
        is_sub_title: false,
        reference_id: e.id,
        remark: e.remark,
      });
    });

    setData([
      ...data.filter((e) => e.sheet_name !== sheet_name),
      ...parsed_data,
    ]);

    console.log({
      data: [
        ...data.filter((e) => e.sheet_name !== sheet_name),
        ...parsed_data,
      ],
    });
    // setBoq(init_building_boq.map((e: any) => ({ ...e, selected: false })));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const setValue = (id: number, name: string, value: any) => {
    const newData = [...boqs];
    const selected_index = newData.findIndex((e) => e.key === id);

    if (selected_index !== -1) {
      let selected = newData[selected_index];
      selected = { ...selected, [name]: value };
      newData.splice(selected_index, 1, selected);

      setBoq(newData);
    }
  };

  const renderRow = (boqs: any[]) => {
    const rows: any[] = [];
    let previous_sub_title: any = null;
    boqs.forEach((boq, index) => {
      if (
        ((project_type === ProjectTypes.BUILDING ||
          project_type === ProjectTypes.RENOVATION) &&
          boq.title === selected?.split("-")[0] &&
          boq.super_title === selected?.split("-")[1]) ||
        (project_type === ProjectTypes.ROAD &&
          boq.super_title === selected?.split("-")[0])
      ) {
        if (previous_sub_title !== boq.sub_title) {
          previous_sub_title = boq.sub_title;
          rows.push(
            <tr key={rows.length}>
              <td></td>
              <td></td>
              <td>{boq.sub_title}</td>
            </tr>
          );
        }
        rows.push(
          <tr key={rows.length}>
            <td>
              <Checkbox
                checked={boq.selected}
                onChange={(e) =>
                  setValue(boq.key, "selected", e.target.checked)
                }
              />
            </td>
            <td>{boq.item_no}</td>
            <td>{boq.task_name}</td>
            <td>{boq.unit}</td>
          </tr>
        );
      }
    });
    return rows;
  };

  const isAllChecked = () => {
    let is_checked = true;
    boqs.forEach((boq, index) => {
      if (
        ((project_type === ProjectTypes.BUILDING ||
          project_type === ProjectTypes.RENOVATION) &&
          boq.title === selected?.split("-")[0] &&
          boq.super_title === selected?.split("-")[1]) ||
        (project_type === ProjectTypes.ROAD &&
          boq.super_title === selected?.split("-")[0])
      ) {
        is_checked = is_checked && boq.selected;
      }
    });

    return is_checked;
  };

  const checkAll = (checked: boolean) => {
    const newData = [...boqs];
    boqs.forEach((boq, index) => {
      if (
        ((project_type === ProjectTypes.BUILDING ||
          project_type === ProjectTypes.RENOVATION) &&
          boq.title === selected?.split("-")[0] &&
          boq.super_title === selected?.split("-")[1]) ||
        (project_type === ProjectTypes.ROAD &&
          boq.super_title === selected?.split("-")[0])
      ) {
        let selected_index = newData.findIndex((e) => e.key === boq.key);
        let selected = newData[selected_index];
        selected = { ...selected, selected: checked };
        newData.splice(selected_index, 1, selected);
      }
    });
    setBoq(newData);
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        Select BoQ Items
      </Button>

      <Modal
        style={{ top: 10 }}
        title="BoQ Selector"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={handleOk}
          >
            Ok
          </Button>,
        ]}
        width={1300}
      >
        <div className="row">
          <div className="col-md-6">
            <FilterHeaderComponent
              project={{ boqs, type: project_type }}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <div className="col-md-12">
            {selected ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      {" "}
                      <Checkbox
                        checked={isAllChecked()}
                        onChange={(e) => checkAll(e.target.checked)}
                      />
                    </th>
                    <th>Item No</th>
                    <th>Description</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>{renderRow(boqs)}</tbody>
              </table>
            ) : null}
          </div>
        </div>
      </Modal>
    </>
  );
};
/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  boq_standard: state.boq_standard.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchBoqStandard: (action: any) => dispatch(fetchAllBoqStandard(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoqSelectorComponent);
