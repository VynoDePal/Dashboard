import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Widget } from '../types/settings'
import { getWidgetConfig } from '../utils/GetWidgetConfig'

interface WidgetsContextType {
	widgets: Widget[]
	toggleWidget: (id: string) => void
}

const WidgetsContext = createContext<WidgetsContextType>({
	widgets: [],
	toggleWidget: () => {}
})

export const WidgetsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [widgets, setWidgets] = useState<Widget[]>([])

	useEffect(() => {
		const saved = localStorage.getItem('widgetsConfig')
		if (saved) {
			setWidgets(JSON.parse(saved))
		} else {
			const initial = getWidgetConfig()
			setWidgets(initial)
			localStorage.setItem('widgetsConfig', JSON.stringify(initial))
		}
	}, [])

	const toggleWidget = (id: string) => {
		setWidgets(prev => {
			const updated = prev.map(w =>
				w.id === id ? { ...w, enabled: !w.enabled } : w
			)
			localStorage.setItem('widgetsConfig', JSON.stringify(updated))
			return updated
		})
	}

	return (
		<WidgetsContext.Provider value={{ widgets, toggleWidget }}>
			{children}
		</WidgetsContext.Provider>
	)
}

export const useWidgets = () => useContext(WidgetsContext)
