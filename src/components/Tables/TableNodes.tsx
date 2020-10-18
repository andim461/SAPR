import React, { useState, forwardRef } from 'react';
import MaterialTable from 'material-table';
import './Tables.css';
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

interface NodesProps {
    data: Array<Object>;
    setData: (data: Array<Object>) => void;
}

const TableNodes = (props: NodesProps) => {
    const [columns, setColumns] = useState<Array<Object>>([
        {
            title: '№ узла',
            field: 'j',
            type: 'numeric',
            align: 'center',
        },
        {
            title: 'Напряжение',
            field: 'F',
            type: 'numeric',
            align: 'center',
        },
    ]);
    return (
        <div className="tableNodes">
            <MaterialTable
                title="Нагрузки в узлах"
                columns={columns}
                data={props.data}
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
                            props.setData([...props.data, newData]);

                            resolve();
                        }),
                    onRowUpdate: (newData: any, oldData: any) =>
                        new Promise((resolve, reject) => {
                            const dataUpdate = [...props.data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            props.setData([...dataUpdate]);

                            resolve();
                        }),
                    onRowDelete: (oldData: any) =>
                        new Promise((resolve, reject) => {
                            const dataDelete = [...props.data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            props.setData([...dataDelete]);

                            resolve();
                        }),
                }}
            ></MaterialTable>
        </div>
    );
};

export default TableNodes;
