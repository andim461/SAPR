import React, { useState, forwardRef } from 'react';
import MaterialTable from 'material-table';
import './Tables.css';
import { connect } from 'react-redux';
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,
} from '@material-ui/icons';

import RodsData from '../../interfaces/RodsData';
import Store from '../../interfaces/Store';
import { updateDataRods } from '../../store/actions/tableActions';

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

interface RodsProps {
    state: Store;
    updateDataRods: (data: Array<RodsData>) => void;
}
const TableRods = (props: RodsProps) => {
    const [columns, setColumns] = useState<Array<Object>>([
        {
            title: '№ стержня',
            field: 'i',
            type: 'numeric',
            filtering: false,
            align: 'center',
            validate: (data: RodsData) => {
                if (data.i <= 0) {
                    return 'Введенное число должно быть положительным';
                } else if (isNaN(data.i)) {
                    return 'Поле не должно быть пустым';
                } else {
                    return true;
                }
            },
        },
        {
            title: 'Длина (см)',
            field: 'L',
            type: 'numeric',
            filtering: false,
            validate: (data: RodsData) => {
                if (data.L <= 0) {
                    return 'Введенное число должно быть положительным';
                } else if (isNaN(data.L)) {
                    return 'Поле не должно быть пустым';
                } else {
                    return true;
                }
            },
        },
        {
            title: 'Площадь сечения (cм^2)',
            field: 'A',
            type: 'numeric',
            filtering: false,
            align: 'center',
            validate: (data: RodsData) => {
                if (data.A <= 0) {
                    return 'Введенное число должно быть положительным';
                } else if (isNaN(data.A)) {
                    return 'Поле не должно быть пустым';
                } else {
                    return true;
                }
            },
        },
        {
            title: 'Модуль упругости',
            field: 'E',
            type: 'numeric',
            filtering: false,
            align: 'center',
            validate: (data: RodsData) => {
                if (data.E <= 0) {
                    return 'Введенное число должно быть положительным';
                } else if (isNaN(data.E)) {
                    return 'Поле не должно быть пустым';
                } else {
                    return true;
                }
            },
        },
        {
            title: 'Допускаемое напряжение',
            field: 'S',
            type: 'numeric',
            filtering: false,
            align: 'center',
            validate: (data: RodsData) => {
                if (data.S <= 0) {
                    return 'Введенное число должно быть положительным';
                } else if (isNaN(data.S)) {
                    return 'Поле не должно быть пустым';
                } else {
                    return true;
                }
            },
        },
        {
            title: 'Распределенные нагр-ки (Н/м^2)',
            field: 'q',
            type: 'numeric',
            filtering: false,
            align: 'center',
            validate: (data: RodsData) => {
                if (isNaN(data.q)) {
                    return 'Поле не должно быть пустым';
                } else {
                    return true;
                }
            },
        },
    ]);

    return (
        <div className="tableRods">
            <MaterialTable
                title="Стержни"
                columns={columns}
                data={props.state.rodsData}
                options={{
                    search: false,
                    sorting: false,
                    draggable: false,
                    paging: false,
                }}
                icons={tableIcons}
                editable={{
                    onRowAdd: (newData: any) => {
                        return new Promise((resolve, reject) => {
                            props.updateDataRods([
                                ...props.state.rodsData,
                                newData,
                            ]);

                            resolve();
                        });
                    },
                    onRowUpdate: (newData: any, oldData: any) =>
                        new Promise((resolve, reject) => {
                            const dataUpdate = [...props.state.rodsData];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            props.updateDataRods([...dataUpdate]);

                            resolve();
                        }),
                    onRowDelete: (oldData: any) =>
                        new Promise((resolve, reject) => {
                            const dataDelete = [...props.state.rodsData];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            props.updateDataRods([...dataDelete]);

                            resolve();
                        }),
                }}
            ></MaterialTable>
        </div>
    );
};
const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps, { updateDataRods })(TableRods);
