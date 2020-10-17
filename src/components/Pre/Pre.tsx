import React, { useState } from 'react';
import TableRods from '../Tables/TableRods';
import TableNodes from '../Tables/TableNodes';
import './Pre.css';
import RodsData from '../../interfaces/RodsData';
import Canvas from '../Canvas/Canvas';
import { Alert, AlertTitle } from '@material-ui/lab';

interface PreProps {
	dataRods: Array<RodsData>;
	changeRods: (data: Array<RodsData>) => void;
	dataNodes: Array<Object>;
	changeNodes: (data: Array<Object>) => void;
	isDataGood: boolean;
}
const Pre = (props: PreProps) => {
	return (
		<div className="preBody">
			<div className="tables">
				<TableRods data={props.dataRods} setData={props.changeRods} />
				<TableNodes data={props.dataNodes} setData={props.changeNodes} />
			</div>
			{props.isDataGood ? (
				<Canvas dataRods={props.dataRods} />
			) : (
				<Alert className="alert" severity="error">
					{' '}
					<AlertTitle>Ошибка!</AlertTitle> Неправильная нумерация стержней{' '}
				</Alert>
			)}
		</div>
	);
};
export default Pre;
