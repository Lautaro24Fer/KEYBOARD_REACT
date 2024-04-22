import Pizzicato from "pizzicato"

export default function usePizzicato() {
	const createGroup = (array) => {

		const properties = Object.keys(array[0])

		let arr = []

		console.log(properties)


		if (properties.includes('frequency')) {
			arr = array.map((keyItem) => {
				const newSound = new Pizzicato.Sound({
					source: 'wave',
					options: {
						frequency: keyItem.frequency
					}
				})
				return newSound
			})
			const group = new Pizzicato.Group(arr)
			console.log(`This is group: ${JSON.stringify(group)}`)
			return group
		}

		if (properties.includes('path')) {
			arr = array.map((keyItem) => {
				const newSound = new Pizzicato.Sound({
					source: 'file',
					options: {
						path: keyItem.frequency
					}
				})
				return newSound
			})
			const group = new Pizzicato.Group(arr)
			console.log(`This is group: ${group}`)
			return group
		}
	}

	return { createGroup }
}
