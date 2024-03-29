'use client'
import { useState } from "react";

export function useLocalStorage(keyName: string, defaultValue: any) {
	const [item, setItem] = useState(() => {
		try {
			const data = window.localStorage.getItem(keyName);
			if(data) {
				return JSON.parse(data);
			} else {
				window.localStorage.setItem(keyName, defaultValue);
				return defaultValue;
			}
		} catch {
			return defaultValue;
		}
	});

	const setData = (data: any) => {
		try {
			window.localStorage.setItem(keyName, JSON.stringify(data));
		} catch {
			window.localStorage.setItem(keyName, data);
		}
		setItem(data);
	}

	return [item, setData];
}