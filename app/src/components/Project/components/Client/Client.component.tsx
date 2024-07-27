import { AutoComplete, Form, Input } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { ClientPropType } from "./Client.util";
import { fetchAllClients } from "../../../../../redux/Client/Client.action";
import { fetchAllContractors } from "../../../../../redux/Contractor/Contractor.action";
import { fetchAllConsultants } from "../../../../../redux/Consultant/Consultant.action";

const ClientComponent: FC<ClientPropType> = ({
	next,
	form,
	data,
	setData,
	fetchClient,
	fetchContractor,
	fetchConsultant,
	contractor,
	consultant,
	client,
}) => {
	useEffect(() => {
		fetchClient();
		fetchContractor();
		fetchConsultant();
	}, []);

	const onFinish = (values: any) => {
		setData({ ...data, ...values });

		next();
	};

	const onFinishFailed = (values: any) => {};

	return (
		<Form
			layout="vertical"
			initialValues={data}
			form={form}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<div className="row">
				<div className="col-md-4">
					<Form.Item
						label="Client Name"
						name={["client", "name"]}
						rules={[{ required: true, message: "Client Name Required!" }]}
					>
						<AutoComplete
							placeholder="name"
							options={client.payload.map((e, index) => ({
								value: e.name,
								key: index,
							}))}
							filterOption={(inputValue, option) =>
								option!.value
									.toUpperCase()
									.indexOf(inputValue.toUpperCase()) !== -1
							}
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</div>
				<div className="col-md-4">
					<Form.Item
						label="Contractor Name"
						name={["contractor", "name"]}
						rules={[{ required: true, message: "Contractor Name Required!" }]}
					>
						<AutoComplete
							placeholder="name"
							options={contractor.payload.map((e, index) => ({
								value: e.name,
								key: index,
							}))}
							filterOption={(inputValue, option) =>
								option!.value
									.toUpperCase()
									.indexOf(inputValue.toUpperCase()) !== -1
							}
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</div>
				<div className="col-md-4">
					<Form.Item
						label="Consultant Name"
						name={["consultant", "name"]}
						rules={[{ required: true, message: "Consultant Name Required!" }]}
					>
						<AutoComplete
							placeholder="name"
							options={consultant.payload.map((e, index) => ({
								value: e.name,
								key: index,
							}))}
							filterOption={(inputValue, option) =>
								option!.value
									.toUpperCase()
									.indexOf(inputValue.toUpperCase()) !== -1
							}
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</div>
			</div>
		</Form>
	);
};
/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
	client: state.client.fetchAll,
	consultant: state.consultant.fetchAll,
	contractor: state.contractor.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
	fetchClient: () => dispatch(fetchAllClients()),
	fetchContractor: () => dispatch(fetchAllContractors()),
	fetchConsultant: () => dispatch(fetchAllConsultants()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientComponent);
