import React from 'react';
import TableRods from '../Tables/TableRods';
interface PreProps {
	dataRods: Array<Object>;
	changeRods: (data: Array<Object>) => void;
}
const Pre = (props: PreProps) => {
	return (
		<div>
			<TableRods data={props.dataRods} setData={props.changeRods} />
		</div>
	);
};
export default Pre;
