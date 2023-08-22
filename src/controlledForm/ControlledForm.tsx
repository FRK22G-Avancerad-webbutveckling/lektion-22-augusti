import { useState, SyntheticEvent } from 'react'

function isValidLength(str: string, max: number): boolean {
	return str.length <= max
}
function isDigit(str: string): boolean {
	if( str === ' ' || str === '' ) return false
	const maybe: number = Number(str)
	if( maybe >= 0 && maybe <= 9 ) {
		return true
	} else {
		return false
	}
}

const ControlledForm = () => {
	const [cardNumber, setCardNumber] = useState<string>('')

	const onChangeCardNumber = (event: SyntheticEvent<HTMLInputElement>): void => {
		// cardNumber är gamla värdet
		// event innehåller det nya
		const newValue: string = (event.target as HTMLInputElement).value

		// 0-16 +3 tecken
		// mellanslag efter var fjärde (dvs var femte)
		// alla måste vara siffror 0-9 utom mellanslagen
		let isValid = true

		if( !isValidLength(newValue, 16+3) ) isValid = false

		// TODO: flytta ut for-loopen till egen funktion - för att göra komponenten mera slimmad
		for( let i=0; i<newValue.length; i++ ) {
			if( (i % 5) === 4 ) {
				if( newValue[i] !== ' ' ) isValid = false
			} else {
				if( !isDigit(newValue[i]) ) isValid = false
			}
		}

		// Level up! Om användaren försöker skriva en femte siffra, skjut in ett mellanslag automatiskt.

		if( isValid ) {
			setCardNumber(newValue)
		} else {
			event.preventDefault()
		}
		console.log(isValid);  // få tyst på TS
	}
	
	return (
		<div className="form">
			
			<section>
				<label>Credit card number</label>
				<input type="text" value={cardNumber} onChange={onChangeCardNumber} />
			</section>
		</div>
	)
}

export default ControlledForm
