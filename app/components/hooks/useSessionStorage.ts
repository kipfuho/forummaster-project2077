'use client'
import { useState } from "react";

export function useSessionStorage(keyName: string, defaultValue: any) {
	const [item, setItem] = useState(() => {
		try {
			const data = window.sessionStorage.getItem(keyName);
			if(data) {
				return JSON.parse(data);
			} else {
				window.sessionStorage.setItem(keyName, defaultValue);
				return defaultValue;
			}
		} catch {
			return defaultValue;
		}
	});

	const setData = (data: any) => {
		try {
			window.sessionStorage.setItem(keyName, JSON.stringify(data));
		} catch {
			window.sessionStorage.setItem(keyName, data);
		}
		setItem(data);
	}

	return [item, setData];
}