import { useState } from 'react'
const Filehook = (defaultValue) => {
	const [value, setValue] = useState(null);
	var val;
	const onChange = (e) => {
		var Val = e.target.files[0]
		var Val2 = URL.createObjectURL(Val)
		setValue(Val2);
		
	}

	return (
		{ value, setValue, onChange, val }
	)
}
export default Filehook;