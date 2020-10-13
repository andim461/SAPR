import React, { useState, forwardRef} from 'react';
import MaterialTable from 'material-table';
import './Tables.css';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons: any = {
	Add: forwardRef((props, ref: any) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref: any) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref: any) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref: any) => (
		<DeleteOutline {...props} ref={ref} />
	)),
	DetailPanel: forwardRef((props, ref: any) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref: any) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref: any) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref: any) => (
		<FilterList {...props} ref={ref} />
	)),
	FirstPage: forwardRef((props, ref: any) => (
		<FirstPage {...props} ref={ref} />
	)),
	LastPage: forwardRef((props, ref: any) => (
		<LastPage {...props} ref={ref} />
	)),
	NextPage: forwardRef((props, ref: any) => (
		<ChevronRight {...props} ref={ref} />
	)),
	PreviousPage: forwardRef((props, ref: any) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref: any) => (
		<Clear {...props} ref={ref} />
	)),
	Search: forwardRef((props, ref: any) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref: any) => (
		<ArrowDownward {...props} ref={ref} />
	)),
	ThirdStateCheck: forwardRef((props, ref: any) => (
		<Remove {...props} ref={ref} />
	)),
	ViewColumn: forwardRef((props, ref: any) => (
		<ViewColumn {...props} ref={ref} />
	)),
};

const TableRods = () => {
	const [columns, setColumns] = useState<Array<Object>>([
		{
			title: 'Номер стержня',
			field: 'i',
			type: 'numeric',
			filtering: false,
			align: 'center',
		},
		{ title: 'Длина', field: 'L', type: 'numeric', filtering: false },
		{
			title: 'Площадь сечения',
			field: 'A',
			type: 'numeric',
			filtering: false,
			align: 'center',
		},
		{
			title: 'Модуль упругости',
			field: 'E',
			type: 'numeric',
			filtering: false,
			align: 'center',
		},
		{
			title: 'Допускаемое напряжение',
			field: 'S',
			type: 'numeric',
			filtering: false,
			align: 'center',
		},
	]);
	const [data, setData] = useState<Array<Object>>([]);
	return (
		<div className="tableRods">
			<MaterialTable
				title="Стержни"
				columns={columns}
				data={data}
				options={{
					search: false,
					sorting: false,
					draggable: false,
					paging: false,
				}}
				icons={tableIcons}
				editable={{
					onRowAdd: (newData: any) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								setData([...data, newData]);

								resolve();
							}, 1000);
						}),
					onRowUpdate: (newData: any, oldData: any) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const dataUpdate = [...data];
								const index = oldData.tableData.id;
								dataUpdate[index] = newData;
								setData([...dataUpdate]);

								resolve();
							}, 1000);
						}),
					onRowDelete: (oldData: any) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const dataDelete = [...data];
								const index = oldData.tableData.id;
								dataDelete.splice(index, 1);
								setData([...dataDelete]);

								resolve();
							}, 1000);
						}),
				}}
			></MaterialTable>
		</div>
	);
};
export default TableRods;
